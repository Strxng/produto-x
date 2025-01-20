import {
  ViroText,
  ViroARScene,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";

export const ARProductScene = () => {
  console.log("veio");

  const onInitialized = (state: any, reason: ViroTrackingReason) => {
    console.log("guncelleme", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      console.log("deu boa");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
      console.log("erro?");
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={"testando"}
        scale={[0.5, 0.5, 0.5]}
        height={20}
        width={20}
        position={[0, 0, -2]}
        style={{ color: "red" }}
      />
    </ViroARScene>
  );
};
