// model.js — ЕДИНСТВЕН ИЗТОЧНИК за масинг · двор · РЗП на app-а (Вар. А/Б).
// Геометрия в МЕТРИ. Калкулаторът, редакторът и изгледът четат оттук → едни и същи
// числа навсякъде. Числата са РАБОТНИ/схематични — [ЗА ПОТВЪРЖДЕНИЕ] по виза/ПУП.
//
// Дълбочина ПО ТИП: стандартите (тесни) са по-дълбоки от премиумите → повече РЗП и
// стъпаловидна задна линия, която естествено разделя терасите им от премиум къщите.
// РЗП е геометричен: партер (w×d) + горен етаж с еркер (w×(d+навес)) + таван (дял от петното).

export const PLOT = { W: 28.7, D: 60.45 };           // дълбочина × лице (след отнемане 2.25 м запад)
export const UPI_AREA = Math.round(PLOT.W * PLOT.D); // урегулиран имот ~1735 м²

export const baseParams = {
  road: 4,          // вътрешен път (север), м
  front: 5.5,       // преден двор/гараж апрон, м
  dS: 9,            // дълбочина СТАНДАРТ, м (двор отзад 72 при ширина 7)
  dP: 9,            // дълбочина ПРЕМИУМ, м
  over: 2.5,        // навес/конзола юг (= дълбочина на еркера на ет.2), м
  attic: true,      // обитаем таван (гредоред под покрива)
  atticRatio: 0.55, // използваема площ таван като дял от петното
  // — озеленяване (Наредба № 7, чл. 11 и чл. 19: Жм → мин. 40% от УПИ, 1/3 от него с дървета) —
  greenMin: 0.4,     // минимален П озел. (дял от УПИ) [ЗА ПОТВЪРЖДЕНИЕ по ПУП]
  frontGreen: false, // true = предният двор е озеленен, освен паркоместата/гаража
  terracePaved: true, // false = без тераса/декинг под навеса → ивицата е озеленена
  driveway: "paved", // "paved" = цяло паркомясто с настилка · "tracks" = тревна алея, настилка само под коловозите
  trackW: 0.6,       // широчина на един коловоз (2 на автомобил), м
  entryPathW: 1.2,   // пътека с настилка от пътя до входа (през предния двор), м
  stallArea: 12.5,   // настилка за едно паркомясто 2.5×5 м (маневрата е по вътрешния път)
  stallsS: 2,        // открити паркоместа на стандартна къща
  garageP: 30,       // двоен гараж на премиум (взима от предния двор)
  // — противопожарни (Наредба № Iз-1971: чл. 27, ал. 7 и табл. 17а) — изключени по подразбиране [ЗА ПОТВЪРЖДЕНИЕ] —
  fireTurn: false,       // площадка за обръщане в края на задънен път над 45 м
  fireTurnSide: "E",     // "E" = източен край (дъното на задънения път при вход от запад) · "W" = западен край (при входа)
  turnSize: 12,          // страна на площадката, м (12 × 12)
  fireTank: 0,           // противопожарен воден запас, м³ (0 = няма · 22 · 36)
  fireTankBuried: true,  // подземен резервоар, озеленен отгоре (брои се за озеленяване, Наредба № 7, чл. 11)
  tankDepth: 1.5,        // работна дълбочина на резервоара, м (площ = обем / дълбочина) — допускане
};

const R = (n) => Math.round(n);
const R1 = (n) => Math.round(n * 10) / 10;

export const typeDepth = (type, p = baseParams) => (type === "P" ? p.dP : p.dS);

// метрики на ЕДНА къща (ширина на СГРАДАТА w, тип 'S'|'P').
// yardW = ширина на ЗАДНИЯ ДВОР (по подразбиране = w). Различава се само в черновите
// с обслужващ път, където прорезът се взима от СГРАДАТА, а дворът остава непокътнат
// (по-широк от партера). За Вар. А/Б yardW=w → числата са идентични.
export function houseMetrics(w, type, p = baseParams, yardW = w) {
  const d = typeDepth(type, p);
  const priv = PLOT.W - p.road;                 // частна дълбочина (без пътя)
  const footprint = R1(w * d);                  // ЗП партер (по ширина на СГРАДАТА)
  const floor2 = R(w * (d + p.over));           // горен етаж (+ еркер на юг)
  const attic = p.attic ? R(footprint * p.atticRatio) : 0;
  const RZP = R(footprint + floor2 + attic);    // РЗП → от ширината на сградата
  const yardD = R1(priv - p.front - d);         // дълбочина заден двор
  const covered = R(p.over * yardW);            // покрита тераса (под навеса) — по ширина на ДВОРА
  const open = R(Math.max(0, yardD - p.over) * yardW);
  const rear = open + covered;                  // заден двор ОБЩО (вкл. терасата)
  const front = R(p.front * w);                 // преден апрон (паркинг/гараж зона) — по сграда
  // премиум: гараж ~6×5 яде от предния; стандарт: 2 коли на открито
  const frontOpen = type === "P" ? Math.max(0, front - p.garageP) : front;
  // озеленим преден двор: премиум → извън гаража; стандарт → извън паркоместата
  const stallPaved = p.driveway === "tracks" ? 2 * p.trackW * p.front : p.stallArea; // настилка на 1 паркомясто
  const entryPath = R1(p.entryPathW * p.front);  // настилка на пътеката към входа
  const frontPlantable = Math.max(0, R((type === "P" ? frontOpen : front - p.stallsS * stallPaved) - entryPath));
  const yardOK = rear >= 72;                    // работен минимум 72 м²/къща (вкл. тераса)
  return { w: R1(w), yardW: R1(yardW), type, d, footprint, floor2, attic, RZP, yardD, open, covered, rear, front, frontOpen, frontPlantable, entryPath, yardOK };
}

// метрики на ЦЯЛА редица (units = [{type,w}] + margins)
export function rowMetrics(units, leftMargin, rightMargin, p = baseParams) {
  // ефективна ширина на двора = ширина на сградата + по ½ от обслужващия път от всяка страна
  // (пътят спира на задната линия → дворът поема земята под него). Без път → = ширината (Вар. А/Б).
  const hm = units.map((u, i) => {
    const gapBefore = i > 0 ? (units[i - 1].gapAfter || 0) : 0;
    const effYW = u.w + gapBefore / 2 + (u.gapAfter || 0) / 2;
    return houseMetrics(u.w, u.type, p, effYW);
  });
  const totalRZP = R(hm.reduce((s, h) => s + h.RZP, 0));
  const totalZP = R(hm.reduce((s, h) => s + h.footprint, 0));
  const atticTotal = R(hm.reduce((s, h) => s + h.attic, 0));
  const kint = +(totalRZP / UPI_AREA).toFixed(2);
  const density = R((totalZP / UPI_AREA) * 100);
  const sUnits = hm.filter((h) => h.type === "S");
  const pick = (arr, key) => (arr.length ? R(arr.reduce((s, h) => s + h[key], 0) / arr.length) : 0);
  const avgRearS = pick(sUnits, "rear");
  const stagger = R1(Math.abs((p.dS) - (p.dP)));  // стъпало стандарт↔премиум (м)
  const minRear = hm.length ? Math.min(...hm.map((h) => h.rear)) : 0;
  const yardOK = hm.every((h) => h.yardOK);
  // запълване на лицето: лява граница + сумата ширини + дясна граница ≤ PLOT.D
  const rowLen = R1(hm.reduce((s, h) => s + h.w, 0));
  const gapSum = R1(units.reduce((s, u) => s + (u.gapAfter || 0), 0)); // обслужващи пътища (чернови); 0 при Вар. А/Б
  const used = R1(leftMargin + rowLen + gapSum + rightMargin);
  const slack = R1(PLOT.D - used);                // + = разполагаемо · − = надхвърля лицето
  // ОЗЕЛЕНЯВАНЕ — брои се само площ под растителност: открит заден двор + странични ивици
  // (+ преден двор извън паркирането, ако frontGreen). Път, паркоместа, сгради и покрити тераси = 0.
  const priv = PLOT.W - p.road;
  const greenRear = R(hm.reduce((s, h) => s + h.open + (p.terracePaved ? 0 : h.covered), 0));
  const greenSide = R((leftMargin + rightMargin) * priv);
  const greenFront = p.frontGreen ? R(hm.reduce((s, h) => s + h.frontPlantable, 0)) : 0;
  // ПРОТИВОПОЖАРНИ — площадка за обръщане в края на пътя (при по-широката странична ивица) и резервоар.
  // Площадката ляга върху пътя, страничната ивица и предния двор на крайната къща; каквото остане
  // отвъд предния двор, влиза в самата къща (intoHouse) → не се побира без промяна на реда.
  let turn = null;
  if (p.fireTurn && hm.length) {
    const side = p.fireTurnSide === "W" ? "L" : "R";   // планът: запад = ляво, изток = дясно
    const m = side === "L" ? leftMargin : rightMargin;
    const h = side === "L" ? hm[0] : hm[hm.length - 1];
    const dp = Math.max(0, Math.min(p.turnSize - p.road, priv));      // дълбочина извън пътя
    const sideLoss = Math.min(m, p.turnSize) * dp;                     // от страничната ивица (цялата е зелена)
    const fw = Math.max(0, Math.min(p.turnSize - m, h.w));             // широчина пред крайната къща
    const share = p.frontGreen && h.front > 0 ? h.frontPlantable / h.front : 0;
    const frontLoss = fw * Math.min(dp, p.front) * share;              // зелената част от предния ѝ двор
    const into = R1(Math.max(0, p.turnSize - p.road - p.front));       // колко влиза в крайната къща, м
    // две поправки на крайната къща, ако площадката остане: (а) скъсяване с `into` → губи РЗП на 2 нива;
    // (б) отдръпване назад с `into` → РЗП същото, задният ѝ двор (озеленяване) намалява.
    const rzpCut = R(totalRZP - 2 * into * h.w);
    turn = { side, size: p.turnSize, greenLoss: R(sideLoss + frontLoss), paved: R(p.turnSize * dp),
      houseW: R1(fw), intoHouse: into, type: h.type, garageLost: h.type === "P" && fw > 0,
      rzpCut, kintCut: +(rzpCut / UPI_AREA).toFixed(2), rearLossSetback: R(into * h.w) };
  }
  let tank = null;
  if (p.fireTank > 0) {
    const area = R1(p.fireTank / p.tankDepth);
    tank = { vol: p.fireTank, area, buried: p.fireTankBuried, greenLoss: p.fireTankBuried ? 0 : R(area) };
  }
  const greenFire = (turn ? turn.greenLoss : 0) + (tank ? tank.greenLoss : 0);
  const greenTotal = greenRear + greenSide + greenFront - greenFire;
  const greenNeed = R(UPI_AREA * p.greenMin);
  const green = {
    rear: greenRear, side: greenSide, front: greenFront, fire: greenFire, total: greenTotal,
    pct: +((greenTotal / UPI_AREA) * 100).toFixed(1), need: greenNeed, minPct: R(p.greenMin * 100),
    diff: greenTotal - greenNeed, ok: greenTotal >= greenNeed, treesNeed: R(greenNeed / 3),
  };
  return { green, fire: { turn, tank }, hm, totalRZP, totalZP, atticTotal, kint, density, avgRearS, stagger, minRear, yardOK, rowLen, gapSum, used, slack, upi: UPI_AREA, units: units.length };
}
