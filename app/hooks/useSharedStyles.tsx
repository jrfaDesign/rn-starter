import { Platform, useColorScheme } from "react-native";

import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import useThemeColor from "./useThemeColor";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

const useSharedStyles = () => {
  const theme = useColorScheme();
  const { background, backgroundContainer } = useThemeColor();

  const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {
    headerShown: false,
    contentStyle: {
      backgroundColor: theme === "light" ? backgroundContainer : background
    }
  };

  const DEFAULT_TAB_OPTIONS: BottomTabNavigationOptions = {
    headerShown: false,
    animation: Platform.OS === "ios" ? "shift" : "none",
    tabBarStyle: {
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
      backgroundColor: theme === "light" ? backgroundContainer : background
    }
  };
  const appBackgorundColor = theme === "light" ? backgroundContainer : background;

  return { DEFAULT_SCREEN_OPTIONS, DEFAULT_TAB_OPTIONS, appBackgorundColor };
};

export default useSharedStyles;
