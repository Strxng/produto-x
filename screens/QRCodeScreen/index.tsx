import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "@/components";
import { CameraView, useCameraPermissions } from "expo-camera";

import * as S from "./styles";

export const QRCodeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

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
      <CameraView
        style={{ height: "100%", width: "100%" }}
        facing={"back"}
      ></CameraView>
    </S.Container>
  );
};
