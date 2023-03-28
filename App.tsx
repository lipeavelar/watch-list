import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import Constants from "expo-constants";
import { StatusBar, StyleSheet, View } from "react-native";

import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import theme from "./src/theme";
import { LocalizationProvider } from "./src/utils/LocalizationProvider";

export default function App() {
  const [fontsLoadded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <LocalizationProvider>
      <View style={styles.default}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.COLORS.GRAY_600}
          translucent
        />
        {fontsLoadded ? <Routes /> : <Loading />}
      </View>
    </LocalizationProvider>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
