import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenHeader from "@/components/ScreenHeader";
import ListItem from "./components";
import HeaderGoBackBtn from "@/components/HeaderGoBackBtn";

const FeatureList = () => {
  const data = createArrayOfItems(100);

  return (
    <>
      <ScreenHeader topLeftIcon={[<HeaderGoBackBtn />]} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => <ListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default FeatureList;

const styles = StyleSheet.create({});

function createArrayOfItems(length: number) {
  return Array.from({ length }, (_, index) => ({
    id: index + 1,
    label: `Item ${index + 1}`
  }));
}
