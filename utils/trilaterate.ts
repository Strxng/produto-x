import { IBeacon } from "@/interfaces/Beacon";

export const trilateration = (beacons: IBeacon[]) => {
  if (beacons.length < 3) {
    throw new Error("São necessários pelo menos 3 beacons para trilateração.");
  }

  const [B1, B2, B3] = beacons;

  const x1 = B1.x,
    y1 = B1.y,
    d1 = B1.distance;
  const x2 = B2.x,
    y2 = B2.y,
    d2 = B2.distance;
  const x3 = B3.x,
    y3 = B3.y,
    d3 = B3.distance;

  // Resolvendo o sistema de equações
  const A = 2 * (x2 - x1);
  const B = 2 * (y2 - y1);
  const C = 2 * (x3 - x1);
  const D = 2 * (y3 - y1);

  const E = d1 ** 2 - d2 ** 2 - x1 ** 2 + x2 ** 2 - y1 ** 2 + y2 ** 2;
  const F = d1 ** 2 - d3 ** 2 - x1 ** 2 + x3 ** 2 - y1 ** 2 + y3 ** 2;

  const denominator = A * D - B * C;
  if (denominator === 0) {
    throw new Error("Os beacons estão mal posicionados para trilateração.");
  }

  const x = (E * D - B * F) / denominator;
  const y = (A * F - E * C) / denominator;

  return { x, y };
};
