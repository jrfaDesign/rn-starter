import {
  ImageStyle,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
  Image,
  ActivityIndicator
} from "react-native";

import React, { useMemo } from "react";
import Icon, { FromType } from "../Icon";
import ThemeText from "../ThemeText";
import Colors from "@/constants/Colors";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  onPress: () => void;
  buttonWidthPercentage?: number;
  text?: string;
  icon?: {
    from: FromType;
    name: string;
    size?: number;
    color?: string;
  };
  disabled?: boolean;
  buttonContainerStyles?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  variant?: "outline" | "light";
  image?: any;
  imgStyles?: ImageStyle | ImageStyle[];
  loading?: boolean;
};
const Button = ({
  onPress,
  buttonWidthPercentage = 100,
  text,
  icon,
  disabled,
  buttonContainerStyles,
  textStyle,
  variant,
  image,
  imgStyles,
  loading
}: Props) => {
  const theme = useColorScheme();
  const { primary, superLightPrimary, backgroundContainer, grey } = useThemeColor();

  const backgroundColor = useMemo(
    () =>
      disabled
        ? grey
        : !variant
        ? primary
        : variant === "light"
        ? superLightPrimary
        : backgroundContainer,
    [variant, theme, disabled]
  );

  const textColor = useMemo(
    () =>
      !variant
        ? Colors.dark.text
        : variant === "light"
        ? theme === "light"
          ? primary
          : Colors.dark.text
        : "",
    [variant, theme]
  );

  const borderColor = useMemo(
    () =>
      disabled || loading
        ? grey
        : !variant
        ? primary
        : variant === "light"
        ? superLightPrimary
        : grey,
    [variant, theme, disabled]
  );

  return (
    <View
      testID="button-wrapper"
      style={[styles.buttonContainer, { width: `${buttonWidthPercentage}%` }]}
    >
      <Pressable testID="button-pressable" disabled={disabled || loading} onPress={onPress}>
        {({ pressed }) => (
          <View
            testID="button-container"
            style={[
              {
                opacity: pressed ? 0.5 : 1,
                backgroundColor,
                borderColor
              },
              styles.container,
              buttonContainerStyles
            ]}
          >
            {!loading && !image && icon && <Icon {...icon} size={icon.size ?? 20} />}
            {!loading && !icon && image && (
              <Image testID="button-img" source={image} style={[styles.image, imgStyles]} />
            )}
            {loading && (
              <ActivityIndicator
                testID="button-loading"
                animating={true}
                size={20}
                color={primary}
              />
            )}
            {!loading && text && (
              <ThemeText color={textColor} fontWeight="600" size={18} style={textStyle}>
                {text}
              </ThemeText>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%"
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 40,
    gap: 10,
    borderWidth: 1
  },

  image: {
    width: 22,
    height: 22,
    resizeMode: "contain"
  }
});
