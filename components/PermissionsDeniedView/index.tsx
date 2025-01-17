import { FullContainer } from "../styles";
import { Text } from "../Text";

export const PermissionsDeniedView = () => {
  return (
    <FullContainer>
      <Text family={"bold"} size={"small"} color={"primary"}>
        {"É necessário conceder as permissões\nrequisitadas pelo aplicativo."}
      </Text>
    </FullContainer>
  );
};
