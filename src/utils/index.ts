export const add = (a: [number, number], b: [number, number]): [number, number] => {
  return [a[0] + b[0], a[1] + b[1]];
};

export const neg = (v: [number, number]): [number, number] => {
  return [-v[0], -v[1]];
};

export const sub = (a: [number, number], b: [number, number]): [number, number] => {
  return add(a, neg(b));
};

export const mult = (v: [number, number], s: number): [number, number] => {
  return [v[0] * s, v[1] * s];
};

export const formatPosition = (
  v: [number, number],
  size: [number, number],
  offset: [number, number],
  type: 'topLeft' | 'bottomRight',
) => {
  const isTopLeft = type === 'topLeft';
  const vSub = sub(v, offset);
  const vMap = vSub.map((_: number, i: number) => {
    if (isTopLeft) return Math.ceil(vSub[i] / size[i]) * size[i];
    return Math.floor(vSub[i] / size[i]) * size[i];
  }) as [number, number];

  if (isTopLeft) return sub(add(vMap, offset), size);
  return add(vMap, offset);
};

export const parseDoubles = (s: string): number[] => {
  return s
    .trim()
    .split(' ')
    .map((q: string) => Number.parseFloat(q)) as number[];
};

export const makeLen2 = (v: number[]): [number, number] => {
  if (v.length === 1) return [v[0], v[0]];
  if (v.length === 2) return [v[0], v[1]];
  return [0, 0];
};

export const fromXY = (v: { x: number; y: number }): [number, number] => {
  return [v.x, v.y];
};
