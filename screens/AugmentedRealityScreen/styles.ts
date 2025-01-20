import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";

export const ButtonsContainer = styled.View<{ theme: ITheme }>`
  margin-bottom: ${({ theme }) => theme.spacing.margins.large}px;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0px;
`;
