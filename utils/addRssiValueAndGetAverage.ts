const rssiValues: any = {};

export const addRssiValueAndGetAverage = (
  deviceId: string,
  newValue: number
) => {
  const MAX_SIZE = 3;

  if (!rssiValues[deviceId]) {
    rssiValues[deviceId] = []; // Inicializa a matriz se este for o primeiro valor
  }

  const values = rssiValues[deviceId];
  values.push(newValue); // Adiciona um novo valor

  // Remove o valor mais antigo se o tamanho máximo da matriz for excedido
  if (values.length > MAX_SIZE) {
    values.shift();
  }

  // Calcula o valor médio
  const averageRssi =
    values.reduce((acc: number, value: number) => acc + value, 0) /
    values.length;

  return averageRssi;
};
