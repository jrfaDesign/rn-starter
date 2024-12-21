import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackType } from "@/types/Navigation/Stack";
import Settings from "@/screens/Settings";
import Menu from "@/screens/Menu";
import useSharedStyles from "@/hooks/useSharedStyles";

const Stack = createNativeStackNavigator<StackType<"MenuStack">>();

const MenuScreenStack = () => {
  const { DEFAULT_SCREEN_OPTIONS } = useSharedStyles();

  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MenuScreenStack;

const styles = StyleSheet.create({});
