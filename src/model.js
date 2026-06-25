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
  const frontOpen = type === "P" ? Math.max(0, front - 30) : front;
  const yardOK = rear >= 72;                    // работен минимум 72 м²/къща (вкл. тераса)
  return { w: R1(w), yardW: R1(yardW), type, d, footprint, floor2, attic, RZP, yardD, open, covered, rear, front, frontOpen, yardOK };
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
  return { hm, totalRZP, totalZP, atticTotal, kint, density, avgRearS, stagger, minRear, yardOK, rowLen, gapSum, used, slack, upi: UPI_AREA, units: units.length };
}
