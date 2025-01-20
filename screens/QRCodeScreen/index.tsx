import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Camera } from "expo-camera";
import { useQRCodeScan } from "@/hooks/useQRCodeScan";
import { useFullLoadingContext } from "@/contexts/FullLoadingContext";
import { FullContainer, PermissionsDeniedView, Text } from "@/components";

import qrCodeSquare from "@/assets/images/qrcode.png";

import * as S from "./styles";

export const HomeScreen = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { startLoading } = useFullLoadingContext();

  const { onScan } = useQRCodeScan({
    onScanCorrect: () => {
      startLoading("Inicializando realidade aumentada");
      router.replace("/augmentedReality");
    },
  });

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <PermissionsDeniedView />;
  }

  return (
    <FullContainer>
      <S.Camera facing={"back"} onBarCodeScanned={onScan}>
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
    </FullContainer>
  );
};
