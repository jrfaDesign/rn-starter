import { StyleSheet } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackType } from "@/types/Navigation/Stack";

import Login from "@/screens/Login";
import SignUp from "@/screens/SignUp";
import ForgotPassword from "@/screens/ForgotPassword";
import useSharedStyles from "@/hooks/useSharedStyles";

const Stack = createNativeStackNavigator<StackType<"AuthStack">>();

const AuthScreenStack = () => {
  const { DEFAULT_SCREEN_OPTIONS } = useSharedStyles();

  return (
    <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthScreenStack;

const styles = StyleSheet.create({});
