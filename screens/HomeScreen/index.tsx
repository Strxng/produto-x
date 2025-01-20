import { View } from "react-native";
import { useEffect } from "react";
import { useCameraPermissions } from "expo-camera";

import { ARQrCodeScene, PermissionsDeniedView } from "@/components";

import { ViroARSceneNavigator } from "@reactvision/react-viro";

export const HomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

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
    <ViroARSceneNavigator
      // autofocus={true}
      initialScene={{
        scene: ARQrCodeScene as any,
      }}
      // style={{ flex: 1, width: "100%", backgroundColor: "blue" }}
    />
  );
};
