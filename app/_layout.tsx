import { UserPositionProvider } from "@/contexts/UserPositionContext";
import { ThemeProvider, useTheme } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { ProductProvider } from "@/contexts/ProductContext";
import { ITheme, theme } from "@/configs/theme";
import { queryClient } from "@/configs/query";
export { ErrorBoundary } from "expo-router";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import "react-native-reanimated";
import { FullLoadingProvider } from "@/contexts/FullLoadingContext";
import { FullLoading } from "@/components/FullLoading";

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
    <FullLoadingProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <UserPositionProvider>
            <ProductProvider>
              <FullLoading />
              <RootLayoutNav />
            </ProductProvider>
          </UserPositionProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </FullLoadingProvider>
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
      <Stack.Screen name="augmentedReality" options={{ headerShown: false }} />
    </Stack>
  );
}
