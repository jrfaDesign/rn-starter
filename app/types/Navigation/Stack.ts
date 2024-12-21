import { SCREENS_PARAMS } from "./Screens";

// * screen that dont need props user params?:

export type STACK_PARAMS = {
  HomeStack: HomeStackProps;
  MenuStack: MenuStackProps;
  AuthStack: AuthStackProps;

  FeatureStack: FeatureStackProps;
};

// HomeStack =================================================================
type HomeStackProps = HomeStackHomeScreenProps | HomeStackDashBoardScreenProps;
type HomeStackHomeScreenProps = { screen: "Home"; params?: SCREENS_PARAMS["Home"] };
type HomeStackDashBoardScreenProps = { screen: "DashBoard"; params?: SCREENS_PARAMS["DashBoard"] };

// MenuStack =================================================================
type MenuStackProps = MenuStackMenuScreenProps | MenuStackSettingScreenProps;
type MenuStackMenuScreenProps = { screen: "Menu"; params?: SCREENS_PARAMS["Menu"] };
type MenuStackSettingScreenProps = { screen: "Settings"; params?: SCREENS_PARAMS["Settings"] };

// AuthStack =================================================================
type AuthStackProps =
  | AuthStackLoginScreenProps
  | AuthStackSignUpScreenProps
  | AuthStackForgotPasswordScreenProps;
type AuthStackLoginScreenProps = { screen: "Login"; params?: SCREENS_PARAMS["Login"] };
type AuthStackSignUpScreenProps = { screen: "SignUp"; params?: SCREENS_PARAMS["SignUp"] };
type AuthStackForgotPasswordScreenProps = {
  screen: "ForgotPassword";
  params?: SCREENS_PARAMS["ForgotPassword"];
};

// FeatureStack =================================================================
type FeatureStackProps = FeatureStackPropsListProps | FeatureStackPropsItemProps;
type FeatureStackPropsListProps = { screen: "FeatureList"; params?: SCREENS_PARAMS["FeatureList"] };
type FeatureStackPropsItemProps = { screen: "FeatureItem"; params: SCREENS_PARAMS["FeatureItem"] };

// =======
export type StackType<Stack extends keyof STACK_PARAMS> = {
  [Screen in STACK_PARAMS[Stack] as Screen["screen"]]: Screen["params"];
};
