import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_600,
    flex: 1,
  },
  genreRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  details: {
    flex: 1,
    paddingHorizontal: 8,
  },
  text: {
    color: theme.COLORS.WHITE,
  },
  cover: {
    flex: 1,
    maxHeight: 300,
    minHeight: 300,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.XL,
    textAlign: "center",
    marginLeft: "auto",
    marginVertical: 4,
    flexWrap: "wrap",
    maxWidth: "90%",
  },
});

export const providersContainerStyles = StyleSheet.create({
  providersContainer: {
    margin: 8,
    borderColor: theme.COLORS.GRAY_300,
    borderWidth: 1,
    padding: 8,
  },
  providersTitle: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.LG,
  },
  notFoundText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.MD,
    textAlign: "center",
  },
});

export const providerStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
  },
  providerType: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: theme.FONT_SIZE.SM,
  },
  logosContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  logo: {
    width: 40,
    height: 40,
    marginVertical: 4,
    marginHorizontal: 2,
    borderRadius: 5,
  },
});
