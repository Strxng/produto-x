import { IBeacon } from "@/interfaces/Beacon";
import { BleManager, ScanMode } from "react-native-ble-plx";
import { calculateDistanceRssi } from "@/utils/calculateDistanceRssi";
import { MappedBeacons } from "./beacons";
import { addRssiValue, getRssiAverage } from "@/utils/rssi";

// IDS dos beacons
const BEACONS_IDS = MappedBeacons.map((b) => b.id);
// Representa o RSSI em uma distância de 1 metro.
const MEASURE = -64;
// Representa o fator de atenuação do sinal, refletindo a perda do sinal no ambiente.
const MULTIPLIER = 2.5;

class BLEServiceInstance {
  private authorizedIds: string[];
  private manager: BleManager;

  constructor() {
    this.manager = new BleManager();
    this.authorizedIds = BEACONS_IDS;
  }

  async startScan(callback: (beacon: IBeacon) => void) {
    await this.manager.startDeviceScan(
      [],
      { scanMode: ScanMode.LowPower, allowDuplicates: true },
      (error, scannedDevice) => {
        if (error) {
          console.warn(error);
          throw new Error("Falha ao escanear dispositivos bluetooth");
        }

        if (scannedDevice && this.authorizedIds.includes(scannedDevice.id)) {
          addRssiValue(scannedDevice.id, scannedDevice.rssi!);
          const rssiAverage = getRssiAverage(scannedDevice.id);

          const distance = calculateDistanceRssi(
            rssiAverage,
            MEASURE,
            MULTIPLIER
          );

          const beacon = MappedBeacons.find((b) => b.id === scannedDevice.id)!;
          beacon.distance = distance;
          beacon.rssi = rssiAverage;

          callback(beacon);
        }
      }
    );
  }

  async stopScan() {
    await this.manager.stopDeviceScan();
  }
}

export const BLEService = new BLEServiceInstance();
