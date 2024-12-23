import { SafeAreaView, StyleSheet, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import ThemeText from "../ThemeText";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  title?: string;
  topLeftIcon?: ReactNode[];
  topRightIcon?: ReactNode[];
  centerComponent?: ReactNode;
  containerStyles?: ViewStyle | ViewStyle[];

  topLeftIconsFlex?: number;
  topRightIconsFlex?: number;
};

const ScreenHeader = ({
  title,
  topLeftIcon,
  topRightIcon,
  centerComponent,
  containerStyles,
  topLeftIconsFlex = 1,
  topRightIconsFlex = 1
}: Props) => {
  const minHeight = !title && !topLeftIcon && !topRightIcon && !centerComponent ? 0 : 110;
  const marginBottom = !title && !topLeftIcon && !topRightIcon && !centerComponent ? 20 : 14;

  return (
    <SafeAreaView
      testID="safearea-container"
      style={[{ minHeight, marginBottom }, styles.container, containerStyles]}
    >
      <View
        testID="topLeft-container"
        style={[styles.topLeftIcons, { justifyContent: "flex-start", flex: topLeftIconsFlex }]}
      >
        {topLeftIcon?.map((icon, idx) => (
          <View style={{}} key={idx}>
            {icon}
          </View>
        ))}
      </View>

      {title && (
        <View testID="text-container" style={styles.title}>
          <ThemeText monospace style={{ textAlign: "center" }} fontWeight={"700"} size={18}>
            {title}
          </ThemeText>
        </View>
      )}

      {!title && centerComponent && <View style={[styles.title]}>{centerComponent}</View>}

      <View
        testID="topRight-container"
        style={[styles.topLeftIcons, { justifyContent: "flex-end", flex: topRightIconsFlex }]}
      >
        {topRightIcon?.map((icon, idx) => (
          <View key={idx}>{icon}</View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  topLeftIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  container: {
    flexDirection: "row",
    alignItems: "center"
  },

  title: {
    flex: 2.5,
    justifyContent: "center",
    flexDirection: "row"
  }
});
