export const calculateDistanceRssi = (
  rssi: number,
  measure: number,
  multiplier: number
) => {
  return Math.pow(10, (measure - rssi) / (10 * multiplier));
};
