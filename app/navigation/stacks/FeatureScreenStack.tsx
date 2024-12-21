import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StackType } from "@/types/Navigation/Stack";

import FeatureList from "@/screens/FeatureList";
import FeatureItem from "@/screens/FeatureItem";
import useSharedStyles from "@/hooks/useSharedStyles";

const Stack = createNativeStackNavigator<StackType<"FeatureStack">>();

const FeatureScreenStack = () => {
  const { DEFAULT_SCREEN_OPTIONS } = useSharedStyles();

  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Stack.Screen name="FeatureList" component={FeatureList} />
      <Stack.Screen name="FeatureItem" component={FeatureItem} />
    </Stack.Navigator>
  );
};

export default FeatureScreenStack;

const styles = StyleSheet.create({});
