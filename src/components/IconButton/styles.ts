import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: theme.COLORS.BLUE,
    borderColor: theme.COLORS.BLUE_DARK,
    borderRadius: 5,
    color: theme.COLORS.WHITE,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    fontSize: theme.FONT_SIZE.MD,
  },
});
