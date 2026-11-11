// Time series from the Hastings–Powell and Ikeda systems, computed at build time and drawn as
// faint traces at the top of each section. Nothing here runs in the browser.

type Vec = [number, number, number];
type Field = (s: Vec) => Vec;

const hastingsPowell: Field = ([x, y, z]) => {
  const f1 = (5 * x) / (1 + 3 * x);
  const f2 = (0.1 * y) / (1 + 2 * y);
  return [x * (1 - x) - f1 * y, f1 * y - f2 * z - 0.4 * y, f2 * z - 0.01 * z];
};

function rk4(f: Field, s: Vec, h: number): Vec {
  const k1 = f(s);
  const k2 = f([s[0] + (h / 2) * k1[0], s[1] + (h / 2) * k1[1], s[2] + (h / 2) * k1[2]]);
  const k3 = f([s[0] + (h / 2) * k2[0], s[1] + (h / 2) * k2[1], s[2] + (h / 2) * k2[2]]);
  const k4 = f([s[0] + h * k3[0], s[1] + h * k3[1], s[2] + h * k3[2]]);
  return [0, 1, 2].map((i) => s[i] + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) as Vec;
}

function series(f: Field, s0: Vec, h: number, skip: number, steps: number, component: number): number[] {
  let s = s0;
  for (let i = 0; i < skip; i++) s = rk4(f, s, h);
  const out: number[] = [];
  for (let i = 0; i < steps; i++) {
    s = rk4(f, s, h);
    out.push(s[component]);
  }
  return out;
}

const W = 1000; // viewBox width
const H = 36; // viewBox height

// Min/max per bucket keeps sharp spikes (neuron bursts) intact when a long series is reduced.
function tracePath(values: number[], buckets = 420): string {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const y = (v: number) => (H - 2 - ((v - lo) / (hi - lo || 1)) * (H - 4)).toFixed(1);
  const per = values.length / buckets;
  const pts: string[] = [];
  for (let b = 0; b < buckets; b++) {
    const seg = values.slice(Math.floor(b * per), Math.max(Math.floor((b + 1) * per), Math.floor(b * per) + 1));
    let mn = Infinity, mx = -Infinity, imn = 0, imx = 0;
    seg.forEach((v, i) => {
      if (v < mn) { mn = v; imn = i; }
      if (v > mx) { mx = v; imx = i; }
    });
    const x = ((b + 0.5) / buckets) * W;
    const first = imn < imx ? mn : mx;
    const second = imn < imx ? mx : mn;
    pts.push(`${x.toFixed(1)} ${y(first)}`);
    if (mx - mn > (hi - lo) * 0.01) pts.push(`${x.toFixed(1)} ${y(second)}`);
  }
  return 'M' + pts.join('L');
}

// Discrete maps are drawn as stems, one per iterate.
function stemPath(values: number[]): string {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  return values
    .map((v, i) => {
      const x = (((i + 0.5) / values.length) * W).toFixed(1);
      const top = (H - 2 - ((v - lo) / (hi - lo || 1)) * (H - 4)).toFixed(1);
      return `M${x} ${H - 1}V${top}`;
    })
    .join('');
}

function ikedaOrbit(n: number, skip: number, pick: (x: number, y: number) => number): number[] {
  let x = 0.836, y = -0.4;
  for (let i = 0; i < skip; i++) [x, y] = ikedaStep(x, y);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    [x, y] = ikedaStep(x, y);
    out.push(pick(x, y));
  }
  return out;
}
function ikedaStep(x: number, y: number): [number, number] {
  const t = 0.4 - 6 / (1 + x * x + y * y);
  return [1 + 0.9 * (x * Math.cos(t) - y * Math.sin(t)), 0.9 * (x * Math.sin(t) + y * Math.cos(t))];
}

export type Signal = { d: string; label: string; stems?: boolean };

export const signals: Record<string, Signal> = {
  hpPrey: {
    d: tracePath(series(hastingsPowell, [0.8, 0.2, 9], 0.05, 200000, 40000, 0)),
    label: 'prey x(t) · Hastings–Powell',
  },
  ikedaModulus: {
    d: stemPath(ikedaOrbit(140, 500, (x, y) => Math.hypot(x, y))),
    label: '|zₙ| · Ikeda Map',
    stems: true,
  },
  hpPredator: {
    d: tracePath(series(hastingsPowell, [0.8, 0.2, 9], 0.05, 230000, 40000, 1)),
    label: 'predator y(t) · Hastings–Powell',
  },
  ikedaRe: {
    d: stemPath(ikedaOrbit(140, 900, (x) => x)),
    label: 'Re zₙ · Ikeda Map',
    stems: true,
  },
  hpTop: {
    d: tracePath(series(hastingsPowell, [0.8, 0.2, 9], 0.05, 260000, 60000, 2)),
    label: 'top predator z(t) · Hastings–Powell',
  },
  ikedaIm: {
    d: stemPath(ikedaOrbit(140, 1300, (_, y) => y)),
    label: 'Im zₙ · Ikeda Map',
    stems: true,
  },
};
