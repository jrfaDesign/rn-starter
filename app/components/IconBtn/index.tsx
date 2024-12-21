import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

import * as Icons from "@expo/vector-icons";
import Icon from "../Icon";

type IconProps = {
  from: keyof typeof Icons;
  name: string;
  color?: string;
  size?: number;
  iconSize?: number;
  iconBackgroundStyles?: ViewStyle;
  disabled?: boolean;
  onPress?: () => void;
};

const IconBtn = ({
  from,
  name,
  size = 24,
  color,
  iconBackgroundStyles,
  disabled,
  onPress
}: IconProps) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      {({ pressed }) => (
        <View style={[styles.container, iconBackgroundStyles, { opacity: pressed ? 0.5 : 1 }]}>
          <Icon size={size} from={from} name={name} color={color} />
        </View>
      )}
    </Pressable>
  );
};

export default IconBtn;

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
