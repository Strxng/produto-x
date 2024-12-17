import { Button, Text } from "@/components";
import { useUserPositionContext } from "@/contexts/UserPositionContext";
import { View } from "react-native";

export const TesteScreen = () => {
  const { startMonitoring, stopMonitoring, userPosition } =
    useUserPositionContext();

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <Text family={"semiBold"} size={"large"} color={"primary"}>
        {`Posição X: ${userPosition?.x.toFixed(2) ?? "Inicie o monitoramento"}`}
      </Text>
      <Text family={"semiBold"} size={"large"} color={"primary"}>
        {`Posição Y: ${userPosition?.y.toFixed(2) ?? "Inicie o monitoramento"}`}
      </Text>

      <Button
        text={"Iniciar monitoramento"}
        color={"confirm"}
        onPress={startMonitoring}
      />

      <Button
        text={"Parar monitoramento"}
        color={"cancel"}
        onPress={stopMonitoring}
      />
    </View>
  );
};
