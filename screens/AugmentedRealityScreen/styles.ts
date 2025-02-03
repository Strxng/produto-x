import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";
import { Image } from "expo-image";

export const ButtonsContainer = styled.View<{ theme: ITheme }>`
  margin-bottom: ${({ theme }) => theme.spacing.margins.large}px;
  gap: ${({ theme }) => theme.spacing.gaps.large}px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0px;
`;

export const Screenshot = styled(Image)<{ theme: ITheme }>`
  position: absolute;
  width: 100%;
  height: 100%;
`;
