import React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

import ScreenHeader from "@/components/ScreenHeader";
import HeaderGoBackBtn from "@/components/HeaderGoBackBtn";

import { useNav } from "@/hooks/useNav";
import ThemeText from "@/components/ThemeText";
import useThemeColor from "@/hooks/useThemeColor";

const Dashboard = () => {
  const { useNavigateToTab } = useNav();
  const { backgroundContainer } = useThemeColor();

  function navToFeature() {
    useNavigateToTab("SecondaryTab", {
      stack: "FeatureStack",
      params: { screen: "FeatureList" }
    });
  }
  return (
    <>
      <ScreenHeader title="Dashboard" topLeftIcon={[<HeaderGoBackBtn />]} />

      <View style={styles.container}>
        <Pressable
          style={[styles.containerPressble, { backgroundColor: backgroundContainer }]}
          onPress={navToFeature}
        >
          {({ pressed }) => (
            <View style={[styles.featureContainer, { opacity: pressed ? 0.5 : 1 }]}>
              <ThemeText>Nav to Feature</ThemeText>
            </View>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  containerPressble: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
      },
      android: {
        elevation: 4
      }
    })
  },
  featureContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
