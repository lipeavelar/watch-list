import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import Constants from "expo-constants";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

import { Loading } from "./src/components/Loading";
import { LocalizationProvider } from "./src/context/LocalizationProvider";
import { PreferencesProvider } from "./src/context/PreferencesProvider";
import { UserInfoProvider } from "./src/context/UserInfoProvider";
import { Routes } from "./src/routes";
import theme from "./src/theme";

export default function App() {
  const [fontsLoadded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <LocalizationProvider>
      <PreferencesProvider>
        <UserInfoProvider>
          <View style={styles.default}>
            <StatusBar
              barStyle="light-content"
              backgroundColor={theme.COLORS.GRAY_600}
              translucent
            />
            {fontsLoadded ? <Routes /> : <Loading />}
          </View>
        </UserInfoProvider>
      </PreferencesProvider>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: theme.COLORS.GRAY_600,
  },
});
