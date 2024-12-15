import { ThemeProvider, useTheme } from "styled-components";
export { ErrorBoundary } from "expo-router";
import { ITheme, theme } from "@/configs/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

import "react-native-reanimated";
import * as SplashScreen from "expo-splash-screen";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    regular: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    medium: require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    semiBold: require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    bold: require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const theme = useTheme() as ITheme;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
