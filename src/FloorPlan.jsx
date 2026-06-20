import React from "react";
import { INK, LINE, RED, AMBER, GRAY, FURN, FILL, SERIF, MONO } from "./theme.js";

// Sx = мащаб по ширина (x,w), Sy = мащаб по дълбочина (y,h). Реформирането идва оттук:
// подай wScale/dScale → планът се разтегля/свива, без да се пипат данните в plans.js.
function Furniture({ items, Sx, Sy }) {
  const out = [];
  items.forEach((f, i) => {
    const [t, x, y, w = 0, h = 0, face] = f;
    const cx = (x + w / 2) * Sx, cy = (y + h / 2) * Sy;
    const rmin = Math.min(w * Sx, h * Sy);
    if (t === "counter") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#EDE7D8" stroke={FURN} strokeWidth="1" />);
    else if (t === "sink") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#fff" stroke={FURN} strokeWidth="1" />); out.push(<ellipse key={i+"b"} cx={cx} cy={cy} rx={w*Sx*0.28} ry={h*Sy*0.3} fill="none" stroke={FURN} strokeWidth="1" />); }
    else if (t === "hob") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#fff" stroke={FURN} strokeWidth="1" />); [[0.3,0.3],[0.7,0.3],[0.3,0.7],[0.7,0.7]].forEach(([a,b],k)=>out.push(<circle key={i+"h"+k} cx={(x+a*w)*Sx} cy={(y+b*h)*Sy} r={rmin*0.12} fill="none" stroke={FURN} strokeWidth="0.9" />)); }
    else if (t === "fridge") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#fff" stroke={FURN} strokeWidth="1" />); out.push(<line key={i+"l"} x1={x*Sx+3} y1={(y+h*0.4)*Sy} x2={(x+w)*Sx-3} y2={(y+h*0.4)*Sy} stroke={FURN} strokeWidth="0.8" />); }
    else if (t === "island") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="2" fill="#EDE7D8" stroke={FURN} strokeWidth="1" />);
    else if (t === "table") {
      out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="3" fill="#fff" stroke={FURN} strokeWidth="1.1" />);
      const chairs = []; const nx = Math.max(1, Math.round(w/0.7));
      for (let a=0;a<nx;a++){ chairs.push([(x+(a+0.5)*w/nx), y-0.18]); chairs.push([(x+(a+0.5)*w/nx), y+h+0.18]); }
      chairs.forEach((c,k)=>out.push(<circle key={i+"c"+k} cx={c[0]*Sx} cy={c[1]*Sy} r={0.16*Sx} fill="none" stroke={FURN} strokeWidth="0.8" />));
    }
    else if (t === "sofa") {
      out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="3" fill="#EFEAE0" stroke={FURN} strokeWidth="1" />);
      const bk = face === "N" ? { x: x*Sx, y: (y+h*0.72)*Sy, w: w*Sx, h: h*Sy*0.28 }
               : face === "E" ? { x: x*Sx, y: y*Sy, w: w*Sx*0.28, h: h*Sy }
               : face === "W" ? { x: (x+w*0.72)*Sx, y: y*Sy, w: w*Sx*0.28, h: h*Sy }
               : { x: x*Sx, y: y*Sy, w: w*Sx, h: h*Sy*0.28 };
      out.push(<rect key={i+"b"} x={bk.x} y={bk.y} width={bk.w} height={bk.h} fill="#E2DBCB" stroke={FURN} strokeWidth="0.8" />);
    }
    else if (t === "armchair") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="4" fill="#EFEAE0" stroke={FURN} strokeWidth="1" />);
    else if (t === "coffee") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="4" fill="#F2EEE4" stroke={FURN} strokeWidth="1" />); out.push(<rect key={i+"i"} x={(x+0.08)*Sx} y={(y+0.06)*Sy} width={(w-0.16)*Sx} height={(h-0.12)*Sy} rx="2" fill="none" stroke={FURN} strokeWidth="0.5" />); }
    else if (t === "tv") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill={INK} />);
    else if (t === "bed") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="2" fill="#fff" stroke={FURN} strokeWidth="1.1" />); out.push(<rect key={i+"p"} x={(x+0.1)*Sx} y={(y+0.1)*Sy} width={(w-0.2)*Sx} height={0.5*Sy} fill="#EFEAE0" stroke={FURN} strokeWidth="0.7" />); }
    else if (t === "ns") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#fff" stroke={FURN} strokeWidth="0.7" />);
    else if (t === "wardrobe") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#EDE7D8" stroke={FURN} strokeWidth="1" />); out.push(<line key={i+"l"} x1={x*Sx} y1={y*Sy} x2={(x+w)*Sx} y2={(y+h)*Sy} stroke={FURN} strokeWidth="0.5" />); }
    else if (t === "desk") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#EDE7D8" stroke={FURN} strokeWidth="1.1" />); out.push(<circle key={i+"ch"} cx={cx} cy={(y+h+0.35)*Sy} r={0.2*Sx} fill="none" stroke={FURN} strokeWidth="0.9" />); }
    else if (t === "toilet") out.push(<ellipse key={i} cx={cx} cy={cy} rx={w*Sx*0.4} ry={h*Sy*0.45} fill="#fff" stroke={FURN} strokeWidth="1" />);
    else if (t === "basin") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx="3" fill="#fff" stroke={FURN} strokeWidth="1" />);
    else if (t === "shower") { out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill="#fff" stroke={FURN} strokeWidth="1" />); out.push(<line key={i+"a"} x1={x*Sx} y1={y*Sy} x2={(x+w)*Sx} y2={(y+h)*Sy} stroke={FURN} strokeWidth="0.6" />); out.push(<line key={i+"b2"} x1={(x+w)*Sx} y1={y*Sy} x2={x*Sx} y2={(y+h)*Sy} stroke={FURN} strokeWidth="0.6" />); }
    else if (t === "tub") out.push(<rect key={i} x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} rx={h*Sy*0.4} fill="#fff" stroke={FURN} strokeWidth="1" />);
  });
  return <g>{out}</g>;
}

function Windows({ wins, w, h, Sx, Sy }) {
  return (wins || []).map((win, i) => {
    const [edge, p, len, label] = win;
    let x1,y1,x2,y2,lx,ly,rot=0;
    if (edge==="N"){x1=p*Sx;y1=0;x2=(p+len)*Sx;y2=0;lx=(p+len/2)*Sx;ly=-4;}
    if (edge==="S"){x1=p*Sx;y1=h*Sy;x2=(p+len)*Sx;y2=h*Sy;lx=(p+len/2)*Sx;ly=h*Sy+11;}
    if (edge==="E"){x1=w*Sx;y1=p*Sy;x2=w*Sx;y2=(p+len)*Sy;lx=w*Sx+9;ly=(p+len/2)*Sy;rot=90;}
    if (edge==="W"){x1=0;y1=p*Sy;x2=0;y2=(p+len)*Sy;lx=-9;ly=(p+len/2)*Sy;rot=90;}
    const col = edge==="S"?RED:LINE;
    return (<g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={col} strokeWidth="3.5" />{label && <text x={lx} y={ly} fontSize="7" fill={col} textAnchor="middle" fontFamily={MONO} transform={rot?`rotate(${rot} ${lx} ${ly})`:undefined}>{label}</text>}</g>);
  });
}

// Данните за плановете живеят в plans.js (единствен източник). Този файл е SVG рендерът.
// wScale/dScale реформират по ширина/дълбочина (1 = както е начертано). rooms: [x,y,w,h,name,area,type,opts]
export default function FloorPlan({ data, scale = 46, wScale = 1, dScale = 1, title }) {
  const Sx = scale * wScale, Sy = scale * dScale;
  const W = data.w * Sx, H = data.h * Sy;
  const padL = 34, padR = 40, padT = 30, padB = 22;
  const terraceH = data.terrace ? data.terrace[3] * Sy : 0;
  const vw = padL + W + padR, vh = padT + H + terraceH + padB;
  const gab = Math.round(data.w * wScale * data.h * dScale);
  const reflowed = wScale !== 1 || dScale !== 1;

  const stairTreads = (x, y, w, h, o = {}) => {
    const t = [], n = 7, half = h / 2, fw = w * 0.46;
    for (let i = 1; i < n; i++) t.push(<line key={"a"+i} x1={x+w-fw} y1={y+(half/n)*i} x2={x+w} y2={y+(half/n)*i} stroke={LINE} strokeWidth="0.8" />);
    for (let i = 1; i < n; i++) t.push(<line key={"b"+i} x1={x} y1={y+half+(half/n)*i} x2={x+fw} y2={y+half+(half/n)*i} stroke={LINE} strokeWidth="0.8" />);
    const up = (cx) => { t.push(<line key={"u"+cx} x1={cx} y1={y+h-6} x2={cx} y2={y+8} stroke={INK} strokeWidth="1.1" />); t.push(<polygon key={"uh"+cx} points={`${cx},${y+5} ${cx-3},${y+12} ${cx+3},${y+12}`} fill={INK} />); };
    const dn = (cx) => { t.push(<line key={"d"+cx} x1={cx} y1={y+8} x2={cx} y2={y+h-8} stroke={INK} strokeWidth="1.1" />); t.push(<polygon key={"dh"+cx} points={`${cx},${y+h-3} ${cx-3},${y+h-10} ${cx+3},${y+h-10}`} fill={INK} />); };
    if (o.updown) { up(x + w * 0.34); dn(x + w * 0.66); }
    else if (o.down) dn(x + w * 0.62);
    else up(x + w * 0.62);
    const lab = o.updown ? "↑ таван · ↓ партер" : o.down ? "↓ към етаж 2" : "↑ към етаж 2";
    t.push(<text key="sl" x={x + w / 2} y={y + h - 4} fontSize="6" fill={GRAY} textAnchor="middle" fontFamily={MONO}>{lab}</text>);
    return t;
  };
  const doorGaps = (x, y, w, h, o) => {
    const g = [];
    const nDoor = (d, k) => {
      g.push(<line key={k} x1={(x+d[0])*Sx} y1={y*Sy} x2={(x+d[0]+d[1])*Sx} y2={y*Sy} stroke={d[3] || FILL.hall} strokeWidth="4.5" />);
      if (d[2]) g.push(<text key={k+"t"} x={(x+d[0]+d[1]/2)*Sx} y={y*Sy+10} fontSize="6.3" fontWeight="700" fill={d[3] || FURN} textAnchor="middle" fontFamily={MONO}>{d[2]}</text>);
    };
    if (o.doorN) nDoor(o.doorN, "dN");
    if (o.doorN2) nDoor(o.doorN2, "dN2");
    if (o.doorS) g.push(<line key="dS" x1={(x+o.doorS[0])*Sx} y1={(y+h)*Sy} x2={(x+o.doorS[0]+o.doorS[1])*Sx} y2={(y+h)*Sy} stroke={FILL.hall} strokeWidth="4.5" />);
    if (o.doorW) g.push(<line key="dW" x1={x*Sx} y1={(y+o.doorW[0])*Sy} x2={x*Sx} y2={(y+o.doorW[0]+o.doorW[1])*Sy} stroke={FILL.hall} strokeWidth="4.5" />);
    if (o.doorE) g.push(<line key="dE" x1={(x+w)*Sx} y1={(y+o.doorE[0])*Sy} x2={(x+w)*Sx} y2={(y+o.doorE[0]+o.doorE[1])*Sy} stroke={FILL.hall} strokeWidth="4.5" />);
    return g;
  };

  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", height: "100%" }}>
      <text x={padL} y={18} fontSize="13" fontWeight="800" fill={INK} fontFamily={SERIF}>{title || `${data.label}${reflowed ? ` · текущ ~${gab} м²` : ""}`}</text>
      <defs><pattern id="eaves" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke={GRAY} strokeWidth="1.3" /></pattern></defs>
      <g transform={`translate(${padL}, ${padT})`}>
        <rect x="0" y="0" width={W} height={H} fill={FILL.living} />
        {data.rooms.map(([x, y, w, h, name, area, type, o = {}], i) => (
          <g key={i}>
            <rect x={x*Sx} y={y*Sy} width={w*Sx} height={h*Sy} fill={o.faint ? "url(#eaves)" : (FILL[type] || "#fff")} stroke={GRAY} strokeWidth="0.8" opacity={o.faint ? 0.55 : 1} />
            {type === "stair" && stairTreads(x*Sx, y*Sy, w*Sx, h*Sy, o)}
            {o.furniture && <Furniture items={o.furniture} Sx={Sx} Sy={Sy} />}
            {doorGaps(x, y, w, h, o)}
            <text x={(x+w/2)*Sx} y={(y+(o.combined?0.5:h/2))*Sy - 1} fontSize={o.combined?"9":"8.2"} fontWeight="700" fill={INK} textAnchor="middle" fontFamily={SERIF} style={{ pointerEvents: "none" }}>{name}</text>
            {area > 0 && <text x={(x+w/2)*Sx} y={(y+(o.combined?0.5:h/2))*Sy + 10} fontSize="7.6" fill={GRAY} textAnchor="middle" fontFamily={MONO}>{reflowed ? Math.round(w*wScale*h*dScale) : area} м²</text>}
          </g>
        ))}
        {data.rooms.filter(r => r[7] && r[7].glazeS).map((r, i) => {
          const o = r[7], yb = (r[1] + r[3]) * Sy;
          return <line key={"g"+i} x1={(r[0]+o.glazeS[0])*Sx} y1={yb} x2={(r[0]+o.glazeS[0]+o.glazeS[1])*Sx} y2={yb} stroke={RED} strokeWidth="3.5" />;
        })}
        <Windows wins={data.wins} w={data.w} h={data.h} Sx={Sx} Sy={Sy} />
        <rect x="0" y="0" width={W} height={H} fill="none" stroke={INK} strokeWidth="3.5" />
        <line x1="1.5" y1="0" x2="1.5" y2={H} stroke={INK} strokeWidth="6" />
        <line x1={W-1.5} y1="0" x2={W-1.5} y2={H} stroke={INK} strokeWidth="6" />
        {(data.risers || []).map((r, i) => (
          <g key={"rs"+i}>
            <circle cx={r[0]*Sx} cy={r[1]*Sy} r="5.5" fill="#fff" stroke={RED} strokeWidth="1.6" />
            <line x1={r[0]*Sx-4} y1={r[1]*Sy} x2={r[0]*Sx+4} y2={r[1]*Sy} stroke={RED} strokeWidth="1.1" />
            <line x1={r[0]*Sx} y1={r[1]*Sy-4} x2={r[0]*Sx} y2={r[1]*Sy+4} stroke={RED} strokeWidth="1.1" />
            {r[2] && <text x={r[0]*Sx} y={r[1]*Sy-8} fontSize="6.4" fontWeight="700" fill={RED} textAnchor="middle" fontFamily={MONO}>{r[2]}</text>}
          </g>
        ))}
        {data.terrace && (<g>
          <rect x={data.terrace[0]*Sx} y={H} width={data.terrace[2]*Sx} height={terraceH} fill={FILL.outdoor} stroke={AMBER} strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={(data.terrace[0]+data.terrace[2]/2)*Sx} y={H+terraceH/2+2} fontSize="8.4" fontWeight="700" fill={AMBER} textAnchor="middle" fontFamily={SERIF}>{data.terrace[4]}</text>
        </g>)}
      </g>
      <g transform={`translate(${padL + W + 18}, ${padT + 16})`} fontFamily={MONO}>
        <line x1="0" y1="10" x2="0" y2="-10" stroke={INK} strokeWidth="1.3" />
        <polygon points="0,-10 -3.5,-2 3.5,-2" fill={INK} />
        <text x="0" y="-13" fontSize="8" fill={INK} textAnchor="middle">С</text>
        <text x="0" y="23" fontSize="6.5" fill={GRAY} textAnchor="middle">улица</text>
      </g>
    </svg>
  );
}
