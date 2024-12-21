import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../../screens/Dashboard";
import Home from "../../screens/Home";

import { StackType } from "@/types/Navigation/Stack";
import useSharedStyles from "@/hooks/useSharedStyles";

const Stack = createNativeStackNavigator<StackType<"HomeStack">>();

const HomeScreenStack = () => {
  const { DEFAULT_SCREEN_OPTIONS } = useSharedStyles();

  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DashBoard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default HomeScreenStack;

const styles = StyleSheet.create({});
