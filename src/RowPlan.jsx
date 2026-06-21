import React from "react";
import { INK, GRAY, GREEN, AMBER } from "./theme.js";
import { houseMetrics, baseParams, PLOT } from "./model.js";

// Параметричен план на реда. Чертае N единици от подадените ширини+типове,
// север/улица горе, двор юг долу. Двата типа: P (премиум, гараж) и S (стандарт, 2 коли).
// Размерите идват от `params` (model.js) → реагира наживо на плъзгачите.
// Геометрия в МЕТРИ, мащаб PXM px/м.
const PXM = 13;
const PAD_L = 22, PAD_R = 22, PAD_T = 44, PAD_B = 82;

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

export default function RowPlan({ units, leftMargin, rightMargin, params = baseParams, footer }) {
  const p = { ...baseParams, ...params };
  const ROAD = p.road, FRONT = p.front, PRIV = PLOT.W - p.road, OVER = p.over;

  const totalW = leftMargin + units.reduce((s, u) => s + u.w, 0) + rightMargin;
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
  els.push(<text key="roadt" x={xStart + rowPx / 2} y={yStreet + ROAD * PXM / 2 + 4} fontSize="12" fill="#777" textAnchor="middle">Улица / достъп — север · {ROAD.toFixed(1)} м</text>);

  // странични дворове (крайни единици) — пълна частна дълбочина
  const sideTop = yFront, sideH = yBottom - yFront;
  els.push(<rect key="sgL" x={xStart} y={sideTop} width={leftMargin * PXM} height={sideH} fill={GARDEN} stroke={TREE_S} />);
  els.push(<text key="sgLt" x={xStart + leftMargin * PXM / 2} y={(sideTop + yBottom) / 2} fontSize="10.5" fill={GREEN} textAnchor="middle" transform={`rotate(-90 ${xStart + leftMargin * PXM / 2} ${(sideTop + yBottom) / 2})`}>страничен двор · {leftMargin} м</text>);
  els.push(<Tree key="sgLa" x={xStart + leftMargin * PXM / 2} y={sideTop + sideH * 0.3} r={9} />);
  els.push(<Tree key="sgLb" x={xStart + leftMargin * PXM * 0.6} y={sideTop + sideH * 0.65} r={8} />);
  const xRightG = xStart + (leftMargin + units.reduce((s, u) => s + u.w, 0)) * PXM;
  els.push(<rect key="sgR" x={xRightG} y={sideTop} width={rightMargin * PXM} height={sideH} fill={GARDEN} stroke={TREE_S} />);
  els.push(<text key="sgRt" x={xRightG + rightMargin * PXM / 2} y={(sideTop + yBottom) / 2} fontSize="9.5" fill={GREEN} textAnchor="middle" transform={`rotate(-90 ${xRightG + rightMargin * PXM / 2} ${(sideTop + yBottom) / 2})`}>стр. {rightMargin} м</text>);
  els.push(<Tree key="sgRa" x={xRightG + rightMargin * PXM / 2} y={sideTop + sideH * 0.45} r={7} />);

  // единици
  let cx = xStart + leftMargin * PXM;
  units.forEach((u, i) => {
    const isLeftEnd = i === 0, isRightEnd = i === units.length - 1;
    const w = u.w * PXM;
    const hm = houseMetrics(u.w, u.type, p);
    const gD = hm.d * PXM;                        // дълбочина партер ПО ТИП (стандарт ≠ премиум → стъпало)
    const yYardTop = yHouse + gD;
    const yYardH = Math.max(0, yBottom - yYardTop);
    const terrH = Math.min(OVER * PXM, yYardH);   // покрита тераса под навеса
    const k = "u" + i;

    // преден двор (паваж) — етикетът се рисува НАКРАЯ, върху колите/гаража
    els.push(<rect key={k + "f"} x={cx} y={yFront} width={w} height={FRONT * PXM} fill={PAVE} stroke="#ccc" />);

    if (u.type === "P") {
      const gw = Math.min(w - 28, 6 * PXM);
      const gx = isLeftEnd ? cx + w - gw - 6 : cx + 6;
      els.push(<rect key={k + "g"} x={gx} y={yFront + 6} width={gw} height={FRONT * PXM - 12} fill={GARAGE} stroke="#999" />);
      els.push(<text key={k + "gt"} x={gx + gw / 2} y={yFront + FRONT * PXM / 2 + 3} fontSize="9" fill="#444" textAnchor="middle">гараж</text>);
      const px = isLeftEnd ? cx + 4 : cx + w - 16;
      els.push(<rect key={k + "p"} x={px} y={yFront} width={12} height={FRONT * PXM} fill={PATH} />);
    } else {
      const cw = 2.5 * PXM, ch = Math.min(4.8 * PXM, FRONT * PXM - 6), cy = yFront + (FRONT * PXM - ch) / 2;
      els.push(<rect key={k + "c1"} x={cx + 6} y={cy} width={cw} height={ch} rx="4" fill="#f4f4f2" stroke="#b0b0b0" />);
      els.push(<rect key={k + "c2"} x={cx + 10 + cw} y={cy} width={cw} height={ch} rx="4" fill="#f4f4f2" stroke="#b0b0b0" />);
      els.push(<rect key={k + "p"} x={cx + w - 16} y={yFront} width={12} height={FRONT * PXM} fill={PATH} />);
    }

    // етикет ПРЕДЕН двор (пил върху апрона, чете се над колите/гаража)
    els.push(<g key={k + "fl"}><rect x={cx + w / 2 - 33} y={yFront + 3} width={66} height={14} rx={2} fill="rgba(255,255,255,0.85)" stroke="#d9d2bf" strokeWidth="0.5" /><text x={cx + w / 2} y={yFront + 13} fontSize="9.5" fontWeight="700" fill="#6b5e44" textAnchor="middle">преден {hm.front} м²</text></g>);

    // къща (партер)
    els.push(<rect key={k + "h"} x={cx} y={yHouse} width={w} height={gD} fill={HOUSE} stroke={u.type === "P" ? "#0D7377" : INK} strokeWidth={u.type === "P" ? 2 : 1} />);
    els.push(<text key={k + "hl"} x={cx + w / 2} y={yHouse + gD / 2 - 8} fontSize={u.type === "P" ? 12 : 11} fontWeight="700" fill="#fff" textAnchor="middle">{u.type === "P" ? "ПРЕМИУМ" : "СТАНДАРТ"}</text>);
    els.push(<text key={k + "ha"} x={cx + w / 2} y={yHouse + gD / 2 + 5} fontSize="10" fontWeight="700" fill="#cfe3e2" textAnchor="middle">РЗП {hm.RZP}</text>);
    if (hm.attic > 0)
      els.push(<text key={k + "ht"} x={cx + w / 2} y={yHouse + gD / 2 + 17} fontSize="8.5" fill="#e7c79a" textAnchor="middle">вкл. таван {hm.attic}</text>);

    // двор (юг): открит + покрита тераса (под навеса, до къщата)
    els.push(<rect key={k + "y"} x={cx} y={yYardTop} width={w} height={yYardH} fill={GARDEN} stroke={TREE_S} />);
    if (terrH > 4) {
      els.push(<rect key={k + "tr"} x={cx + 2} y={yYardTop} width={w - 4} height={terrH} fill={TERR} stroke={AMBER} strokeWidth="1" strokeDasharray="4 3" />);
      if (w > 70) els.push(<text key={k + "trl"} x={cx + w / 2} y={yYardTop + terrH / 2 + 3} fontSize="7.5" fill={AMBER} textAnchor="middle">навес {OVER}</text>);
    }
    els.push(<Tree key={k + "t1"} x={cx + w * 0.28} y={yYardTop + terrH + (yYardH - terrH) * 0.5} r={9} />);
    if (w > 90) els.push(<Tree key={k + "t2"} x={cx + w * 0.72} y={yYardTop + terrH + (yYardH - terrH) * 0.7} r={8} />);
    const yardCol = hm.yardOK ? GREEN : "#B23A2E";
    els.push(<text key={k + "yl"} x={cx + w / 2} y={yBottom - 17} fontSize="10.5" fontWeight="700" fill={yardCol} textAnchor="middle">заден {hm.rear} м²{hm.yardOK ? "" : " ⚠"}</text>);
    els.push(<text key={k + "yl2"} x={cx + w / 2} y={yBottom - 6} fontSize="8" fill={yardCol} textAnchor="middle">откр {hm.open} · тер {hm.covered}</text>);

    // ширина (над улицата)
    els.push(<text key={k + "w"} x={cx + w / 2} y={yStreet - 8} fontSize="10.5" fontWeight={u.type === "P" ? 700 : 400} fill={u.type === "P" ? "#0D7377" : "#555"} textAnchor="middle">{u.w}</text>);

    cx += w;
  });

  // пунктирани парцели на крайните + общ двор баджове
  const p0 = units[0], pN = units[units.length - 1];
  const hm0 = houseMetrics(p0.w, p0.type, p), hmN = houseMetrics(pN.w, pN.type, p);
  const totalLeft = hm0.rear + Math.round(leftMargin * PRIV);
  const totalRight = hmN.rear + Math.round(rightMargin * PRIV);
  const leftCellW = (leftMargin + p0.w) * PXM;
  const rightCellW = (rightMargin + pN.w) * PXM;
  els.push(<rect key="pcL" x={xStart} y={yFront} width={leftCellW} height={yBottom - yFront} fill="none" stroke="#0D7377" strokeWidth="2" strokeDasharray="8 4" />);
  els.push(<rect key="pcR" x={W - PAD_R - rightCellW} y={yFront} width={rightCellW} height={yBottom - yFront} fill="none" stroke="#0D7377" strokeWidth="2" strokeDasharray="8 4" />);
  els.push(<g key="bL"><rect x={xStart + 16} y={yBottom + 12} width={168} height={24} rx="4" fill="#0D7377" /><text x={xStart + 16 + 84} y={yBottom + 28} fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">К1 общ двор {totalLeft}</text></g>);
  els.push(<g key="bR"><rect x={W - PAD_R - 184} y={yBottom + 12} width={168} height={24} rx="4" fill="#0D7377" /><text x={W - PAD_R - 184 + 84} y={yBottom + 28} fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">К{units.length} общ двор {totalRight}</text></g>);
  if (footer) els.push(<text key="ft" x={W / 2} y={yBottom + 60} fontSize="11" fill={GRAY} textAnchor="middle">{footer}</text>);

  // компас
  els.push(<g key="cmp" transform={`translate(${W - 30},${PAD_T + 6})`}><line x1="0" y1="18" x2="0" y2="2" stroke={INK} strokeWidth="2" /><polygon points="-4,5 4,5 0,0" fill={INK} /><text x="0" y="30" fontSize="9" fill={INK} textAnchor="middle">С</text></g>);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", height: "100%" }}>
      {els}
    </svg>
  );
}
