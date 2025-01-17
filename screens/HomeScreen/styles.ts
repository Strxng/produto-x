import { ITheme } from "@/configs/theme";
import { CameraView } from "expo-camera";
import styled from "styled-components/native";

export const Camera = styled(CameraView)<{ theme: ITheme }>`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
`;
