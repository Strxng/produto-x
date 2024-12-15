import { TextInput } from "react-native";
import { Icon, IconTypes } from "../Icon";

import * as S from "./styles";
import { useTheme } from "styled-components";
import { ITheme } from "@/configs/theme";

export interface IInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: IconTypes;
}

export const Input = (props: IInputProps): JSX.Element => {
  const theme = useTheme() as ITheme;

  return (
    <S.Container>
      {props.icon && (
        <Icon name={"search"} size={20} color={theme.colors.placeholder} />
      )}

      <S.Input
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={props.onChangeText}
      />
    </S.Container>
  );
};
