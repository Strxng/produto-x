import { Icon } from "@/components/Icon";
import { ITheme } from "@/configs/theme";
import { Button, Text } from "@/components";
import { useTheme } from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProdutoContext } from "@/contexts/ProdutoContext";

import * as S from "./styles";

export const StepOne = () => {
  const { selectedProduto, setSelectedProduto } = useProdutoContext();

  const theme = useTheme() as ITheme;

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <S.Container>
        <S.TopContainer>
          <Text family={"regular"} size={"large"} color={"secondary"}>
            Produto selecionado:
          </Text>
          <Text family={"semiBold"} size={"extraLarge"} color={"secondary"}>
            {selectedProduto?.nome ?? ""}
          </Text>
        </S.TopContainer>

        <S.BottomContainer>
          <Icon
            name={"rotation"}
            size={theme.sizes.icon}
            color={theme.colors.font.secondary}
          />

          <Text
            family={"semiBold"}
            size={"extraLarge"}
            color={"secondary"}
            style={{ textAlign: "center" }}
          >
            Olhe ao redor e procure pelo indicador do produto
          </Text>

          <Button
            text="Cancelar Busca"
            color={"cancel"}
            onPress={() => {
              setSelectedProduto(null);
            }}
          />
        </S.BottomContainer>
      </S.Container>
    </SafeAreaView>
  );
};
