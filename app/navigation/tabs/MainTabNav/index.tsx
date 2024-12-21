import React, { useMemo } from "react";

import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import { TabType } from "@/types/Navigation/Tabs";

import HomeScreenStack from "@/navigation/stacks/HomeScreenStack";
import MenuScreenStack from "@/navigation/stacks/MenuScreenStack";

import { NavigationProp, ParamListBase } from "@react-navigation/native";
import TabButtonNav from "@/components/TabButtonNav";
import ThemeText from "@/components/ThemeText";
import useSharedStyles from "@/hooks/useSharedStyles";
import useThemeColor from "@/hooks/useThemeColor";

const Tab = createBottomTabNavigator<TabType<"MainTab">>();
const MainTabNav = () => {
  const { primary, textLight } = useThemeColor();
  const { DEFAULT_TAB_OPTIONS } = useSharedStyles();

  const memoTabs = useMemo(() => [HomeStackScreen, MenuStackScreen], []);

  return (
    <Tab.Navigator screenOptions={DEFAULT_TAB_OPTIONS}>
      {memoTabs.map((tab) => {
        const tabOptions = typeof tab.options === "function" ? tab.options() : tab.options;

        return (
          <Tab.Screen
            key={tab.name as keyof TabType<"MainTab">}
            name={tab.name}
            component={tab.component}
            options={{
              lazy: true,
              headerShown: false,
              tabBarLabelPosition: "below-icon",
              ...tabOptions,
              tabBarLabel: ({ focused }: { focused: boolean }) => (
                <ThemeText
                  color={focused ? primary : textLight}
                  style={{ marginHorizontal: 2 }}
                  size={13}
                  fontWeight={focused ? "600" : "400"}
                  monospace
                >
                  {(tabOptions as any).tabBarLabel}
                </ThemeText>
              )
            }}
            listeners={tab.listeners ?? {}}
          />
        );
      })}
    </Tab.Navigator>
  );
};

type TabScreenTypeProps = {
  name: keyof TabType<"MainTab">;
  component: React.ComponentType<any>;
  options: () => BottomTabNavigationOptions;
  listeners?: (props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
  }) => Partial<Record<keyof BottomTabNavigationEventMap, (event: any) => void>>;
};

const HomeStackScreen: TabScreenTypeProps = {
  name: "HomeStack",
  component: HomeScreenStack,
  options: () => ({
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => <TabButtonNav focused={focused} from="AntDesign" name="home" />
  })
};

const MenuStackScreen: TabScreenTypeProps = {
  name: "MenuStack",
  component: MenuScreenStack,
  options: () => ({
    tabBarLabel: "Menu",
    tabBarIcon: ({ focused }) => (
      <TabButtonNav focused={focused} from="MaterialCommunityIcons" name="menu" />
    )
  })
};

export default MainTabNav;
