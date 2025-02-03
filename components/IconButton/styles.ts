import styled from "styled-components/native";

import { ITheme } from "@/configs/theme";
import { ButtonColorKey } from ".";

export const Container = styled.TouchableOpacity<{
  theme: ITheme;
  color: ButtonColorKey;
}>`
  background-color: ${({ theme, color }) => theme.colors[color]};
  border-radius: ${({ theme }) => theme.radius.medium}px;
  height: ${({ theme }) => theme.sizes.button}px;
  width: ${({ theme }) => theme.sizes.button}px;
  justify-content: center;
  align-items: center;
`;
