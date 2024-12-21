import React, { useMemo } from "react";
import { useColorScheme } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import {
  BottomTabNavigationEventMap,
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

import Colors from "@/constants/Colors";
import TabButtonNav from "@/components/TabButtonNav";
import ThemeText from "@/components/ThemeText";

import FeatureScreenStack from "@/navigation/stacks/FeatureScreenStack";
import useSharedStyles from "@/hooks/useSharedStyles";

import { TabType } from "@/types/Navigation/Tabs";
import useThemeColor from "@/hooks/useThemeColor";

const Tab = createBottomTabNavigator<TabType<"SecondaryTab">>();
const SecondaryTabNav = () => {
  const { primary, textLight } = useThemeColor();
  const { DEFAULT_TAB_OPTIONS } = useSharedStyles();

  const memoTabs = useMemo(() => [HomeStackScreen], []);

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
  name: keyof TabType<"SecondaryTab">;
  component: React.ComponentType<any>;
  options: () => BottomTabNavigationOptions;
  listeners?: (props: {
    navigation: NavigationProp<ParamListBase>;
    route: any;
  }) => Partial<Record<keyof BottomTabNavigationEventMap, (event: any) => void>>;
};

const HomeStackScreen: TabScreenTypeProps = {
  name: "FeatureStack",
  component: FeatureScreenStack,
  options: () => ({
    tabBarLabel: "Feature",
    tabBarIcon: ({ focused }) => (
      <TabButtonNav focused={focused} from="FontAwesome6" name="list-alt" />
    )
  })
};

export default SecondaryTabNav;
