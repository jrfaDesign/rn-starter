import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { STACK_PARAMS } from "./Stack";

export type TABS_PARAMS = {
  MainTab: MainTabProps;
  SecondaryTab: SecondaryTabProps;
};

// MainTab =================================================================
type MainTabProps = MainTabPropsHomeStackProps | MainTabPropsMenuStackProps;
type MainTabPropsHomeStackProps = { stack: "HomeStack"; params: STACK_PARAMS["HomeStack"] };
type MainTabPropsMenuStackProps = { stack: "MenuStack"; params: STACK_PARAMS["MenuStack"] };

// SecondaryTab =================================================================
type SecondaryTabProps = SecondaryTabPropsFeatureProps | SecondaryTabPropsMenuStackProps;
type SecondaryTabPropsFeatureProps = {
  stack: "FeatureStack";
  params: STACK_PARAMS["FeatureStack"];
};
type SecondaryTabPropsMenuStackProps = { stack: "MenuStack"; params: STACK_PARAMS["MenuStack"] };

// =================
export type TabType<Stack extends keyof TABS_PARAMS> = {
  [Screen in TABS_PARAMS[Stack] as Screen["stack"]]: Screen["params"];
};
