import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_600,
    flex: 1,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.SM,
  },
  dataContainer: {
    flexDirection: "row",
    maxHeight: 65,
    marginTop: 8,
    marginHorizontal: 8,
  },
  buttonContainer: {
    flex: 1,
    minHeight: "100%",
    marginHorizontal: 8,
  },
  languagesContainer: {
    marginTop: 8,
    marginHorizontal: 8,
  },
});
