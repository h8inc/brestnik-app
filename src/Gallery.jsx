import React, { useState, useEffect } from "react";
import FloorPlan from "./FloorPlan.jsx";
import RowPlan from "./RowPlan.jsx";
import { rowMetrics } from "./model.js";
import { VARIANT_LIST, defaultsFor as variantDims, variantUnits } from "./variants.js";
import { DRAFT_LIST, draftDims, draftUnits } from "./variants.draft.js";
import * as gen1 from "./gallery/gen1.js";
import * as gen2 from "./gallery/gen2.js";
import * as gen3 from "./gallery/gen3.js";
import * as gen4 from "./plans.js";
import * as deckC from "./gallery/deckC.js";
import * as siteT3 from "./gallery/siteT3.js";

// Архив — етажни планове от ПРЕДИШНИ приложения (други продуктови концепции, преди
// текущия brestnik-app). Същият формат данни → рендерират се със същия FloorPlan.
const PRIOR = [
  { id: "deck", date: "2026-06-17", data: deckC, app: "brestnik-dossier/deck",
    title: "Концепция „Option C\" · петно 9×9",
    note: "Първото досие-приложение. Сервиз на север, целият дневен обем отворен на юг. 6 плана (с мезонет таван).",
    gh: "h8inc/brestnik-deck (само деплой) · сорсът е локален",
    rzp: "Стандарт ~240 м² (партер 81 + ет.2 103 + мезонет ~55) · Премиум ~343 м² (партер 114 + ет.2 146 + мезонет ~82)",
    rzpNote: "Петно: стандарт 9×9, премиум 12.72×9. По-широк премиум (12.72 м) + 3-то ниво → много по-голямо РЗП от сегашното." },
  { id: "site", date: "2026-06-18", data: siteT3, app: "brestnik-site",
    title: "Концепция „Тип 3\" · 2 етажа (без таван)",
    note: "Продуктовият сайт. 4 плана (без таван).",
    gh: "h8inc/brestnik-homes",
    rzp: "Стандарт 175 м² (партер 77 + ет.2 98) · Премиум 235 м² (партер 104 + ет.2 131)",
    rzpNote: "Петно: стандарт 7.86×9.8, премиум 9.8×10.6. Премиумът тук е по-дълбок от сегашния." },
];

// Галерия „през времето" — всички поколения етажни планове, едно до друго, с реалния
// SVG рендер от досието. Достъп: ?gallery=1. Снапшотите идват от gallery/genN.js
// (точни копия на plans.js от съответния комит); gen4 = текущото plans.js.
// src = произход на снапшота (за проследимост към GitHub). Проверено с diff:
// gen1/gen2 са байт-в-байт идентични с h8inc/brestnik-app на съответния комит.
const GENS = [
  { id: "g1", date: "2026-06-20", data: gen1, title: "Поколение 1 · първи етажни планове",
    note: "Вариант А (7 къщи) · сервиз на север · 3 спални горе · с обитаем таван.",
    src: { kind: "github", repo: "h8inc/brestnik-app", ref: "b9d59f3 · 06-20" } },
  { id: "g2", date: "2026-06-21", data: gen2, title: "Поколение 2 · стълби в NE ъгъл",
    note: "Стълбите изравнени по етажите (NE ъгъл); партерите препланирани.",
    src: { kind: "github", repo: "h8inc/brestnik-app", ref: "3b050ea · 06-21" } },
  { id: "g3", date: "2026-06-22", data: gen3, title: "Поколение 3 · мастър suite + плосък покрив",
    note: "Етаж 2 = мастър suite (ensuite+дрешник) · щранг по калкан И · плосък покрив.",
    src: { kind: "local", repo: "Brestnik solo project (локално)", ref: "58ca60a · 06-22" } },
  { id: "g4", date: "текущо", data: gen4, title: "Поколение 4 · текущо (работно дърво)",
    note: "Последни корекции по мебелировка и разпределение на спалните.",
    src: { kind: "local", repo: "Brestnik solo project (локално)", ref: "работно дърво" } },
];

// Бадж за произход — синьо за GitHub, сиво за локално.
function RepoBadge({ src }) {
  if (!src) return null;
  const gh = src.kind === "github";
  return (
    <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, fontWeight: 600, color: gh ? "#fff" : "#444",
      background: gh ? "#2B5E8C" : "#E3DECE", padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap" }}>
      {gh ? "⌥ " : "● "}{src.repo} @ {src.ref}
    </span>
  );
}

// Клик-за-уголемяване: RowPlan в карта се отваря голям в центриран оверлей.
// Затваря се с клик извън плана или с Esc. Планът скалира до ширината на модала.
function ZoomModal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(18,19,21,0.74)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 10, padding: "14px 16px 18px",
        width: "min(96vw, 1500px)", maxHeight: "94vh", overflow: "auto", boxShadow: "0 16px 50px rgba(0,0,0,.45)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 10 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontFamily: "ui-serif, Georgia, serif" }}>{title}</h3>
          <button onClick={onClose} style={{ ...btn(false), fontSize: 13 }}>затвори ✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// RowPlan + бутон за уголемяване (click-to-expand). onZoom получава реквизитите за модала.
function ZoomableRow({ title, units, leftMargin, rightMargin, params, onZoom }) {
  const open = () => onZoom({ title, units, leftMargin, rightMargin, params });
  return (
    <div style={{ position: "relative", cursor: "zoom-in" }} onClick={open} title="Клик за уголемяване">
      <RowPlan units={units} leftMargin={leftMargin} rightMargin={rightMargin} params={params} />
      <button onClick={(e) => { e.stopPropagation(); open(); }}
        style={{ position: "absolute", top: 4, right: 4, fontFamily: "ui-monospace, monospace", fontSize: 11,
          padding: "3px 8px", borderRadius: 6, border: "1px solid #C9C2AE", background: "rgba(255,255,255,0.9)",
          color: "#1A1C1E", cursor: "zoom-in" }}>⛶ уголеми</button>
    </div>
  );
}

const COLS = [
  { key: "ground", label: "Партер · Стандарт", grp: "Стандарт" },
  { key: "floor2", label: "Етаж 2 · Стандарт", grp: "Стандарт" },
  { key: "attic", label: "Таван · Стандарт", grp: "Стандарт" },
  { key: "groundP", label: "Партер · Премиум", grp: "Премиум" },
  { key: "floor2P", label: "Етаж 2 · Премиум", grp: "Премиум" },
  { key: "atticP", label: "Таван · Премиум", grp: "Премиум" },
];

const wrap = { maxWidth: 1400, margin: "0 auto", padding: "24px 20px 80px", fontFamily: "ui-serif, Georgia, serif", color: "#1A1C1E" };

export default function Gallery() {
  const [only, setOnly] = useState("all"); // all | S | P
  const [view, setView] = useState("matrix"); // matrix (по поколение) | compare (по план)
  const [zoom, setZoom] = useState(null);     // {title, units, leftMargin, rightMargin, params} за модала
  const cols = COLS.filter((c) => only === "all" || (only === "S" ? c.grp === "Стандарт" : c.grp === "Премиум"));

  const planCard = (gen, col) => {
    const d = gen.data[col.key];
    if (!d) return null;
    return (
      <div key={gen.id + col.key} style={{ background: "#fff", border: "1px solid #E3DECE", borderRadius: 8, padding: 8, boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
        <FloorPlan data={d} scale={34} title={`${col.label}`} />
      </div>
    );
  };

  return (
    <div style={wrap}>
      <header style={{ borderBottom: "2px solid #1A1C1E", paddingBottom: 12, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: 26 }}>Брестник · Етажни планове през времето</h1>
          <a href="./index.html" style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#B23A2E" }}>← обратно към приложението</a>
        </div>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "#555", margin: "8px 0 0" }}>
          {GENS.length} поколения × {COLS.length} плана. Снапшоти от git (точни копия на plans.js); текущото е „работно дърво". Числата са работни [за потвърждение].
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
          {[["all", "Всички"], ["S", "Само Стандарт"], ["P", "Само Премиум"]].map(([k, l]) => (
            <button key={k} onClick={() => setOnly(k)} style={btn(only === k)}>{l}</button>
          ))}
          <span style={{ width: 16 }} />
          {[["matrix", "По поколение"], ["compare", "Сравни по план"]].map(([k, l]) => (
            <button key={k} onClick={() => setView(k)} style={btn(view === k)}>{l}</button>
          ))}
        </div>
      </header>

      <section style={{ marginBottom: 44, borderBottom: "1px dashed #C9C2AE", paddingBottom: 28 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 19 }}>Разпределения на реда</h2>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: "#555", margin: "0 0 14px" }}>
          Двата масинга на редицата — улица/север горе, двор/юг долу. Вариант Б е избраният активен продукт.
        </p>
        <div style={grid(VARIANT_LIST.length)}>
          {VARIANT_LIST.map((v) => {
            const m = rowMetrics(variantUnits(v), v.leftMargin, v.rightMargin, variantDims(v));
            return (
              <div key={v.id} style={{ background: "#fff", border: "1px solid #E3DECE", borderRadius: 8, padding: 12, boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{v.label}</h3>
                  <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: v.id === "B" ? "#2F7D4F" : "#B8762A" }}>{v.date}</span>
                </div>
                <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11.5, color: "#666", margin: "2px 0 8px" }}>{v.sub}</p>
                <ZoomableRow title={v.label} units={variantUnits(v)} leftMargin={v.leftMargin} rightMargin={v.rightMargin} params={variantDims(v)} onZoom={setZoom} />
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#1A1C1E", marginTop: 8 }}>
                  РЗП {m.totalRZP} м² · КИНТ {m.kint.toFixed(2)} · плътност {m.density}% · {m.yardOK ? "✓ дворове ≥72" : "⚠ двор <72"} <span style={{ color: "#999" }}>[за потвърждение]</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: 44, borderBottom: "1px dashed #C9C2AE", paddingBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 600, color: "#fff", background: "#6B4E8C", padding: "2px 8px", borderRadius: 4 }}>ЧЕРНОВА · работна площ</span>
          <h2 style={{ margin: 0, fontSize: 19 }}>Чернови · обслужващ път между къщите</h2>
        </div>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: "#555", margin: "8px 0 4px" }}>
          Идея: <b>обслужващ път 1.5 м</b> между станд. 1↔2 и станд. 3↔4 (база Вар. Б, П С С С С П). Редицата става три залепени двойки: П–С | път | С–С | път | С–П. Пътят е <b>само между сградите</b> и спира на задната линия → <b>задните дворове остават непокътнати</b>.
        </p>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#777", margin: "0 0 14px", padding: "6px 10px", background: "#F2EEF6", borderRadius: 6, borderLeft: "3px solid #6B4E8C" }}>
          Лицето е <b>запълнено</b> (≈60.45 м, slack ≈ 0) → 2× път = <b>3.0 м</b> трябва да дойдат отнякъде. Изток/запад са <b>правни граници на двора</b> (не се пипат), затова 3.0 м идват <b>само от ширината на къщите</b>, по <b>0.5 м на всичките 6</b> (стандартите страдат по-малко): станд. 8.21 → 7.71 м, прем. 9.8 → 9.3 м. <b>Сплит:</b> премиумът връща своите 0.5 м в <b>дълбочина</b> (9.5 → 10.1 м) → РЗП на премиума <b>остава 211</b>; смалява се само неговият <b>заден двор</b> (91 → 80 м², има резерв). Стандартите поемат цялата загуба: 177 → 166 → <b>ред 1130 → 1086 (−44 м² ≈ €62K)</b>; задните им дворове се запазват (≈78 м²). Прорезът е <b>само през сградната лента</b> (преден апрон + партер) и спира на задната линия → <b>задната градина е непрекъсната</b> (пътят не влиза в дворовете), терасите подравнени под къщите. Допълнително: 2 загубени калкан-шева → +4 външни фасади; 1.5 м е реален сервиз (≥1.2–1.5 м); прорез между сгради → ПБ-отстояния освен ако фасадите към него са глухи REI калкани <span style={{ color: "#999" }}>[за потвърждение по Наредба Iз-1971]</span>. <b>Не е активен продукт.</b> <span style={{ color: "#6B4E8C" }}>Клик върху план за уголемяване.</span>
        </p>
        {(() => {
          const baseB = VARIANT_LIST.find((v) => v.id === "B");
          const baseRZP = baseB ? rowMetrics(variantUnits(baseB), baseB.leftMargin, baseB.rightMargin, variantDims(baseB)).totalRZP : 1130;
          return (
            <div style={grid(DRAFT_LIST.length)}>
              {DRAFT_LIST.map((v) => {
                const m = rowMetrics(draftUnits(v), v.leftMargin, v.rightMargin, draftDims(v));
                const dRZP = m.totalRZP - baseRZP;
                const eur = Math.round(Math.abs(dRZP) * 1400 / 1000);
                return (
                  <div key={v.id} style={{ background: "#fff", border: "1px solid #E3DECE", borderRadius: 8, padding: 12, boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                      <h3 style={{ margin: 0, fontSize: 16 }}>{v.label}</h3>
                      <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#6B4E8C" }}>{v.date}</span>
                    </div>
                    <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11.5, color: "#666", margin: "2px 0 8px" }}>{v.sub}</p>
                    <ZoomableRow title={v.label} units={draftUnits(v)} leftMargin={v.leftMargin} rightMargin={v.rightMargin} params={draftDims(v)} onZoom={setZoom} />
                    <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#1A1C1E", marginTop: 8 }}>
                      РЗП {m.totalRZP} м² · КИНТ {m.kint.toFixed(2)} · плътност {m.density}% · {m.yardOK ? "✓ дворове ≥72" : "⚠ двор <72"}
                    </div>
                    <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, fontWeight: 700, color: dRZP < 0 ? "#B23A2E" : "#2F7D4F", marginTop: 2 }}>
                      спрямо Вар. Б ({baseRZP}): {dRZP === 0 ? "± 0 м² РЗП" : `${dRZP > 0 ? "+" : "−"}${Math.abs(dRZP)} м² РЗП ≈ €${eur}K`}
                    </div>
                    <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "#777", margin: "6px 0 0" }}>{v.note}</p>
                    {v.legal && (
                      <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "#7A2E2E", background: "#FBEFEC", border: "1px solid #E6C9C0", borderLeft: "3px solid #B23A2E", borderRadius: 6, padding: "7px 10px", margin: "8px 0 0" }}>
                        ⚖️ {v.legal}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </section>

      <section style={{ marginBottom: 44, borderBottom: "1px dashed #C9C2AE", paddingBottom: 28 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 19 }}>Архив · от предишни приложения</h2>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: "#555", margin: "0 0 18px" }}>
          По-ранни продуктови концепции от други app-ове, преди текущия модел. Рендерирани със същия чертожник за сравнение; <b>не са активният продукт</b>.
        </p>
        {PRIOR.map((src) => {
          const scols = cols.filter((c) => src.data[c.key]);
          if (!scols.length) return null;
          return (
            <div key={src.id} style={{ marginBottom: 30 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 600, color: "#fff", background: "#B8762A", padding: "2px 8px", borderRadius: 4 }}>АРХИВ · {src.app}</span>
                <h3 style={{ margin: 0, fontSize: 17 }}>{src.title}</h3>
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#999" }}>{src.date}</span>
                {src.gh && <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10.5, fontWeight: 600, color: "#fff", background: "#2B5E8C", padding: "2px 7px", borderRadius: 4, whiteSpace: "nowrap" }}>⌥ {src.gh}</span>}
              </div>
              <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#666", margin: "0 0 6px" }}>{src.note}</p>
              {src.rzp && (
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#1A1C1E", margin: "0 0 4px", padding: "6px 10px", background: "#F3EFE3", borderRadius: 6, borderLeft: "3px solid #B8762A" }}>
                  <b>РЗП:</b> {src.rzp} <span style={{ color: "#999" }}>[за потвърждение]</span>
                  {src.rzpNote && <div style={{ color: "#666", marginTop: 3 }}>{src.rzpNote}</div>}
                </div>
              )}
              <div style={{ height: 8 }} />
              <div style={grid(scols.length)}>
                {scols.map((col) => planCard(src, col))}
              </div>
            </div>
          );
        })}
      </section>

      {view === "matrix" ? (
        GENS.map((gen) => (
          <section key={gen.id} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
              <h2 style={{ margin: 0, fontSize: 19 }}>{gen.title}</h2>
              <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#2F7D4F" }}>{gen.date}</span>
              <RepoBadge src={gen.src} />
            </div>
            <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: "#555", margin: "0 0 12px" }}>{gen.note}</p>
            <div style={grid(cols.length)}>
              {cols.map((col) => planCard(gen, col))}
            </div>
          </section>
        ))
      ) : (
        cols.map((col) => (
          <section key={col.key} style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 19 }}>{col.label} · еволюция</h2>
            <div style={grid(GENS.length)}>
              {GENS.map((gen) => (
                <div key={gen.id + col.key}>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#2F7D4F", marginBottom: 4 }}>{gen.title.split(" · ")[0]} · {gen.date}</div>
                  <div style={{ marginBottom: 6 }}><RepoBadge src={gen.src} /></div>
                  {planCard(gen, col)}
                </div>
              ))}
            </div>
          </section>
        ))
      )}

      <ZoomModal open={!!zoom} title={zoom?.title} onClose={() => setZoom(null)}>
        {zoom && <RowPlan units={zoom.units} leftMargin={zoom.leftMargin} rightMargin={zoom.rightMargin} params={zoom.params} />}
      </ZoomModal>
    </div>
  );
}

const btn = (on) => ({
  fontFamily: "ui-monospace, monospace", fontSize: 13, padding: "6px 12px", borderRadius: 6,
  border: "1px solid " + (on ? "#1A1C1E" : "#C9C2AE"), background: on ? "#1A1C1E" : "#fff",
  color: on ? "#fff" : "#1A1C1E", cursor: "pointer",
});
const grid = (n) => ({
  display: "grid", gap: 16,
  gridTemplateColumns: `repeat(${Math.min(n, 3)}, minmax(0, 1fr))`,
});
