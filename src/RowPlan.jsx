import React from "react";
import { INK, GRAY, GREEN, AMBER } from "./theme.js";
import { houseMetrics, baseParams, PLOT } from "./model.js";

// Параметричен план на реда. Чертае N единици от подадените ширини+типове,
// север/улица горе, двор юг долу. Двата типа: P (премиум, гараж) и S (стандарт, 2 коли).
// Размерите идват от `params` (model.js) → реагира наживо на плъзгачите.
// Геометрия в МЕТРИ, мащаб PXM px/м.
const PXM = 13;
const PAD_L = 12, PAD_R = 12, PAD_T = 30, PAD_B = 22;

const GARDEN = "#dcebd2";
const HOUSE = "#2f3640";
const PAVE = "#e7e7e3";
const GARAGE = "#cfcfcf";
const PATH = "#ddd6c4";
const TREE = "#9ec07f", TREE_S = "#6f9a55";
const TERR = "#f0e6d4";

function Tree({ x, y, r = 8 }) {
  return <circle cx={x} cy={y} r={r} fill={TREE} stroke={TREE_S} strokeWidth="1.2" />;
}

export default function RowPlan({ units, leftMargin, rightMargin, params = baseParams, footer, vertical = false }) {
  const p = { ...baseParams, ...params };
  const ROAD = p.road, FRONT = p.front, PRIV = PLOT.W - p.road, OVER = p.over;
  // при вертикален план групата е завъртяна +90°; контра-завъртаме всеки текст −90°
  // около котвата му, за да остане хоризонтален (четим).
  const tr = (x, y) => (vertical ? `rotate(-90 ${x} ${y})` : undefined);

  const sumUnits = units.reduce((s, u) => s + u.w + (u.gapAfter || 0), 0); // ширини + обслужващи пътища (чернови)
  const totalW = leftMargin + sumUnits + rightMargin;
  const W = PAD_L + totalW * PXM + PAD_R;
  const yStreet = PAD_T;
  const yFront = yStreet + ROAD * PXM;
  const yHouse = yFront + FRONT * PXM;
  const yBottom = PAD_T + (ROAD + PRIV) * PXM;
  const H = yBottom + PAD_B;

  const rowPx = totalW * PXM;
  const xStart = PAD_L;
  const els = [];

  // улица (споделена)
  els.push(<rect key="road" x={xStart} y={yStreet} width={rowPx} height={ROAD * PXM} fill="#ededed" stroke="#bbb" />);
  els.push(<text key="roadt" x={xStart + rowPx / 2} y={yStreet + ROAD * PXM / 2 + 4} fontSize="12" fill="#777" textAnchor="middle" transform={tr(xStart + rowPx / 2, yStreet + ROAD * PXM / 2 + 4)}>Улица / достъп — север · {ROAD.toFixed(1)} м</text>);

  // странични дворове (крайни единици) — пълна частна дълбочина
  const sideTop = yFront, sideH = yBottom - yFront;
  els.push(<rect key="sgL" x={xStart} y={sideTop} width={leftMargin * PXM} height={sideH} fill={GARDEN} stroke={TREE_S} />);
  els.push(<text key="sgLt" x={xStart + leftMargin * PXM / 2} y={(sideTop + yBottom) / 2} fontSize="10.5" fill={GREEN} textAnchor="middle" transform={`rotate(-90 ${xStart + leftMargin * PXM / 2} ${(sideTop + yBottom) / 2})`}>страничен двор · {leftMargin} м · {Math.round(leftMargin * PRIV)} м²</text>);
  els.push(<Tree key="sgLa" x={xStart + leftMargin * PXM / 2} y={sideTop + sideH * 0.3} r={9} />);
  els.push(<Tree key="sgLb" x={xStart + leftMargin * PXM * 0.6} y={sideTop + sideH * 0.65} r={8} />);
  const xRightG = xStart + (leftMargin + units.reduce((s, u) => s + u.w + (u.gapAfter || 0), 0)) * PXM;
  els.push(<rect key="sgR" x={xRightG} y={sideTop} width={rightMargin * PXM} height={sideH} fill={GARDEN} stroke={TREE_S} />);
  els.push(<text key="sgRt" x={xRightG + rightMargin * PXM / 2} y={(sideTop + yBottom) / 2} fontSize="9.5" fill={GREEN} textAnchor="middle" transform={`rotate(-90 ${xRightG + rightMargin * PXM / 2} ${(sideTop + yBottom) / 2})`}>стр. двор · {rightMargin} м · {Math.round(rightMargin * PRIV)} м²</text>);
  els.push(<Tree key="sgRa" x={xRightG + rightMargin * PXM / 2} y={sideTop + sideH * 0.45} r={7} />);

  // единици — ЕДИН курсор за всичко (сграда И двор подравнени по вертикала, без зъб/процепи).
  // Пътят е прорез САМО през сградната лента; под задната линия дворът на всеки съсед поема
  // ПОЛОВИНАТА от пътя от всяка страна → задната градина е НЕПРЕКЪСНАТА (пътят спира на къщата).
  const seam = [];                 // геометрия за преградните стени между съседите
  let cx = xStart + leftMargin * PXM;
  units.forEach((u, i) => {
    const isLeftEnd = i === 0, isRightEnd = i === units.length - 1;
    const w = u.w * PXM;
    const gapBeforeM = i > 0 ? (units[i - 1].gapAfter || 0) : 0;   // път преди тази къща (м)
    const gapAfterM = u.gapAfter || 0;                            // път след тази къща (м)
    const effYW = u.w + gapBeforeM / 2 + gapAfterM / 2;           // ефективна ширина на двора (поема по ½ път от всяка страна)
    const hm = houseMetrics(u.w, u.type, p, effYW);              // РЗП по ширината на СГРАДАТА; двор по effYW
    const gD = hm.d * PXM;                        // дълбочина партер ПО ТИП (стандарт ≠ премиум → стъпало)
    const yYardTop = yHouse + gD;
    const yYardH = Math.max(0, yBottom - yYardTop);
    const terrH = Math.min(OVER * PXM, yYardH);   // покрита тераса под навеса (по ширина на КЪЩАТА)
    // задната градина се простира до средата на пътя от всяка страна → непрекъсната
    const yardX = cx - (gapBeforeM / 2) * PXM;
    const yardW = w + (gapBeforeM / 2 + gapAfterM / 2) * PXM;
    seam.push({ xR: cx + w, yTop: yYardTop, terrB: yYardTop + terrH, gapAfter: u.gapAfter || 0 });
    const k = "u" + i;

    // преден двор (паваж) — етикетът се рисува НАКРАЯ, върху колите/гаража
    els.push(<rect key={k + "f"} x={cx} y={yFront} width={w} height={FRONT * PXM} fill={PAVE} stroke="#ccc" />);

    if (u.type === "P") {
      const gw = Math.min(w - 28, 6 * PXM);
      const gx = isLeftEnd ? cx + w - gw - 6 : cx + 6;
      els.push(<rect key={k + "g"} x={gx} y={yFront + 6} width={gw} height={FRONT * PXM - 12} fill={GARAGE} stroke="#999" />);
      els.push(<text key={k + "gt"} x={gx + gw / 2} y={yFront + FRONT * PXM / 2 + 3} fontSize="9" fill="#444" textAnchor="middle" transform={tr(gx + gw / 2, yFront + FRONT * PXM / 2 + 3)}>гараж</text>);
      const px = isLeftEnd ? cx + 4 : cx + w - 16;
      els.push(<rect key={k + "p"} x={px} y={yFront} width={12} height={FRONT * PXM} fill={PATH} />);
    } else {
      const cw = 2.5 * PXM, ch = Math.min(4.8 * PXM, FRONT * PXM - 6), cy = yFront + (FRONT * PXM - ch) / 2;
      els.push(<rect key={k + "c1"} x={cx + 6} y={cy} width={cw} height={ch} rx="4" fill="#f4f4f2" stroke="#b0b0b0" />);
      els.push(<rect key={k + "c2"} x={cx + 10 + cw} y={cy} width={cw} height={ch} rx="4" fill="#f4f4f2" stroke="#b0b0b0" />);
      els.push(<rect key={k + "p"} x={cx + w - 16} y={yFront} width={12} height={FRONT * PXM} fill={PATH} />);
    }

    // етикет ПРЕДЕН двор (пил върху апрона, чете се над колите/гаража)
    els.push(<g key={k + "fl"} transform={tr(cx + w / 2, yFront + 10)}><rect x={cx + w / 2 - 33} y={yFront + 3} width={66} height={14} rx={2} fill="rgba(255,255,255,0.85)" stroke="#d9d2bf" strokeWidth="0.5" /><text x={cx + w / 2} y={yFront + 13} fontSize="9.5" fontWeight="700" fill="#6b5e44" textAnchor="middle">преден {hm.front} м²</text></g>);

    // къща (партер)
    els.push(<rect key={k + "h"} x={cx} y={yHouse} width={w} height={gD} fill={HOUSE} stroke={u.type === "P" ? "#0D7377" : INK} strokeWidth={u.type === "P" ? 2 : 1} />);
    // многоредови етикети: във вертикален режим стифваме по другата ос (за да не се припокриват)
    const hC = cx + w / 2, hM = yHouse + gD / 2;
    const hp = (off) => (vertical ? [hC + off, hM] : [hC, hM + off]);
    const [hlx, hly] = hp(-8), [hax, hay] = hp(5), [htx, hty] = hp(17);
    els.push(<text key={k + "hl"} x={hlx} y={hly} fontSize={u.type === "P" ? 12 : 11} fontWeight="700" fill="#fff" textAnchor="middle" transform={tr(hlx, hly)}>{u.type === "P" ? "ПРЕМИУМ" : "СТАНДАРТ"}</text>);
    els.push(<text key={k + "ha"} x={hax} y={hay} fontSize="10" fontWeight="700" fill="#cfe3e2" textAnchor="middle" transform={tr(hax, hay)}>РЗП {hm.RZP}</text>);
    if (hm.attic > 0)
      els.push(<text key={k + "ht"} x={htx} y={hty} fontSize="8.5" fill="#e7c79a" textAnchor="middle" transform={tr(htx, hty)}>вкл. таван {hm.attic}</text>);

    // двор (юг): открита градина (непрекъсната, поема ½ път от всяка страна) + покрита тераса (по къщата)
    els.push(<rect key={k + "y"} x={yardX} y={yYardTop} width={yardW} height={yYardH} fill={GARDEN} stroke={TREE_S} />);
    if (terrH > 4) {
      els.push(<rect key={k + "tr"} x={cx + 2} y={yYardTop} width={w - 4} height={terrH} fill={TERR} stroke={AMBER} strokeWidth="1" strokeDasharray="4 3" />);
      if (w > 70) els.push(<text key={k + "trl"} x={cx + w / 2} y={yYardTop + terrH / 2 + 3} fontSize="7.5" fill={AMBER} textAnchor="middle" transform={tr(cx + w / 2, yYardTop + terrH / 2 + 3)}>навес {OVER}</text>);
    }
    els.push(<Tree key={k + "t1"} x={yardX + yardW * 0.28} y={yYardTop + terrH + (yYardH - terrH) * 0.5} r={9} />);
    if (yardW > 90) els.push(<Tree key={k + "t2"} x={yardX + yardW * 0.72} y={yYardTop + terrH + (yYardH - terrH) * 0.7} r={8} />);
    const yardCol = hm.yardOK ? GREEN : "#B23A2E";
    const sideYard = Math.round((isLeftEnd ? leftMargin : isRightEnd ? rightMargin : 0) * PRIV);
    const yC2 = yardX + yardW / 2;
    const yp = (off) => (vertical ? [yC2 + off, yBottom - 12] : [yC2, yBottom - 12 + off]);
    const [ylx, yly] = yp(-6), [yl2x, yl2y] = yp(6);
    els.push(<text key={k + "yl"} x={ylx} y={yly} fontSize="11" fontWeight="700" fill={yardCol} textAnchor={vertical ? "start" : "middle"} transform={tr(ylx, yly)}>ДВОР {hm.rear + hm.front + sideYard} м²{hm.yardOK ? "" : " ⚠"}</text>);
    els.push(<text key={k + "yl2"} x={yl2x} y={yl2y} fontSize="8" fill={yardCol} textAnchor={vertical ? "start" : "middle"} transform={tr(yl2x, yl2y)}>заден {hm.rear} · преден {hm.front}{sideYard ? ` · стр. ${sideYard}` : ""}</text>);

    // ширина (над улицата)
    els.push(<text key={k + "w"} x={cx + w / 2} y={yStreet - 8} fontSize="10.5" fontWeight={u.type === "P" ? 700 : 400} fill={u.type === "P" ? "#0D7377" : "#555"} textAnchor="middle" transform={tr(cx + w / 2, yStreet - 8)}>{u.w}</text>);

    // обслужващ път (чернови): прорез САМО през СГРАДНАТА лента (преден апрон + партер),
    // спира на задната строителна линия → задните дворове остават непокътнати.
    if (u.gapAfter) {
      const gpx = u.gapAfter * PXM, gx = cx + w;
      els.push(<rect key={k + "path"} x={gx} y={yFront} width={gpx} height={yYardTop - yFront} fill={PATH} stroke="#c9c0a8" />);
      els.push(<text key={k + "pathl"} x={gx + gpx / 2} y={(yFront + yYardTop) / 2} fontSize="8" fontWeight="700" fill="#8a7d5e" textAnchor="middle" transform={`rotate(-90 ${gx + gpx / 2} ${(yFront + yYardTop) / 2})`}>обсл. път {u.gapAfter} м</text>);
      cx += w + gpx;
    } else {
      cx += w;
    }
  });

  // ПРЕГРАДНИ (шумо/визуални) стени между съседите — продължение на калкана по верандите + ~3.5 м в двора (зона за сядане)
  const GARD = 3.5;   // дължина на стената навътре в двора, м
  for (let i = 0; i < seam.length - 1; i++) {
    if (seam[i].gapAfter) continue;   // на този шев има обслужващ път, не споделен калкан
    const x = seam[i].xR;
    const y0 = Math.min(seam[i].yTop, seam[i + 1].yTop);
    const y1 = Math.min(Math.max(seam[i].terrB, seam[i + 1].terrB) + GARD * PXM, yBottom - 4);
    els.push(<line key={"sw" + i} x1={x} y1={y0} x2={x} y2={y1} stroke={INK} strokeWidth="3.4" strokeLinecap="round" />);
  }
  if (seam.length > 1) {
    const lx = seam[0].xR, ly = Math.min(Math.max(seam[0].terrB, seam[1].terrB) + GARD * PXM, yBottom - 4) + 8;
    els.push(<text key="swl" x={lx} y={ly} fontSize="7.5" fontWeight="700" fill={INK} textAnchor="middle" transform={tr(lx, ly)}>шумо-преграда (тераса + двор)</text>);
  }

  // пунктирани парцели на крайните (маркер на ъгловия парцел: премиум + страничен двор)
  const p0 = units[0], pN = units[units.length - 1];
  const leftCellW = (leftMargin + p0.w) * PXM;
  const rightCellW = (rightMargin + pN.w) * PXM;
  els.push(<rect key="pcL" x={xStart} y={yFront} width={leftCellW} height={yBottom - yFront} fill="none" stroke="#0D7377" strokeWidth="2" strokeDasharray="8 4" />);
  els.push(<rect key="pcR" x={W - PAD_R - rightCellW} y={yFront} width={rightCellW} height={yBottom - yFront} fill="none" stroke="#0D7377" strokeWidth="2" strokeDasharray="8 4" />);
  if (footer) els.push(<text key="ft" x={W / 2} y={yBottom + 60} fontSize="11" fill={GRAY} textAnchor="middle">{footer}</text>);

  // компас
  els.push(<g key="cmp" transform={`translate(${W - 30},${PAD_T + 6})`}><line x1="0" y1="18" x2="0" y2="2" stroke={INK} strokeWidth="2" /><polygon points="-4,5 4,5 0,0" fill={INK} /><text x="0" y="30" fontSize="9" fill={INK} textAnchor="middle">С</text></g>);

  return (
    <svg viewBox={`0 0 ${vertical ? H : W} ${vertical ? W : H}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", height: "auto" }}>
      {vertical ? <g transform={`translate(${H}, 0) rotate(90)`}>{els}</g> : els}
    </svg>
  );
}
