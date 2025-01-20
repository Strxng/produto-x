import { useFullLoadingContext } from "@/contexts/FullLoadingContext";
import { ActivityIndicator, Modal } from "react-native";
import { Text } from "../Text";

import * as S from "./styles";

export const FullLoading = () => {
  const { isLoading, message } = useFullLoadingContext();

  return (
    <Modal
      visible={isLoading}
      transparent
      style={{ height: "100%", width: "100%" }}
    >
      <S.OverlayContainer>
        <ActivityIndicator color={"white"} size={30} />
        <Text family={"regular"} size={"medium"} color={"secondary"}>
          {message}
        </Text>
      </S.OverlayContainer>
    </Modal>
  );
};
