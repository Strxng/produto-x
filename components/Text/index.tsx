import { StyleProp, TextStyle } from "react-native";
import { ITheme } from "@/configs/theme";

import * as S from "./styles";

export interface ITextProps {
  family: keyof ITheme["fontFamilies"];
  size: keyof ITheme["sizes"]["font"];
  color: keyof ITheme["colors"]["font"];
  children: string | string[];
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
}

export const Text = ({
  family,
  size,
  color,
  style,
  children,
  numberOfLines,
}: ITextProps): JSX.Element => {
  return (
    <S.Text
      family={family}
      color={color}
      size={size}
      numberOfLines={numberOfLines}
      style={style}
    >
      {children}
    </S.Text>
  );
};
