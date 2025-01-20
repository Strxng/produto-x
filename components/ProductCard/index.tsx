import { IProduct } from "@/interfaces/Product";

import * as S from "./styles";
import { Text } from "../Text";

interface IProductCardProps {
  product: IProduct;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: IProductCardProps) => {
  return (
    <S.Container onPress={onPress}>
      <S.ProdutoImage source={{ uri: product.imagem }} />

      <S.DataContainer>
        <Text
          family={"bold"}
          size={"medium"}
          color={"primary"}
          numberOfLines={1}
        >
          {product.nome}
        </Text>

        <Text family={"regular"} size={"small"} color={"tertiary"}>
          {`€ ${product.preco}`}
        </Text>
      </S.DataContainer>
    </S.Container>
  );
};
