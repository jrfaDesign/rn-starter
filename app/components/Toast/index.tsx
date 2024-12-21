import React, { useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS
} from "react-native-reanimated";

import ThemeText from "../ThemeText";
import Icon from "../Icon";

import useThemeColor from "@/hooks/useThemeColor";
import { globalStyles } from "@/constants/Styles";
import { useToastStore } from "@/stores/useToaster";

const Toast = () => {
  const { message, title, type, duration, hideToast } = useToastStore();
  const { backgroundContainer, success, error, warning, primary } = useThemeColor();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(60);
  const isVisible = useRef(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleHideToast = () => {
    if (isVisible.current) {
      hideToast();
      isVisible.current = false;
    }
  };

  function closeToast(time: number) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      opacity.value = withTiming(
        0,
        {
          duration: 300,
          easing: Easing.inOut(Easing.ease)
        },
        () => {
          runOnJS(handleHideToast)();
        }
      );

      translateY.value = withSpring(50, { damping: 10, stiffness: 100 });
    }, time);
  }

  useEffect(() => {
    if (message && !isVisible.current) {
      isVisible.current = true;
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease)
      });

      translateY.value = withSpring(0, { damping: 10, stiffness: 100 });

      closeToast(duration);
    } else if (message && isVisible.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      opacity.value = withTiming(0, { duration: 150 }, () => {
        isVisible.current = true;
        opacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease)
        });
        translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
        closeToast(duration);
      });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [message, duration, opacity, translateY, hideToast]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }]
    };
  });

  const typeToData: any = useMemo(
    () => ({
      info: {
        backgroundColor: primary,
        icon: { from: "Octicons", name: "info" }
      },
      success: {
        backgroundColor: success,
        icon: { from: "AntDesign", name: "checkcircleo" }
      },
      error: {
        backgroundColor: error,
        icon: { from: "Feather", name: "x-circle" }
      },
      warning: {
        backgroundColor: warning,
        icon: { from: "MaterialIcons", name: "error-outline" }
      }
    }),
    []
  );

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Pressable
        style={[{ backgroundColor: backgroundContainer }, styles.pressableContainer]}
        onPress={() => closeToast(0)}
      >
        <View style={[styles.toastContainer, { backgroundColor: backgroundContainer }]}>
          <View
            style={[styles.iconContainer, { backgroundColor: typeToData[type].backgroundColor }]}
          >
            <Icon
              size={22}
              from={typeToData[type].icon.from}
              name={typeToData[type].icon.name}
              color={"white"}
            />
          </View>
          <View style={styles.textContainer}>
            {title && (
              <ThemeText size={17} fontWeight="600">
                {title}
              </ThemeText>
            )}
            {message && (
              <ThemeText size={14} fontWeight="300">
                {message}
              </ThemeText>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000
  },

  pressableContainer: {
    borderRadius: 10,
    ...globalStyles.shadow
  },

  toastContainer: {
    width: "80%",
    overflow: "hidden",
    gap: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center"
  },

  iconContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6
  },

  textContainer: {
    gap: 4,
    flex: 8,
    paddingVertical: 10,
    paddingRight: 8
  }
});

export default Toast;
