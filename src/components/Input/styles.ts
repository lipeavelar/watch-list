import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 48,
    maxHeight: 48,
    backgroundColor: theme.COLORS.GRAY_400,
    padding: 8,
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    fontSize: theme.FONT_SIZE.MD,
    borderRadius: 5,
    borderColor: theme.COLORS.GRAY_500,
    borderWidth: 1,
  },
});
