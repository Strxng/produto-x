import {
  ViroText,
  ViroARScene,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import { useState } from "react";

export const ARProductScene = () => {
  const [ready, setReady] = useState<boolean>(false);

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setReady(true);
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      console.log("erro?");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {ready && (
        <ViroText
          text={"testando"}
          scale={[0.5, 0.5, 0.5]}
          style={{ color: "red" }}
        />
      )}
    </ViroARScene>
  );
};
