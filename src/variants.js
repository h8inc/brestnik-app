// variants.js — ЕДИНСТВЕН ИЗТОЧНИК за разпределенията на реда (Вар. А / Б).
// Чете се и от App.jsx (интерактивния модел), и от Gallery.jsx (галерията) →
// една дефиниция, без разминаване. Геометрията в метри; числа [за потвърждение].
import { baseParams } from "./model.js";

export const VARIANTS = {
  A: {
    id: "A", label: "Вариант А · 7 къщи", date: "архив",
    sub: "2 премиум (краища) + 5 стандарт · двор 72 · с таван · РЗП 1339",
    seq: ["P", "S", "S", "S", "S", "S", "P"],
    wS: 7.0, wP: 8.73, dS: 9, dP: 9, attic: true, road: 4, front: 5.5,
    leftMargin: 5, rightMargin: 3,
  },
  B: {
    id: "B", label: "Вариант Б · 6 къщи", date: "ИЗБРАН",
    sub: "2 премиум (краища) + 4 стандарт · ИЗБРАН · път 5 · преден 5.0 · 2 етажа без таван · РЗП 1130",
    seq: ["P", "S", "S", "S", "S", "P"],
    wS: 8.21, wP: 9.8, dS: 9.5, dP: 9.5, attic: false, road: 5, front: 5.0,
    leftMargin: 5, rightMargin: 3,
  },
};

export const VARIANT_LIST = Object.values(VARIANTS);

// dims по подразбиране за даден вариант (за плъзгачите/модела)
export const defaultsFor = (v) => ({ ...baseParams, wS: v.wS, wP: v.wP, dS: v.dS, dP: v.dP, attic: v.attic, road: v.road, front: v.front });

// единиците на реда [{type, w}] за даден вариант
export const variantUnits = (v) => v.seq.map((t) => ({ type: t, w: t === "P" ? v.wP : v.wS }));
