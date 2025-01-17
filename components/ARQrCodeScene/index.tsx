import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
} from "@reactvision/react-viro";

import { ARProductScene } from "../ARProductScene";

export const ARQrCodeScene = (props: any) => {
  return (
    <ViroARScene>
      <ViroARImageMarker
        target={"qrcode"}
        onAnchorFound={() => {
          console.log("QRCode Lido");
          props.sceneNavigator.push({ scene: ARProductScene });
        }}
      />
    </ViroARScene>
  );
};

ViroARTrackingTargets.createTargets({
  qrcode: {
    source: require("@/assets/images/qrcode-produto-x.jpg"),
    orientation: "Up",
    physicalWidth: 0.1,
  },
});
