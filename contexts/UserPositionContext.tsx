import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { BLEService } from "@/configs/bleManager";
import { IBeacon } from "@/interfaces/Beacon";
import { IPosition } from "@/interfaces/Position";
import { trilateration } from "@/utils/trilaterate";

interface IUserPositionProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface IUserPositionContextData {
  beacons: IBeacon[];
  userPosition: IPosition | null;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

const UserPositionContext = createContext<IUserPositionContextData>(
  {} as IUserPositionContextData
);

export function UserPositionProvider({
  children,
}: IUserPositionProviderProps): JSX.Element {
  const [beacons, setBeacons] = useState<IBeacon[]>([]);

  const userPosition = useMemo((): IPosition | null => {
    if (!(beacons.length === 3)) return null;
    return trilateration(beacons);
  }, [beacons, trilateration]);

  const startMonitoring = useCallback(() => {
    BLEService.startScan((beacon) => {
      setBeacons((currents) => {
        const exists = currents.find((b) => b.id === beacon.id);

        if (!exists) {
          return [...currents, beacon];
        } else {
          return currents.map((b) => (b.id === beacon.id ? beacon : b));
        }
      });
    });
  }, [setBeacons]);

  const stopMonitoring = useCallback(() => {
    BLEService.stopScan();
  }, []);

  const contextValue: IUserPositionContextData = useMemo(
    () => ({
      beacons,
      userPosition,
      startMonitoring,
      stopMonitoring,
    }),
    [beacons, userPosition, startMonitoring, stopMonitoring]
  );

  return (
    <UserPositionContext.Provider value={contextValue}>
      {children}
    </UserPositionContext.Provider>
  );
}

export const useUserPositionContext = (): IUserPositionContextData =>
  useContext(UserPositionContext);
