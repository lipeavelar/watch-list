import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: theme.COLORS.WHITE,
  },
  label: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.SM,
  },
  content: {
    flex: 1,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    fontSize: theme.FONT_SIZE.MD,
    marginRight: 8,
    marginLeft: 24,
    textAlign: "justify",
    flexShrink: 1,
  },
});
