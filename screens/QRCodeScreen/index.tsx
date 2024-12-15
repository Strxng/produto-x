import { Text } from "@/components";
import { View } from "react-native";
import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";
import { useQRCodeScan } from "@/hooks/useQRCodeScan";

import qrCodeSquare from "@/assets/images/qrcode.png";

import * as S from "./styles";

export const QRCodeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const { onScan } = useQRCodeScan({
    onScanCorrect: () => {
      console.log("escaneou certo");
    },
  });

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <S.Container>
        <Text
          family={"bold"}
          size={"large"}
          color={"primary"}
          style={{ textAlign: "center" }}
        >
          {"É necessário permitir\no uso da câmera no aplicativo."}
        </Text>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Camera
        facing={"back"}
        onBarcodeScanned={onScan}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      >
        <S.TextContainer>
          <Text family={"regular"} size={"large"} color={"secondary"}>
            Olá
          </Text>
          <Text
            family={"semiBold"}
            size={"extraLarge"}
            color={"secondary"}
            style={{ textAlign: "center" }}
          >
            Vamos te ajudar a encontrar o produto desejado
          </Text>
        </S.TextContainer>

        <S.QRCodeSquare source={qrCodeSquare} contentFit="fill" />

        <S.TextContainer>
          <Text
            family={"semiBold"}
            size={"extraLarge"}
            color={"secondary"}
            style={{ textAlign: "center" }}
          >
            Leia o QRCode para liberar a pesquisa por produtos
          </Text>
        </S.TextContainer>
      </S.Camera>
    </S.Container>
  );
};
