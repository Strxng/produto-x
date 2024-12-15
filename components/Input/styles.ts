import { ITheme } from "@/configs/theme";
import styled from "styled-components/native";

export const Container = styled.View<{ theme: ITheme }>`
  background-color: ${({ theme }) => theme.colors.backdrop};
  border-radius: ${({ theme }) => theme.radius.small}px;
  height: ${({ theme }) => theme.sizes.input}px;
  align-items: center;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.TextInput<{ theme: ITheme }>`
  width: 100%;
  height: 100%;
`;
