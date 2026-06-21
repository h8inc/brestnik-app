import React, { useState, useMemo, useEffect } from "react";
import FloorPlan from "./FloorPlan.jsx";
import FloorEditor from "./FloorEditor.jsx";
import RowPlan from "./RowPlan.jsx";
import Finance from "./Finance.jsx";
import { ground, floor2, attic, groundP, floor2P, atticP } from "./plans.js";
import { baseParams, rowMetrics, houseMetrics, PLOT } from "./model.js";

const VARIANTS = {
  A: {
    label: "Вариант А · 7 къщи",
    sub: "2 премиум (краища) + 5 стандарт · двор 72 · с таван · РЗП 1339",
    seq: ["P", "S", "S", "S", "S", "S", "P"],
    wS: 7.0, wP: 8.73, dS: 9, dP: 9, attic: true, road: 4, front: 5.5,
    leftMargin: 5, rightMargin: 3,
  },
  B: {
    label: "Вариант Б · 6 къщи",
    sub: "2 премиум (краища) + 4 стандарт · ИЗБРАН · път 5 · преден 5.0 · 2 етажа без таван · РЗП 1130",
    seq: ["P", "S", "S", "S", "S", "P"],
    wS: 8.21, wP: 9.8, dS: 9.5, dP: 9.5, attic: false, road: 5, front: 5.0,
    leftMargin: 5, rightMargin: 3,
  },
};

const FLOORS = {
  S: [
    { name: "Партер", data: ground },
    { name: "Етаж 2 · 3 спални", data: floor2 },
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
    name: "Стандарт", ref: "≈ референтен Тип 3",
    rows: [["Партер", "дневна+кухня, WC, килер"], ["Етаж 2", "3 спални + 2 бани (по-голям, еркер)"],
      ["Таван", "обитаем (гредоред, скосен)"], ["Паркинг", "открито 2 коли"]],
  },
  P: {
    name: "Премиум", ref: "краища · ≈ уголемен Тип 2",
    rows: [["Партер", "дневна + спалня/кабинет"], ["Етаж 2", "3–4 спални + дрешник (по-голям)"],
      ["Таван", "обитаем (гредоред, скосен)"], ["Паркинг", "двоен гараж"]],
  },
};

const NAV = [
  ["sec-products", "Продукти"],
  ["sec-layout", "Разпределение"],
  ["sec-plans", "Планове"],
  ["sec-finance", "Финанси"],
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
  ["atticRatio", "Таван — използваемост", 0.3, 0.7, 0.05, "×петно"],
];

const defaultsFor = (v) => ({ ...baseParams, wS: v.wS, wP: v.wP, dS: v.dS, dP: v.dP, attic: v.attic, road: v.road, front: v.front });

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
  const floors = FLOORS[product];
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
  const chooseVariant = (id) => { setVariant(id); const V = VARIANTS[id]; setDims((d) => ({ ...d, wS: V.wS, wP: V.wP, dS: V.dS, dP: V.dP, attic: V.attic, road: V.road, front: V.front })); };
  const reset = () => setDims(defaultsFor(v));
  const dirty = JSON.stringify(dims) !== JSON.stringify(defaultsFor(v));

  const liveUnits = v.seq.map((type) => ({ type, w: type === "P" ? dims.wP : dims.wS }));
  const M = useMemo(() => rowMetrics(liveUnits, v.leftMargin, v.rightMargin, dims), [variant, dims]);
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
        </nav>
      </header>

      <main className="main">
        {/* ——— ПРОДУКТИ ——— */}
        <section id="sec-products" className="sec">
          <div className="sec-h"><span className="eyebrow">Двата продукта · мин. 3 спални горе{dims.attic ? " · + таван" : ""}</span><h2>Стандарт ~{hmS.RZP} м² · Премиум ~{hmP.RZP} м²{dims.attic ? " (вкл. таван)" : ""}</h2></div>
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
          </div>

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
              <label className="chk"><input type="checkbox" checked={dims.attic} onChange={toggleAttic} /> Обитаем таван</label>
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

        {/* ——— АРХИВ ——— */}
        <section id="sec-archive" className="sec">
          <div className="sec-h"><span className="eyebrow">Архив · други планове</span><h2>Вариант А · 7 къщи (с таван)</h2></div>
          <p className="sub">По-сложен вариант — задържан за справка. РЗП {aM.totalRZP} м² · КИНТ {aM.kint.toFixed(2)} · двор стандарт {aHmS.rear + aHmS.front} м² · с обитаем таван.</p>
          <div className="plan-frame plan-frame-row hero-plan"><RowPlan units={aUnits} leftMargin={aV.leftMargin} rightMargin={aV.rightMargin} params={aDims} vertical={isMobile} /></div>
        </section>
      </main>

      <footer className="ft">Брестник · работен модел по осите · не замества правоспособен проектант · [за потвърждение по виза/ПУП]</footer>
    </div>
  );
}
