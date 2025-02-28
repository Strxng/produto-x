const rssiValues: Record<any, any[]> = {};

// Calcula a média
export const getRssiAverage = (deviceId: string) => {
  const values = rssiValues[deviceId];
  const total = values.reduce((acc: number, value: number) => acc + value, 0);
  return total / values.length;
};

// Filtra o rssi caso tenha alterado muito
export const filterRssiValue = (deviceId: string, newValue: number) => {
  const average = getRssiAverage(deviceId);
  if (!average) return newValue;

  const THRESHOLD = 20;

  if (Math.abs(newValue - average) < THRESHOLD) {
    return newValue;
  } else {
    return null;
  }
};

// Adiciona o Rssi a lista de valores lidos (5 últimos)
export const addRssiValue = (deviceId: string, newValue: number) => {
  const MAX_SIZE = 10;

  if (!rssiValues[deviceId]) {
    rssiValues[deviceId] = []; // Inicializa a matriz se este for o primeiro valor
  }

  const rssi = filterRssiValue(deviceId, newValue);
  const values = rssiValues[deviceId];

  if (rssi) {
    values.push(rssi);
  }

  // Remove o valor mais antigo se o tamanho máximo da matriz for excedido
  if (values.length > MAX_SIZE) {
    values.shift();
  }
};
