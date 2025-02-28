export const calculateScale = (distance: number): number => {
  const SCALE_BASE = 0.3; // Fator de crescimento, ajustável
  const MIN_SCALE = 1; // O tamanho original do objeto
  const MAX_SCALE = 5; // O tamanho máximo permitido para longe

  const scale = SCALE_BASE * distance;
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));
};
