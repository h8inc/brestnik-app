import React, { useState, useMemo, useEffect } from "react";
import FloorPlan from "./FloorPlan.jsx";
import FloorEditor from "./FloorEditor.jsx";
import RowPlan from "./RowPlan.jsx";
import Finance from "./Finance.jsx";
import Questions from "./Questions.jsx";
import { ground, floor2, attic, groundP, floor2P, atticP } from "./plans.js";
import { rowMetrics, houseMetrics, PLOT } from "./model.js";
import { VARIANTS, defaultsFor } from "./variants.js";

const FLOORS = {
  S: [
    { name: "Партер", data: ground },
    { name: "Етаж 2 · мастър + 2 спални", data: floor2 },
    { name: "Таван", data: attic, attic: true },
  ],
  P: [
    { name: "Партер", data: groundP },
    { name: "Етаж 2 · 3–4 спални", data: floor2P },
    { name: "Таван", data: atticP, attic: true },
  ],
};

const PRODUCTS = {
  S: {
    name: "Стандарт", ref: "≈ Option C (отворен юг)",
    rows: [["Партер", "дневна+кухня отворена на юг, кът/кабинет, WC, котелно"], ["Етаж 2", "мастър + 2 спални (3 спални), обща баня + en-suite"],
      ["Таван", "обитаем (гредоред, скосен)"], ["Паркинг", "открито 2 коли"]],
  },
  P: {
    name: "Премиум", ref: "краища · офис с отделен вход",
    rows: [["Партер", "ОФИС с отделен вход (СЗ) + дневна/кухня отворени на юг"], ["Етаж 2", "мастър suite + 2–3 спални + дрешник"],
      ["Таван", "обитаем (гредоред, скосен)"], ["Паркинг", "двоен гараж"]],
  },
};

const NAV = [
  ["sec-products", "Продукти"],
  ["sec-layout", "Разпределение"],
  ["sec-plans", "Планове"],
  ["sec-finance", "Финанси"],
  ["sec-questions", "Въпроси"],
  ["sec-archive", "Архив"],
];

const SLIDERS = [
  ["wS", "Ширина стандарт", 4, 12, 0.1, "м"],
  ["wP", "Ширина премиум", 4, 13, 0.1, "м"],
  ["dS", "Дълбочина стандарт", 6, 12, 0.5, "м"],
  ["dP", "Дълбочина премиум", 6, 12, 0.5, "м"],
  ["front", "Преден двор (апрон)", 4.5, 7, 0.1, "м"],
  ["over", "Навес/конзола юг (= +етаж 2)", 0, 3, 0.5, "м"],
  ["road", "Вътрешен път", 3, 6, 0.5, "м"],
  ["entryPathW", "Пътека към входа", 0, 1.5, 0.1, "м"],
  ["atticRatio", "Таван — използваемост", 0.3, 0.7, 0.05, "×петно"],
];

const EXPORT_NAMES = { S: ["ground", "floor2", "attic"], P: ["groundP", "floor2P", "atticP"] };

const EDITS_KEY = "brestnik-plan-edits-v1";
const loadEdits = () => { try { return JSON.parse(localStorage.getItem(EDITS_KEY)) || {}; } catch { return {}; } };

function Chip({ l, v, accent, big }) {
  const col = accent === "red" ? "#B23A2E" : accent === "green" ? "#2F7D4F" : accent === "amber" ? "#B8762A" : "#1A1C1E";
  return (
    <div className={"chip" + (big ? " chip-big" : "")}>
      <span className="chip-l">{l}</span>
      <span className="chip-v" style={{ color: col }}>{v}</span>
    </div>
  );
}

function ProductCard({ p, hm, accent, attic }) {
  const rows = p.rows.filter(([k]) => attic || k !== "Таван");
  return (
    <div className={"card" + (accent ? " card-prem" : "")}>
      <div className="card-head">
        <h3>{p.name}</h3>
        <span className="card-ref">{p.ref}</span>
      </div>
      <div className="card-big">~{hm.RZP}<span> РЗП{attic ? " с таван" : ""}</span></div>
      <div className="card-split">партер {hm.footprint} · <b>етаж 2 {hm.floor2}</b>{attic ? ` · таван ${hm.attic}` : ""} м²</div>
      <ul>{rows.map(([k, v], i) => <li key={i}><b>{k}</b><span>{v}</span></li>)}</ul>
      <div className="card-ticket">Билет на БДС @€1400/м²: <b>~€{Math.round(hm.RZP * 1.4)}K</b> · висок (€1900) ~€{Math.round(hm.RZP * 1.9)}K</div>
    </div>
  );
}

export default function App() {
  const [variant, setVariant] = useState("B");
  const [product, setProduct] = useState("S");
  const [floor, setFloor] = useState(0);
  const [editPlan, setEditPlan] = useState(false);
  const [showDims, setShowDims] = useState(false);   // плъзгачите са скрити по подразбиране
  const [dims, setDims] = useState(() => defaultsFor(VARIANTS.B));
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 700px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  const [planEdits, setPlanEdits] = useState(loadEdits);
  const saveRooms = (name, rms) => setPlanEdits((e) => {
    const next = { ...e };
    if (rms == null) delete next[name]; else next[name] = rms;
    try { localStorage.setItem(EDITS_KEY, JSON.stringify(next)); } catch { /* sandbox */ }
    return next;
  });

  const v = VARIANTS[variant];
  // Плосък покрив (по подразбиране) → таванът е скрит (в Архив). Скатен+таван се връща с тогъла.
  const floors = FLOORS[product].filter((f) => dims.attic || !f.attic);
  const flIdx = Math.min(floor, floors.length - 1);
  const fl = floors[flIdx];
  const exportName = EXPORT_NAMES[product][flIdx];
  const curData = planEdits[exportName] ? { ...fl.data, rooms: planEdits[exportName] } : fl.data;
  const rooms = curData.rooms.filter((r) => r[5] > 0);

  const setDim = (k, val) => setDims((d) => ({ ...d, [k]: val }));
  const toggleAttic = () => setDims((d) => ({ ...d, attic: !d.attic }));
  const setWidthCoupled = (which, val) => {
    const nP = v.seq.filter((t) => t === "P").length;
    const nS = v.seq.filter((t) => t === "S").length;
    const avail = PLOT.D - v.leftMargin - v.rightMargin;
    setDims((d) => {
      if (which === "wS") {
        const wP = Math.max(4, Math.round(((avail - nS * val) / nP) * 100) / 100);
        return { ...d, wS: val, wP };
      }
      const wS = Math.max(4, Math.round(((avail - nP * val) / nS) * 100) / 100);
      return { ...d, wP: val, wS };
    });
  };
  const chooseVariant = (id) => { setVariant(id); const V = VARIANTS[id]; setDims((d) => ({ ...d, ...defaultsFor(V), over: d.over, atticRatio: d.atticRatio })); };
  const reset = () => setDims(defaultsFor(v));
  const dirty = JSON.stringify(dims) !== JSON.stringify(defaultsFor(v));

  const liveUnits = v.seq.map((type) => ({ type, w: type === "P" ? dims.wP : dims.wS }));
  const M = useMemo(() => rowMetrics(liveUnits, v.leftMargin, v.rightMargin, dims), [variant, dims]);
  const G = M.green;
  const greenPreset = () => setDims((d) => ({ ...d, road: 4, frontGreen: true }));
  const hmS = houseMetrics(dims.wS, "S", dims);
  const hmP = houseMetrics(dims.wP, "P", dims);
  const priv = PLOT.W - dims.road;
  const cornerYard = hmP.rear + hmP.front + Math.round(v.leftMargin * priv);  // К1 общ

  const prodW = product === "S" ? dims.wS : dims.wP;
  const prodDepth = product === "S" ? dims.dS : dims.dP;
  const viewDepth = floor === 0 ? prodDepth : prodDepth + dims.over;
  const wScaleV = prodW / fl.data.w;
  const dScaleV = viewDepth / fl.data.h;
  const isAttic = !!fl.attic;
  const atticUsable = Math.round(prodW * prodDepth * dims.atticRatio);
  const planGab = isAttic ? atticUsable : Math.round(prodW * viewDepth);
  const planTitle = `${product === "S" ? "СТАНДАРТ" : "ПРЕМИУМ"} · ${fl.name} · ${planGab} м²${isAttic ? " изпол." : " габарит"}`;

  // Вариант А — архив (по-сложен, само за справка; не пипа интерактивния модел)
  const aV = VARIANTS.A, aDims = defaultsFor(aV);
  const aUnits = aV.seq.map((t) => ({ type: t, w: t === "P" ? aV.wP : aV.wS }));
  const aM = rowMetrics(aUnits, aV.leftMargin, aV.rightMargin, aDims);
  const aHmS = houseMetrics(aDims.wS, "S", aDims);

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-title">
          <h1>Брестник</h1>
          <span>редови къщи · {v.label}</span>
        </div>
        <nav className="navlinks">
          {NAV.map(([id, label]) => <a key={id} href={"#" + id}>{label}</a>)}
          <a href="./gallery.html">Галерия ↗</a>
        </nav>
      </header>

      <main className="main">
        {/* ——— ПРОДУКТИ ——— */}
        <section id="sec-products" className="sec">
          <div className="sec-h"><span className="eyebrow">Двата продукта · спални + кабинет горе · {dims.attic ? "скатен покрив + таван" : "плосък покрив (2 етажа)"}</span><h2>Стандарт ~{hmS.RZP} м² · Премиум ~{hmP.RZP} м²{dims.attic ? " (вкл. таван)" : ""}</h2></div>
          <div className="cards">
            <ProductCard p={PRODUCTS.S} hm={hmS} attic={dims.attic} />
            <ProductCard p={PRODUCTS.P} hm={hmP} accent attic={dims.attic} />
          </div>
        </section>

        {/* ——— РАЗПРЕДЕЛЕНИЕ — планът в центъра ——— */}
        <section id="sec-layout" className="sec sec-hero">
          <div className="sec-h">
            <span className="eyebrow">Разпределение на реда · {v.label}</span>
          </div>

          <div className="chips">
            <Chip l="РЗП общо" v={`${M.totalRZP} м²`} big />
            {dims.attic && <Chip l="Таван" v={`${M.atticTotal} м²`} accent="amber" />}
            <Chip l="Двор стандарт" v={`${hmS.rear + hmS.front} м²`} accent={hmS.yardOK ? "green" : "red"} />
            <Chip l="Двор премиум (ъгъл)" v={`${cornerYard} м²`} accent="green" />
            <Chip l={`Озеленяване (мин. ${G.minPct}%)`} v={`${G.pct}% · ${G.total} м²`} accent={G.ok ? "green" : "red"} />
          </div>
          <div className="metric-note">
            Озеленяване: заден двор {G.rear} + странични {G.side} + преден {G.front}{G.fire ? ` − противопожарни ${G.fire}` : ""} = <b>{G.total} м²</b> при минимум {G.need} м² ({G.minPct}% от УПИ) → {G.ok ? `✓ +${G.diff} м² резерв` : `⚠ не достигат ${-G.diff} м²`}. С дървета: поне {G.treesNeed} м². Път {dims.road} м, паркоместа, пътеки към входа ({dims.entryPathW} м), сгради{dims.terracePaved ? " и покрити тераси" : ""} не се броят. [ЗА ПОТВЪРЖДЕНИЕ по ПУП]
          </div>

          {(M.fire.turn || M.fire.tank) && (
            <div className="metric-note fire-note">
              {M.fire.turn && <>Площадка за обръщане {M.fire.turn.size} × {M.fire.turn.size} м: взима {M.fire.turn.greenLoss} м² озеленяване и {M.fire.turn.paved} м² настилка извън пътя. {M.fire.turn.intoHouse > 0
                ? <b>⚠ Не се побира: влиза {M.fire.turn.intoHouse} м в крайната къща по {M.fire.turn.houseW} м от фасадата ѝ и покрива предния ѝ двор{M.fire.turn.type === "P" ? " и гаража" : ""}. Трябват път + преден двор ≥ {M.fire.turn.size} м или достъп от общинския път.</b>
                : <>Побира се в пътя и предния двор, но заема {M.fire.turn.houseW} м от предния двор на крайната къща.</>} </>}
              {M.fire.tank && <>Противопожарен резервоар {M.fire.tank.vol} м³ ≈ {M.fire.tank.area} м² при дълбочина {dims.tankDepth} м: {M.fire.tank.buried ? "подземен, озеленен отгоре → 0 м² от озеленяването" : `открит → −${M.fire.tank.greenLoss} м² озеленяване`}. </>}
              Наредба № Iз-1971, чл. 27, ал. 7 и табл. 17а. [ЗА ПОТВЪРЖДЕНИЕ — въпроси 19–22]
            </div>
          )}

          {/* ПЛАНЪТ — централен елемент */}
          <div className="plan-frame plan-frame-row hero-plan">
            <RowPlan units={liveUnits} leftMargin={v.leftMargin} rightMargin={v.rightMargin} params={dims} vertical={isMobile} />
          </div>

          <div className="dims-bar">
            <button className="dims-btn" onClick={() => setShowDims((s) => !s)}>{showDims ? "▾ Скрий размерите" : "✎ Редактирай размерите"}</button>
            {showDims && dirty && <button className="reset" onClick={reset}>↺ По подразбиране</button>}
          </div>
          {showDims && (
            <div className="calc-controls">
              {SLIDERS.map(([k, label, min, max, step, unit]) => (
                <div key={k} className="ctl">
                  <div className="ctl-h"><span>{label}</span><b>{dims[k]}{unit === "×петно" ? "" : " "}{unit}</b></div>
                  <input type="range" min={min} max={max} step={step} value={dims[k]}
                    onChange={(e) => (k === "wS" || k === "wP") ? setWidthCoupled(k, parseFloat(e.target.value)) : setDim(k, parseFloat(e.target.value))} />
                </div>
              ))}
              <label className="chk"><input type="checkbox" checked={dims.attic} onChange={toggleAttic} /> Скатен покрив + обитаем таван <span style={{ color: "#777" }}>(изкл. = плосък покрив)</span></label>
              <label className="chk"><input type="checkbox" checked={dims.frontGreen} onChange={() => setDims((d) => ({ ...d, frontGreen: !d.frontGreen }))} /> Озеленен преден двор <span style={{ color: "#777" }}>(настилка само за {dims.stallsS} паркоместа; премиум — гараж)</span></label>
              <label className="chk"><input type="checkbox" checked={dims.driveway === "tracks"} onChange={() => setDims((d) => d.driveway === "tracks" ? { ...d, driveway: "paved" } : { ...d, driveway: "tracks", frontGreen: true })} /> Тревна алея <span style={{ color: "#777" }}>(настилка само под коловозите, 2 × {dims.trackW} м на кола) [приемането като озеленяване — за потвърждение]</span></label>
              <label className="chk"><input type="checkbox" checked={!dims.terracePaved} onChange={() => setDims((d) => ({ ...d, terracePaved: !d.terracePaved }))} /> Без тераса/декинг под навеса <span style={{ color: "#777" }}>(ивицата {dims.over} м е озеленена)</span></label>
              <label className="chk"><input type="checkbox" checked={dims.fireTurn} onChange={() => setDims((d) => ({ ...d, fireTurn: !d.fireTurn }))} /> Пожарна площадка за обръщане {dims.turnSize} × {dims.turnSize} м <span style={{ color: "#777" }}>(ако вътрешният път е задънен над 45 м) [за потвърждение]</span></label>
              <label className="chk">Противопожарен воден запас:&nbsp;
                <select value={dims.fireTank} onChange={(e) => setDims((d) => ({ ...d, fireTank: Number(e.target.value) }))}>
                  <option value={0}>няма</option>
                  <option value={22}>22 м³ (всяка къща е отделен пожарен сектор)</option>
                  <option value={36}>36 м³ (редът е една сграда)</option>
                </select>
              </label>
              {dims.fireTank > 0 && <label className="chk"><input type="checkbox" checked={dims.fireTankBuried} onChange={() => setDims((d) => ({ ...d, fireTankBuried: !d.fireTankBuried }))} /> Резервоарът е подземен и озеленен отгоре <span style={{ color: "#777" }}>(иначе площта му се вади от озеленяването)</span></label>}
              {!G.ok && <button className="reset" onClick={greenPreset}>Покажи вариант за {G.minPct}%: път 4 м + озеленен преден двор</button>}
              <div className="metric-note">КИНТ {M.kint.toFixed(2)} · плътност {M.density}% · събира се {M.slack >= 0 ? "+" : ""}{M.slack} м · {M.yardOK ? "✓ дворове ≥72" : "⚠ двор <72"}{dims.front < 5 ? " · ⚠ преден <5 м" : ""}. [ЗА ПОТВЪРЖДЕНИЕ по виза/ПУП]</div>
            </div>
          )}
        </section>

        {/* ——— ЕТАЖНИ ПЛАНОВЕ ——— */}
        <section id="sec-plans" className="sec">
          <div className="sec-h">
            <span className="eyebrow">Етажни планове · {editPlan ? "редактор — влачи стаите" : "от съществените чертежи"}</span>
            <div className="seg">
              <button className={"seg-b" + (product === "S" ? " on" : "")} onClick={() => { setProduct("S"); setFloor(0); }}>Стандарт</button>
              <button className={"seg-b" + (product === "P" ? " on" : "")} onClick={() => { setProduct("P"); setFloor(0); }}>Премиум</button>
              <button className={"seg-b" + (editPlan ? " on" : "")} onClick={() => setEditPlan((e) => !e)} style={{ marginLeft: 8 }}>{editPlan ? "✓ Редакция" : "✎ Редактирай"}</button>
            </div>
          </div>
          <div className="floor-tabs">
            {floors.map((f, i) => {
              const fd = i === 0 ? prodDepth : prodDepth + dims.over;
              const area = f.attic ? atticUsable : Math.round(prodW * fd);
              return (
                <button key={i} className={"ftab" + (floor === i ? " on" : "")} onClick={() => setFloor(i)}>{f.name} · {area} м²</button>
              );
            })}
          </div>
          {editPlan ? (
            <div className="plan-frame plan-frame-lg" style={{ padding: 0 }}>
              <FloorEditor
                key={product + floor + variant}
                data={fl.data}
                savedRooms={planEdits[exportName]}
                onRoomsChange={(rms) => saveRooms(exportName, rms)}
                lockW={prodW}
                lockD={floor === 0 ? prodDepth : null}
                onDepth={floor === 0 ? (val) => setDim(product === "S" ? "dS" : "dP", val) : undefined}
                exportName={exportName}
              />
            </div>
          ) : (
            <div className="plan-row">
              <div className="plan-frame plan-frame-lg"><FloorPlan data={curData} scale={44} wScale={wScaleV} dScale={dScaleV} title={planTitle} /></div>
              <aside className="rooms">
                <h4>Помещения · {fl.name} · {planGab} м²{isAttic ? " изпол." : ""}</h4>
                <ul>{rooms.map((r, i) => <li key={i}><span>{r[4]}</span><b>{Math.round(r[5] * wScaleV * dScaleV)} м²</b></li>)}</ul>
                <p className="rooms-note">{isAttic ? `Таванът е скосен — използваемото >1.5 м ≈ ${atticUsable} м². ` : ""}Площите следват ширината ({prodW} м) и дълбочината ({viewDepth.toFixed(1)} м). „✎ Редактирай" мести стаите.</p>
              </aside>
            </div>
          )}
        </section>

        {/* ——— ФИНАНСИ ——— */}
        <section id="sec-finance" className="sec"><Finance /></section>

        {/* ——— ВЪПРОСИ КЪМ КОНСУЛТАНТА ——— */}
        <section id="sec-questions" className="sec"><Questions /></section>

        {/* ——— АРХИВ ——— */}
        <section id="sec-archive" className="sec">
          <div className="sec-h"><span className="eyebrow">Архив · други планове</span><h2>Скатен покрив + обитаем таван · Вариант А</h2></div>
          <p className="sub">Активният продукт е <b>плосък покрив (2 етажа)</b>. Скатеният покрив с обитаем таван е тук за справка — връща се с тогъла „Скатен покрив + обитаем таван" в Разпределение. Сравнението на разходите е във <b>Финанси</b>.</p>
          <p className="sub">Вариант А · 7 къщи: РЗП {aM.totalRZP} м² · КИНТ {aM.kint.toFixed(2)} · двор стандарт {aHmS.rear + aHmS.front} м² · с обитаем таван.</p>
          <div className="plan-frame plan-frame-row hero-plan"><RowPlan units={aUnits} leftMargin={aV.leftMargin} rightMargin={aV.rightMargin} params={aDims} vertical={isMobile} /></div>
          <div className="plan-row" style={{ marginTop: 16 }}>
            <div className="plan-frame plan-frame-lg"><FloorPlan data={attic} scale={40} title="ТАВАН · СТАНДАРТ (скатен покрив) — за справка" /></div>
            <div className="plan-frame plan-frame-lg"><FloorPlan data={atticP} scale={40} title="ТАВАН · ПРЕМИУМ (скатен покрив) — за справка" /></div>
          </div>
        </section>
      </main>

      <footer className="ft">Брестник · работен модел по осите · не замества правоспособен проектант · [за потвърждение по виза/ПУП]</footer>
    </div>
  );
}
