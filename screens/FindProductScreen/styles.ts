import { ITheme } from "@/configs/theme";
import { CameraView } from "expo-camera";

import styled from "styled-components/native";

export const FullContainer = styled.View`
  flex: 1;
`;

export const Camera = styled(CameraView)<{ theme: ITheme }>`
  padding: ${({ theme }) => theme.spacing.paddings.large}px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Container = styled.View<{ theme: ITheme }>`
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const TopContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const BottomContainer = styled.View<{ theme: ITheme }>`
  gap: ${({ theme }) => theme.spacing.gaps.large}px;
  align-items: center;
  width: 100%;
`;
