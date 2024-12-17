import { IBeacon } from "@/interfaces/Beacon";
import { BleManager, ScanMode } from "react-native-ble-plx";
import { calculateDistanceRssi } from "@/utils/calculateDistanceRssi";
import { addRssiValueAndGetAverage } from "@/utils/addRssiValueAndGetAverage";
import { MappedBeacons } from "./beacons";

// IDS dos beacons
const BEACONS_IDS = MappedBeacons.map((b) => b.id);

// Representa o RSSI em uma distância de 1 metro.
const MEASURE = -69;

// Representa o fator de atenuação do sinal, refletindo a perda do sinal no ambiente.
const MULTIPLIER = 3;

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
          const rssi = addRssiValueAndGetAverage(
            scannedDevice.id,
            scannedDevice.rssi!
          );

          const distance = calculateDistanceRssi(rssi, MEASURE, MULTIPLIER);

          const beacon = MappedBeacons.find((b) => b.id === scannedDevice.id)!;

          beacon.distance = distance;

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
