import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

const useThemeColor = () => {
  const theme = useColorScheme() || "light";
  return Colors[theme];
};

export default useThemeColor;
