import React from "react";
import { Icon } from "@/components/Icon";
import { ITheme } from "@/configs/theme";
import { useTheme } from "styled-components";
import { Button, IconButton, Text } from "@/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as S from "./styles";
import { useProductContext } from "@/contexts/ProductContext";

interface IStepTwoViewProps {
  onReady: () => void;
}

export const StepTwoView = React.memo(({ onReady }: IStepTwoViewProps) => {
  const { top, bottom } = useSafeAreaInsets();
  const { setSelectedProduct } = useProductContext();
  const theme = useTheme() as ITheme;

  return (
    <S.StepContainer
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        justifyContent: "flex-end",
      }}
    >
      <S.StepSectionContainer>
        <Icon name={"shelf"} size={40} color={theme.colors.font.secondary} />

        <Text
          family={"semiBold"}
          size={"extraLarge"}
          color={"secondary"}
          style={{
            width: "80%",
            textAlign: "center",
            marginBottom: theme.spacing.margins.large,
          }}
        >
          Aponte a câmera para as prateleiras para localizarmos o produto
        </Text>

        <S.ButtonsContainer>
          <IconButton
            icon={"chevron-left"}
            color={"cancel"}
            onPress={() => setSelectedProduct(null)}
          />

          <Button text={"Pronto"} color={"confirm"} onPress={onReady} />
        </S.ButtonsContainer>
      </S.StepSectionContainer>
    </S.StepContainer>
  );
});
