import React from "react";

import { NavigationContainer } from "@react-navigation/native";

import RootStackNavigator from "./app/navigation/index";
import Toast from "./app/components/Toast";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
