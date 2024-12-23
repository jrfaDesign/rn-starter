import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from "@react-navigation/native-stack";

import MainTabNav from "./tabs/MainTabNav";
import SecondaryTabNav from "./tabs/SecondaryTabNav";

import AuthScreenStack from "./stacks/AuthScreenStack";

import { TABS_PARAMS } from "@/types/Navigation/Tabs";
import { STACK_PARAMS } from "@/types/Navigation/Stack";

import useSharedStyles from "@/hooks/useSharedStyles";

const Stack = createNativeStackNavigator<AllNavTypes>();

const RootStackNavigator = () => {
  const { appBackgorundColor } = useSharedStyles();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: appBackgorundColor } }}
    >
      <Stack.Screen name="MainTab" component={MainTabNav} />
      <Stack.Screen name="SecondaryTab" component={SecondaryTabNav} />

      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthStack" component={AuthScreenStack} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootStackNavigator;

export type AllNavTypes = TABS_PARAMS & STACK_PARAMS;

export const DEFAULT_SCREEN_OPTIONS: NativeStackNavigationOptions = {};
