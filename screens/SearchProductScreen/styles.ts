import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";

export const Grid = styled.View<{ theme: ITheme }>`
  gap: ${({ theme }) => theme.spacing.gaps.large}px;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
