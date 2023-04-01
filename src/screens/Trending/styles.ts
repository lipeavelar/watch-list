import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_600,
    flex: 1,
  },
  comboBoxContainer: {
    marginTop: 4,
    marginBottom: 16,
    marginHorizontal: 12,
    minHeight: 48,
    maxHeight: 48,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 4,
    marginHorizontal: 12,
    minHeight: 48,
    maxHeight: 48,
  },
  searchInputContainer: {
    width: "85%",
    marginRight: 4,
  },
});
