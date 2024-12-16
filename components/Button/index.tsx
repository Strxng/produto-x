import { ITheme } from "@/configs/theme";
import { Text } from "../Text";
import * as S from "./styles";

export type ButtonColorKey = "cancel" | "confirm";

interface IButtonProps {
  text: string;
  color: ButtonColorKey;
  onPress: () => void;
}

export const Button = ({ color, onPress, text }: IButtonProps) => {
  return (
    <S.Container color={color} onPress={onPress}>
      <Text family={"bold"} size={"medium"} color={"secondary"}>
        {text}
      </Text>
    </S.Container>
  );
};
