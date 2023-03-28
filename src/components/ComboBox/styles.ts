import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_400,
    borderRadius: 5,
    borderColor: theme.COLORS.GRAY_500,
    borderWidth: 1,
    color: theme.COLORS.WHITE,
  },
  modal: {
    backgroundColor: theme.COLORS.GRAY_400,
    color: theme.COLORS.WHITE,
  },
});
