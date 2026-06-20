// FloorEditor.jsx — Konva редактор на етажния план С ПАРАМЕТРИЧНО реформиране
// + добавяне/изтриване/преименуване/тип на стаи. Стаите се пазят в БАЗОВИ метри;
// мащабът (sx, sy) ги реформира наживо. Export дава снипет за plans.js (иначе сесийно).
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Stage, Layer, Rect, Line, Text, Transformer } from "react-konva";
import { INK, RED, GRAY, GREEN, AMBER, FILL, FURN } from "./theme.js";

const GRID = 0.1;
const snap = (m) => Math.round(m / GRID) * GRID;
const r2 = (m) => Math.round(m * 100) / 100;
const clone = (o) => JSON.parse(JSON.stringify(o));
const G = { x: 0, y: 1, w: 2, h: 3 };

const TYPES = [
  ["living", "Жилищна"], ["wet", "Баня/WC"], ["service", "Сервиз"], ["stair", "Стълба"], ["hall", "Коридор"],
];

export default function FloorEditor({ data, savedRooms, onRoomsChange, lockW = null, lockD = null, onDepth, exportName = "floor" }) {
  const bW = data.w, bD = data.h;
  const [rooms, setRooms] = useState(() => clone(savedRooms || data.rooms));
  const [localW, setLocalW] = useState(bW);
  const [localD, setLocalD] = useState(bD);
  const [sel, setSel] = useState(null);
  const [vp, setVp] = useState({ w: 760, h: 560 });
  const [showExp, setShowExp] = useState(false);
  const wrapRef = useRef(null);

  const curW = lockW != null ? lockW : localW;
  const curD = lockD != null ? lockD : localD;

  // докладвай промените нагоре (App ги пази → издържат на превключване/презареждане).
  // Пропускаме първия рендер, за да не маркираме нередактиран етаж.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    if (!onRoomsChange) return;
    const changed = JSON.stringify(rooms) !== JSON.stringify(data.rooms);
    onRoomsChange(changed ? rooms : null);   // null → App изчиства редакцията (връща plans.js)
  }, [rooms]);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setVp({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el); setVp({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const sx = curW / bW, sy = curD / bD;
  const PAD = 36;
  const terraceD = data.terrace ? data.terrace[3] : 0;
  const totalD = curD + terraceD;
  const S = useMemo(() => Math.max(8, Math.min((vp.w - PAD * 2) / curW, (vp.h - PAD * 2) / totalD)), [vp, curW, totalD]);
  const offX = (vp.w - curW * S) / 2, offY = PAD;
  const X = (bx) => bx * sx * S, Y = (by) => by * sy * S;

  const trRef = useRef(null);
  const refs = useRef({});
  useEffect(() => {
    const tr = trRef.current; if (!tr) return;
    if (sel != null && refs.current[sel]) tr.nodes([refs.current[sel]]); else tr.nodes([]);
    tr.getLayer() && tr.getLayer().batchDraw();
  }, [sel, rooms, sx, sy, S]);

  // ——— мутатори ———
  // мебелите следват стаята: позиция и размер се трансформират спрямо старите→новите граници
  const tf = (furn, o, n) => (furn || []).map((it) => {
    const [t, fx, fy, fw = 0.4, fh = 0.4, ...rest] = it;
    return [t, r2(n.x + ((fx - o.x) / o.w) * n.w), r2(n.y + ((fy - o.y) / o.h) * n.h), r2(fw * n.w / o.w), r2(fh * n.h / o.h), ...rest];
  });
  const setRoomGeom = (i, patch) => setRooms((rs) => {
    const n = clone(rs);
    const o = { x: n[i][0], y: n[i][1], w: n[i][2], h: n[i][3] };
    for (const k in patch) n[i][G[k]] = r2(patch[k]);
    const nw = { x: n[i][0], y: n[i][1], w: n[i][2], h: n[i][3] };
    n[i][5] = Math.round(nw.w * nw.h);                    // площ = габарит (база)
    if (n[i][7] && n[i][7].furniture) n[i][7].furniture = tf(n[i][7].furniture, o, nw);
    return n;
  });
  const setField = (i, idx, val) => setRooms((rs) => { const n = clone(rs); n[i][idx] = val; return n; });
  const addRoom = () => {
    setRooms((rs) => [...rs, [r2(bW / 2 - 1.2), r2(bD / 2 - 1), 2.4, 2.0, "НОВА СТАЯ", 5, "service", {}]]);
    setSel(rooms.length);
  };
  const deleteRoom = (i) => { setRooms((rs) => rs.filter((_, k) => k !== i)); setSel(null); };

  const setDepth = (val) => { if (lockD != null) onDepth && onDepth(val); else setLocalD(val); };
  const reset = () => { setRooms(clone(data.rooms)); setLocalW(data.w); setLocalD(data.h); setSel(null); };
  const dirty = JSON.stringify(rooms) !== JSON.stringify(data.rooms) || (lockW == null && localW !== bW) || (lockD == null && localD !== bD);

  const ro = (r) => ({ x: r[0], y: r[1], w: r[2], h: r[3], name: r[4], area: r[5], type: r[6], opts: r[7] || {} });
  const selRoom = sel != null && rooms[sel] ? ro(rooms[sel]) : null;
  const liveArea = (r) => r2(r[2] * sx * (r[3] * sy));
  const gabarit = Math.round(curW * curD);
  const exportText = useMemo(() => serializeFloor(exportName, bW, bD, data.label, rooms, data.risers, data.wins, data.terrace), [exportName, bW, bD, data, rooms]);
  const [copied, setCopied] = useState(false);
  const doCopy = async () => { try { await navigator.clipboard.writeText(exportText); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* textarea fallback */ } };

  const grid = [];
  for (let x = 0; x <= bW + 1e-6; x += 1) grid.push(<Line key={"gx" + x} listening={false} points={[X(x), 0, X(x), Y(bD)]} stroke="#000" strokeWidth={0.5} opacity={0.06} />);
  for (let y = 0; y <= bD + 1e-6; y += 1) grid.push(<Line key={"gy" + y} listening={false} points={[0, Y(y), X(bW), Y(y)]} stroke="#000" strokeWidth={0.5} opacity={0.06} />);

  const tbtn = (active) => ({ flex: "1 1 auto", padding: "4px 6px", cursor: "pointer", fontSize: 10.5, borderRadius: 3, border: "1px solid " + (active ? RED : "#CFC9BB"), background: active ? RED : "#fff", color: active ? "#fff" : INK });

  return (
    <div className="fed">
      <div className="fed-stage" ref={wrapRef}>
        <Stage width={vp.w} height={vp.h} onMouseDown={(e) => { if (e.target === e.target.getStage()) setSel(null); }}>
          <Layer x={offX} y={offY}>
            {grid}
            {data.terrace && (
              <>
                <Rect listening={false} x={X(data.terrace[0])} y={Y(bD)} width={X(data.terrace[2])} height={terraceD * sy * S} fill={FILL.outdoor} stroke={AMBER} strokeWidth={1.2} dash={[6, 4]} />
                <Text listening={false} x={X(data.terrace[0])} y={Y(bD) + terraceD * sy * S / 2 - 6} width={X(data.terrace[2])} align="center" text={data.terrace[4] || "ВЕРАНДА"} fontSize={11} fill={AMBER} fontFamily="'IBM Plex Mono', monospace" />
              </>
            )}
            <Rect listening={false} x={0} y={0} width={X(bW)} height={Y(bD)} fill="#fff" />
            {rooms.map((r, i) => {
              const o = ro(r);
              const isSel = sel === i;
              return (
                <Rect key={"r" + i} ref={(n) => (refs.current[i] = n)}
                  x={X(o.x)} y={Y(o.y)} width={o.w * sx * S} height={o.h * sy * S}
                  fill={FILL[o.type] || "#fff"} stroke={isSel ? RED : GRAY} strokeWidth={isSel ? 2 : 0.8}
                  draggable
                  onClick={() => setSel(i)} onTap={() => setSel(i)}
                  onDragMove={(e) => { const nd = e.target; nd.x(snap(nd.x() / S / sx) * S * sx); nd.y(snap(nd.y() / S / sy) * S * sy); }}
                  onDragEnd={(e) => setRoomGeom(i, { x: snap(e.target.x() / S / sx), y: snap(e.target.y() / S / sy) })}
                  onTransformEnd={(e) => {
                    const n = e.target;
                    const wB = snap((n.width() * n.scaleX()) / S / sx);
                    const hB = snap((n.height() * n.scaleY()) / S / sy);
                    const xB = snap(n.x() / S / sx), yB = snap(n.y() / S / sy);
                    n.scaleX(1); n.scaleY(1);
                    setRoomGeom(i, { x: xB, y: yB, w: Math.max(GRID, wB), h: Math.max(GRID, hB) });
                  }} />
              );
            })}
            {rooms.map((r, i) => (r[7]?.furniture || []).map((it, fi) => {
              const [t, x, y, w = 0.4, h = 0.4] = it;
              return <Rect key={"f" + i + "_" + fi} listening={false} x={X(x)} y={Y(y)} width={w * sx * S} height={h * sy * S} fill="#EDE7D8" stroke={FURN} strokeWidth={0.6} opacity={0.75} />;
            }))}
            {rooms.map((r, i) => {
              const o = ro(r); if (!o.name) return null;
              const fontSize = Math.max(8, Math.min(12, o.w * sx * S * 0.085));
              const wPx = o.w * sx * S, cx = X(o.x) + wPx / 2;
              const ly = Y(o.y) + (o.opts.combined ? 6 : (o.h * sy * S) / 2 - 14);
              const tw = Math.min(wPx - 2, Math.max(o.name.length * fontSize * 0.56, 40));
              return (
                <React.Fragment key={"l" + i}>
                  <Rect listening={false} x={cx - tw / 2} y={ly - 1} width={tw} height={fontSize * 2 + 8} fill="rgba(255,255,255,0.72)" cornerRadius={2} />
                  <Text listening={false} x={X(o.x)} y={ly} width={wPx} align="center"
                    text={o.name + "\n" + liveArea(r) + " м²"}
                    fontSize={fontSize} fontStyle="700" fill={INK} fontFamily="'Spectral', Georgia, serif" />
                </React.Fragment>
              );
            })}
            <Rect listening={false} x={0} y={0} width={X(bW)} height={Y(bD)} stroke={INK} strokeWidth={3} />
            <Transformer ref={trRef} rotateEnabled={false} keepRatio={false} anchorSize={9} borderStroke={RED} anchorStroke={RED}
              boundBoxFunc={(oldB, newB) => (newB.width < 6 || newB.height < 6) ? oldB : newB} />
          </Layer>
        </Stage>
      </div>

      <aside className="fed-panel">
        <div className="fed-h">Редактор на план</div>
        <div className="fed-sub">влачи стая · ъглите за размер · захващане {GRID * 100} см</div>

        {lockW != null
          ? <div className="fed-row"><span>Ширина (от реда)</span><b>{r2(curW)} м</b></div>
          : <div className="ctl"><div className="ctl-h"><span>Ширина къща</span><b>{r2(curW)} м</b></div><input type="range" min={5} max={12} step={0.1} value={curW} onChange={(e) => setLocalW(parseFloat(e.target.value))} /></div>}
        <div className="ctl">
          <div className="ctl-h"><span>Дълбочина {lockD != null ? "(↔ Разпределение)" : "къща"}</span><b>{r2(curD)} м</b></div>
          <input type="range" min={6} max={14} step={0.1} value={curD} onChange={(e) => setDepth(parseFloat(e.target.value))} />
        </div>
        <div className="ctl-row">
          <span className="fed-area">габарит ~{gabarit} м²</span>
          <button className="reset" onClick={reset} disabled={!dirty}>↺ Нулирай</button>
        </div>

        {/* добавяне на стая */}
        <button className="fed-add" onClick={addRoom}>＋ Добави стая</button>

        {/* избрана стая: име · тип · размери · изтрий */}
        <div className="fed-info">
          {!selRoom && <span className="fed-dim">Кликни стая (или „Добави"), за да я редактираш. Смени дълбочината — планът се реформира.</span>}
          {selRoom && (
            <div>
              <input className="fed-name" value={selRoom.name} onChange={(e) => setField(sel, 4, e.target.value)} placeholder="име на стая" />
              <div className="fed-types">
                {TYPES.map(([k, lbl]) => <button key={k} style={tbtn(selRoom.type === k)} onClick={() => setField(sel, 6, k)}>{lbl}</button>)}
              </div>
              <Row k="ширина" v={`${r2(selRoom.w * sx)} м`} />
              <Row k="дълбочина" v={`${r2(selRoom.h * sy)} м`} />
              <Row k="площ (текуща)" v={`${liveArea(rooms[sel])} м²`} accent />
              <button className="fed-del" onClick={() => deleteRoom(sel)}>🗑 Изтрий стаята</button>
            </div>
          )}
        </div>

        <button className="reset" style={{ width: "100%", marginTop: 4 }} onClick={() => setShowExp((s) => !s)}>{showExp ? "▾ Скрий Export" : "▸ Export → plans.js"}</button>
        {showExp && (
          <div style={{ marginTop: 8 }}>
            <button className="fed-add" style={{ background: INK }} onClick={doCopy}>{copied ? "✓ Копирано" : `Копирай (${exportName})`}</button>
            <div style={{ color: GRAY, fontSize: 10, margin: "6px 0 4px" }}>Постави върху <code>export const {exportName}</code> в <code>src/plans.js</code>, за да запишеш.</div>
            <textarea readOnly value={exportText} onFocus={(e) => e.target.select()} style={{ width: "100%", height: 150, fontFamily: "ui-monospace, monospace", fontSize: 9.5, border: "1px solid #D8D2C4", borderRadius: 4, padding: 6, resize: "vertical" }} />
          </div>
        )}
        <div className="fed-warn">⚠ редакциите са за сесията — Export, за да ги запишеш в plans.js. Схематично · [ЗА ПОТВЪРЖДЕНИЕ].</div>
      </aside>
    </div>
  );
}

function Row({ k, v, accent, dim }) {
  return (
    <div className="fed-row">
      <span>{k}</span>
      <b style={{ color: accent ? "#2F7D4F" : dim ? "#8A8D93" : "#1A1C1E", fontWeight: dim ? 400 : 700 }}>{v}</b>
    </div>
  );
}

// сериализатор → валиден JS литерал за plans.js
function serializeFloor(name, w, h, label, rooms, risers, wins, terrace) {
  const room = (r) => {
    const [x, y, wd, ht, nm, area, type, opts] = r;
    const head = `[${x}, ${y}, ${wd}, ${ht}, ${JSON.stringify(nm)}, ${area}, ${JSON.stringify(type)}`;
    return opts && Object.keys(opts).length ? `    ${head}, ${JSON.stringify(opts)}],` : `    ${head}],`;
  };
  const extra = (key, val) => val ? `\n  ${key}: ${JSON.stringify(val)},` : "";
  return `export const ${name} = {\n  w: ${w}, h: ${h}, label: ${JSON.stringify(label)},\n  rooms: [\n${rooms.map(room).join("\n")}\n  ],` +
    extra("risers", risers) + extra("wins", wins) + extra("terrace", terrace) + `\n};\n`;
}
