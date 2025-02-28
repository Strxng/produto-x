import { IPosition } from "@/interfaces/Position";

export const calculateDistance3D = (
  position: IPosition,
  target: IPosition
): number => {
  return Math.sqrt(
    Math.pow(target.x - position.x, 2) +
      Math.pow(target.y - position.y, 2) +
      Math.pow(target.z - position.z, 2)
  );
};
