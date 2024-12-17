import { IBeacon } from "@/interfaces/Beacon";

export const trilaterate = (beacons: IBeacon[]) => {
  const [b1, b2, b3] = beacons;

  // Coordenadas dos beacons e distâncias
  const x1 = b1.x,
    y1 = b1.y,
    d1 = b1.distance;
  const x2 = b2.x,
    y2 = b2.y,
    d2 = b2.distance;
  const x3 = b3.x,
    y3 = b3.y,
    d3 = b3.distance;

  // Transformando as equações para eliminar x^2 e y^2
  const A = 2 * (x2 - x1);
  const B = 2 * (y2 - y1);
  const C = d1 ** 2 - d2 ** 2 - x1 ** 2 - y1 ** 2 + x2 ** 2 + y2 ** 2;

  const D = 2 * (x3 - x2);
  const E = 2 * (y3 - y2);
  const F = d2 ** 2 - d3 ** 2 - x2 ** 2 - y2 ** 2 + x3 ** 2 + y3 ** 2;

  // Resolvendo para x e y
  const x = (C * E - F * B) / (E * A - B * D);
  const y = (C * D - A * F) / (B * D - A * E);

  return { x, y };
};
