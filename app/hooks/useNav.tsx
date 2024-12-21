import { ScreenProps, SCREENS_PARAMS } from "@/types/Navigation/Screens";
import { STACK_PARAMS } from "@/types/Navigation/Stack";
import { TABS_PARAMS } from "@/types/Navigation/Tabs";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";

export const useNav = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const navTabs = useNavigation<TabNavigationTabType>();
  const useNavigateToTab = <Screen extends keyof TABS_PARAMS>(
    tabName: Screen,
    ...params: TABS_PARAMS[Screen] extends undefined ? [] : [params: TABS_PARAMS[Screen]]
  ) => {
    navTabs.navigate(tabName, {
      screen: tabName,
      params: params[0] || undefined
    });
  };

  const navStack = useNavigation<NavigationStackType>();
  const useNavigationToStack = <
    Screen extends keyof STACK_PARAMS,
    Params extends STACK_PARAMS[Screen] = STACK_PARAMS[Screen]
  >(
    screen: Screen,
    params?: Params extends undefined ? never : Params
  ) => {
    navStack.navigate(screen as any, params ?? undefined);
  };

  return {
    goBack,
    useNavigationToStack,
    useNavigateToTab
  };
};

type TabNavigationTabType = NavigationProp<{
  [Key in keyof TABS_PARAMS]: {
    screen: keyof TABS_PARAMS;
    params?: TABS_PARAMS[keyof TABS_PARAMS];
  };
}>;

type NavigationStackType = NavigationProp<STACK_PARAMS>;

export type TabNavigationProps = {
  [Screen in keyof TABS_PARAMS]: {
    tabName: Screen;
    params: TABS_PARAMS[Screen];
  };
}[keyof TABS_PARAMS];

export type StackNavigationProps = {
  [Screen in keyof STACK_PARAMS]: {
    stackName: Screen;
    params: STACK_PARAMS[Screen];
  };
}[keyof STACK_PARAMS];
