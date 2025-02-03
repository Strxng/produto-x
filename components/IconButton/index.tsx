import { useTheme } from "styled-components";
import * as S from "./styles";

import Entypo from "@expo/vector-icons/Entypo";
import { ITheme } from "@/configs/theme";

export type ButtonColorKey = "cancel" | "confirm";

interface IButtonProps {
  icon: (typeof Entypo)["name"];
  color: ButtonColorKey;
  onPress: () => void;
}

export const IconButton = ({ color, onPress, icon }: IButtonProps) => {
  const theme = useTheme() as ITheme;

  return (
    <S.Container color={color} onPress={onPress}>
      <Entypo
        name={icon as any}
        size={30}
        color={theme.colors.font.secondary}
      />
    </S.Container>
  );
};
