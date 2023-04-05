import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.COLORS.GRAY_400,
    width: 120,
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 8,
    borderRadius: 5,
    borderColor: theme.COLORS.GRAY_500,
    borderWidth: 1,
  },
  image: {
    width: 75,
    height: 113,
  },
  title: {
    flex: 1,
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
    fontSize: theme.FONT_SIZE.SM,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  button: {
    width: 10,
    height: 10,
  },
});
