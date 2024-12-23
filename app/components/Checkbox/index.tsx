import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../Icon";
import useThemeColor from "@/hooks/useThemeColor";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

type Props = {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};
const Checkbox = ({ checked, setChecked }: Props) => {
  const { primary, backgroundContainer, grey } = useThemeColor();

  const iconScale = useSharedValue(0);
  const backgroundColor = useSharedValue(0);

  React.useEffect(() => {
    iconScale.value = withTiming(checked ? 1 : 0, {
      duration: 200,
      easing: Easing.ease
    });

    backgroundColor.value = withTiming(checked ? 1 : 0, {
      duration: 200,
      easing: Easing.ease
    });
  }, [checked]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }]
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColorInterpolated = backgroundColor.value === 1 ? primary : backgroundContainer;
    return {
      backgroundColor: backgroundColorInterpolated
    };
  });

  return (
    <Pressable onPress={() => setChecked(!checked)}>
      {({ pressed }) => (
        <Animated.View
          testID="checkbox-container"
          style={[
            styles.container,
            animatedContainerStyle,
            {
              opacity: pressed ? 0.5 : 1,
              borderColor: grey
            }
          ]}
        >
          <Animated.View style={[animatedIconStyle, { borderWidth: 1, borderColor: primary }]}>
            <Icon from="Feather" name="x" color={"white"} />
          </Animated.View>
        </Animated.View>
      )}
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderWidth: 1
  }
});
