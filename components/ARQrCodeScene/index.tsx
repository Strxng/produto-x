import {
  ViroARScene,
  ViroARImageMarker,
  ViroARTrackingTargets,
} from "@reactvision/react-viro";

import { ARProductScene } from "../ARProductScene";

export const ARQrCodeScene = (props: any): React.JSX.Element => {
  const handleMarker = () => {
    console.log("leu o qrcode");
    props.arSceneNavigator.push({ scene: ARProductScene });
  };

  return (
    <ViroARScene>
      <ViroARImageMarker
        target={"qrcode"}
        onAnchorFound={() => handleMarker()}
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
