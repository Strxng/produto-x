import { useState } from "react";
import { useFullLoadingContext } from "@/contexts/FullLoadingContext";

import {
  ViroText,
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";

const ARProductScene = () => {
  const [ready, setReady] = useState<boolean>(false);
  const { stopLoading } = useFullLoadingContext();

  const onInitialized = (state: number) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setReady(true);
      stopLoading();
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {ready && (
        <ViroText
          text={"ALOOOOOUUU"}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, 0]}
          style={{ color: "red" }}
        />
      )}
    </ViroARScene>
  );
};

export const AugmentedRealityScreen = () => {
  return <ViroARSceneNavigator initialScene={{ scene: ARProductScene }} />;
};
