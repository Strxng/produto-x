import { Image } from "expo-image";
import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";
import { Camera as ExpoCamera } from "expo-camera";

export const Camera = styled(ExpoCamera)<{ theme: ITheme }>`
  gap: ${({ theme }) => theme.spacing.gaps.large}px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const TextContainer = styled.View`
  align-items: center;
`;

export const QRCodeSquare = styled(Image)`
  height: 250px;
  width: 250px;
`;
