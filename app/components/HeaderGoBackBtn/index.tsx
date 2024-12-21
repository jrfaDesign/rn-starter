import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IconBtn from "../IconBtn";
import { useNav } from "@/hooks/useNav";
import useThemeColor from "@/hooks/useThemeColor";

const HeaderGoBackBtn = () => {
  const { goBack } = useNav();

  return <IconBtn from="MaterialIcons" name="arrow-back-ios-new" onPress={goBack} />;
};

export default HeaderGoBackBtn;

const styles = StyleSheet.create({});
