import {
  ViroAmbientLight,
  ViroARScene,
  ViroBox,
  ViroMaterials,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";

import { useState } from "react";

interface IARProductSceneProps {}

ViroMaterials.createMaterials({
  box: {
    diffuseColor: "red",
  },
});

export const ARProductScene = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized} style={{ width: "100%" }}>
      <ViroAmbientLight color="#FFFFFF" intensity={250} />

      <ViroBox
        position={[0, 0.05, -0.3]}
        height={0.2}
        width={0.2}
        length={0.2}
        scale={[0.5, 0.5, 0.5]}
        materials={["box"]}
      />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={{ color: "red" }}
      />
    </ViroARScene>
  );
};
