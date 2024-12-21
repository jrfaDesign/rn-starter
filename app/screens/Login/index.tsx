import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import HeaderGoBackBtn from "@/components/HeaderGoBackBtn";

const Login = () => {
  return (
    <>
      <ScreenHeader title="Login" topLeftIcon={[<HeaderGoBackBtn />]} />
      <Text>Login</Text>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
