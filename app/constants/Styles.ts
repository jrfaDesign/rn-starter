import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shadowTop: {
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  containerMarginBottom: {
    marginBottom: 16,
  },

  screenPadding: {
    paddingHorizontal: 16,
  },
});
