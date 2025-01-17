import { Text } from "../Text";

import qrCodeSquare from "@/assets/images/qrcode.png";

import * as S from "./styles";

export const QrCodeView = () => {
  return (
    <S.Container>
      <S.TextContainer>
        <Text family={"regular"} size={"large"} color={"secondary"}>
          Olá
        </Text>
        <Text
          family={"semiBold"}
          size={"extraLarge"}
          color={"secondary"}
          style={{ textAlign: "center" }}
        >
          Vamos te ajudar a encontrar o produto desejado
        </Text>
      </S.TextContainer>

      <S.QRCodeSquare source={qrCodeSquare} contentFit="fill" />

      <S.TextContainer>
        <Text
          family={"semiBold"}
          size={"extraLarge"}
          color={"secondary"}
          style={{ textAlign: "center" }}
        >
          Leia o QRCode para liberar a pesquisa por produtos
        </Text>
      </S.TextContainer>
    </S.Container>
  );
};
