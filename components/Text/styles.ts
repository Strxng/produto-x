import styled from "styled-components/native";
import { ITheme } from "@/configs/theme";

export const Text = styled.Text<{
  family: keyof ITheme["fontFamilies"];
  size: keyof ITheme["sizes"]["font"];
  color: keyof ITheme["colors"]["font"];
  theme: ITheme;
}>`
  font-family: ${({ theme, family }) => theme.fontFamilies[family]};
  font-size: ${({ theme, size }) => theme.sizes.font[size]}px;
  color: ${({ theme, color }) => theme.colors.font[color]};
  flex-wrap: wrap;
`;
