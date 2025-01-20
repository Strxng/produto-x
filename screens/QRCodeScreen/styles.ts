import { Image } from "expo-image";
import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";
import { Camera as ExpoCamera } from "expo-camera";

export const Camera = styled(ExpoCamera)<{ theme: ITheme }>`
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 40px;
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
