import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";
import { Image } from "expo-image";

export const Screenshot = styled(Image)<{ theme: ITheme }>`
  position: absolute;
  width: 100%;
  height: 100%;
`;

// Step styles

export const StepContainer = styled.View`
  position: absolute;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const StepSectionContainer = styled.View<{ theme: ITheme }>`
  align-items: center;
  width: 100%;
  gap: 10px;
`;

export const DistanceIndicator = styled.View`
  background-color: ${({ theme }) => theme.colors.backdrop};
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 20px;
`;

export const ButtonsContainer = styled.View<{ theme: ITheme }>`
  gap: ${({ theme }) => theme.spacing.gaps.large}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
