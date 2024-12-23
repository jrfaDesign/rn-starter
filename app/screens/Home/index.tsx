import { StyleSheet, Text, View } from "react-native";
import React from "react";

import ScreenHeader from "@/components/ScreenHeader";
import ThemeText from "@/components/ThemeText";
import Button from "@/components/Button";
import { useNav } from "@/hooks/useNav";
import { useToastStore } from "@/stores/useToaster";

const Home = () => {
  const { useNavigationToStack } = useNav();
  const { showToast } = useToastStore();

  function navToDashboard() {
    useNavigationToStack("HomeStack", { screen: "DashBoard", params: undefined });
  }

  return (
    <>
      <ScreenHeader />
      <View style={styles.container}>
        <ThemeText size={20} fontWeight="600">
          Home Screen
        </ThemeText>

        <Button
          buttonWidthPercentage={50}
          onPress={navToDashboard}
          text="Dashboard"
          icon={{
            from: "MaterialCommunityIcons",
            name: "view-dashboard",
            color: "white"
          }}
        />
        <Button
          buttonWidthPercentage={50}
          onPress={() =>
            showToast({
              title: "Happy Codings!",
              message: "This is a Toast message!",
              type: "success"
            })
          }
          text="Toast"
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20
  }
});
