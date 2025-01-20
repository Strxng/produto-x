import { CONSTANTS } from "@/configs/contants";
import { BarCodeScanningResult } from "expo-camera";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

interface IUseQRCodeScanParams {
  onScanCorrect: () => void;
}

export const useQRCodeScan = ({ onScanCorrect }: IUseQRCodeScanParams) => {
  const [scannedCode, setScannedCode] = useState<string>("");

  const onScan = useCallback(
    (scanningResult: BarCodeScanningResult) => {
      if (!scannedCode && scanningResult.data !== scannedCode) {
        setScannedCode(scanningResult.data);
      }
    },
    [scannedCode]
  );

  useEffect(() => {
    if (scannedCode && scannedCode !== CONSTANTS.qrcodeKey) {
      Alert.alert(
        "QRCode inválido",
        "O QRCode lido é incorreto, leia outro por favor.",
        [{ text: "Entendi", onPress: () => setScannedCode("") }]
      );
    }

    if (scannedCode && scannedCode === CONSTANTS.qrcodeKey) {
      onScanCorrect();
    }
  }, [scannedCode, setScannedCode, Alert]);

  return { onScan };
};
