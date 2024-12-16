import { IProduto } from "@/interfaces/Produto";

import * as S from "./styles";
import { Text } from "../Text";

interface IProdutoCardProps {
  produto: IProduto;
  onPress: () => void;
}

export const ProdutoCard = ({ produto, onPress }: IProdutoCardProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.ProdutoImage source={{ uri: produto.imagem }} />

      <S.DataContainer>
        <Text
          family={"bold"}
          size={"medium"}
          color={"primary"}
          numberOfLines={1}
        >
          {produto.nome}
        </Text>

        <Text family={"regular"} size={"small"} color={"tertiary"}>
          {`€ ${produto.preco}`}
        </Text>
      </S.DataContainer>
    </S.Container>
  );
};
