import React from "react";
import { FlatList } from "react-native";

import ScreenHeader from "@/components/ScreenHeader";
import { FromType } from "@/components/Icon";
import MenuItem from "./components/MenuItem";
import { StackNavigationProps, TabNavigationProps } from "@/hooks/useNav";

const Menu = () => {
  return (
    <>
      <ScreenHeader title="" />
      <FlatList
        data={MENU}
        renderItem={({ item, index }) => (
          <MenuItem item={item} isLast={index === MENU.length - 1} />
        )}
      />
    </>
  );
};

export default Menu;

const MENU: MenuItemProps[] = [
  {
    iconFrom: "AntDesign",
    iconName: "setting",
    title: "Settings",
    screenName: "Settings",
    navigationProps: {
      stackName: "MenuStack",
      params: { screen: "Settings", params: undefined }
    }
  },
  {
    iconFrom: "AntDesign",
    iconName: "login",
    title: "Login",
    screenName: "Login",
    navigationProps: { stackName: "AuthStack", params: { screen: "Login", params: undefined } }
  }
];
export type MenuItemProps = {
  iconFrom: FromType;
  iconName: string;
  title: string;
  screenName: string;
  navigationProps: TabNavigationProps | StackNavigationProps;
};
