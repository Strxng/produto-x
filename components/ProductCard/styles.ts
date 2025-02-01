import { ITheme } from "@/configs/theme";
import { Image } from "expo-image";

import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{ theme: ITheme }>`
  background-color: ${({ theme }) => theme.colors.backdrop};
  border-radius: ${({ theme }) => theme.radius.large}px;
  height: 200px;
  width: 165px;
  padding: 20px;
`;

export const ProdutoImage = styled(Image)`
  flex: 1;
`;

export const DataContainer = styled.View`
  margin-top: 10px;
`;
