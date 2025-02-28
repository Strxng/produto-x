import { Button, Text } from "@/components";
import { useUserPositionContext } from "@/contexts/UserPositionContext";
import { View } from "react-native";

export const TesteScreen = () => {
  const { startMonitoring, stopMonitoring, beacons, userPosition } =
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
      {beacons.map((b, index) => (
        <Text family={"semiBold"} size={"large"} color={"primary"}>
          {`Beacon ${index + 1}: Distancia: ${b.distance.toFixed(
            1
          )} - RSSI: ${b.rssi?.toFixed(1)}`}
        </Text>
      ))}

      <Text family={"semiBold"} size={"large"} color={"primary"}>
        {`Posição do usuário [${userPosition?.x.toFixed(1) ?? 0}, ${
          userPosition?.y.toFixed(1) ?? 0
        }]`}
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
