import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import { ScreenProps } from "@/types/Navigation/Screens";
import HeaderGoBackBtn from "@/components/HeaderGoBackBtn";

const FeatureItem = ({ route, navigation }: ScreenProps<"FeatureItem">) => {
  const { id } = route.params;

  return (
    <>
      <ScreenHeader title={`Item ${id}`} topLeftIcon={[<HeaderGoBackBtn />]} />
    </>
  );
};

export default FeatureItem;

const styles = StyleSheet.create({});
