import { Image } from "expo-image";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.paddings.large}px;
  gap: 60px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const TextContainer = styled.View`
  align-items: center;
`;

export const QRCodeSquare = styled(Image)`
  height: 250px;
  width: 250px;
`;
