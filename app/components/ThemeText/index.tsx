import React, { ReactNode } from "react";
import { Text, TextStyle, StyleSheet, GestureResponderEvent } from "react-native";

import useThemeColor from "@/hooks/useThemeColor";

type ThemeTextProps = {
  style?: TextStyle | TextStyle[];
  color?: string;
  size?: number;
  children?: string | ReactNode;
  bold?: boolean;
  fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  monospace?: boolean;
  numberOfLines?: number;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ThemeText = ({
  style,
  color,
  size,
  children,
  fontWeight,
  monospace,
  numberOfLines,
  onPress
}: ThemeTextProps) => {
  const { text } = useThemeColor();

  const styles = StyleSheet.create({
    text: {
      color: color ? color : text,
      fontSize: size ? size : 16,
      fontWeight: fontWeight
    }
  });

  return (
    <Text
      onPress={onPress}
      numberOfLines={monospace ? 1 : numberOfLines || 0}
      style={[styles.text, style]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;
