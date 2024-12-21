import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import HeaderGoBackBtn from "@/components/HeaderGoBackBtn";

const Settings = () => {
  return (
    <>
      <ScreenHeader title="Settings" topLeftIcon={[<HeaderGoBackBtn />]} />
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({});
