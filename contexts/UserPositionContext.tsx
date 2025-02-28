import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { BLEService } from "@/configs/bleManager";
import { IBeacon } from "@/interfaces/Beacon";
import { IPosition } from "@/interfaces/Position";

interface IUserPositionProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface IUserPositionContextData {
  beacons: IBeacon[];
  userPosition: IPosition;
  setUserPosition: Dispatch<SetStateAction<IPosition>>;
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
  const [userPosition, setUserPosition] = useState<IPosition>({
    x: 0,
    y: 0,
    z: 0,
  });

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
      setUserPosition,
      startMonitoring,
      stopMonitoring,
    }),
    [beacons, userPosition, setUserPosition, startMonitoring, stopMonitoring]
  );

  return (
    <UserPositionContext.Provider value={contextValue}>
      {children}
    </UserPositionContext.Provider>
  );
}

export const useUserPositionContext = (): IUserPositionContextData =>
  useContext(UserPositionContext);
