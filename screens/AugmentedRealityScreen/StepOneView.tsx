import React, { useMemo } from "react";
import { Icon } from "@/components/Icon";
import { ITheme } from "@/configs/theme";
import { Button, Text } from "@/components";
import { useTheme } from "styled-components";
import { useProductContext } from "@/contexts/ProductContext";
import { calculateDistance3D } from "@/utils/calculateDistance3D";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserPositionContext } from "@/contexts/UserPositionContext";

import * as S from "./styles";

export const StepOneView = React.memo(() => {
  const { top, bottom } = useSafeAreaInsets();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const { userPosition } = useUserPositionContext();
  const theme = useTheme() as ITheme;

  const distance = useMemo(() => {
    return calculateDistance3D(userPosition, {
      x: selectedProduct?.coordX ?? 0,
      y: selectedProduct?.coordY ?? 0,
      z: selectedProduct?.coordZ ?? 0,
    });
  }, [userPosition]);

  return (
    <S.StepContainer style={{ paddingTop: top, paddingBottom: bottom }}>
      <S.StepSectionContainer>
        <Text family={"regular"} size={"large"} color={"secondary"}>
          Produto selecionado:
        </Text>

        <Text family={"semiBold"} size={"extraLarge"} color={"secondary"}>
          {selectedProduct?.nome ?? ""}
        </Text>

        <S.DistanceIndicator>
          <Text family={"bold"} size={"medium"} color={"primary"}>
            {`${distance.toFixed(1)} Metros`}
          </Text>
        </S.DistanceIndicator>
      </S.StepSectionContainer>

      <S.StepSectionContainer>
        <Icon name={"rotation"} size={40} color={theme.colors.font.secondary} />

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
          Olhe ao redor e procure pelo indicador do produto
        </Text>

        <S.ButtonsContainer>
          <Button
            text={"Cancelar Busca"}
            color={"cancel"}
            onPress={() => setSelectedProduct(null)}
          />
        </S.ButtonsContainer>
      </S.StepSectionContainer>
    </S.StepContainer>
  );
});
