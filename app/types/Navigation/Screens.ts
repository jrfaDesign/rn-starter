import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SCREENS_PARAMS = {
  Home?: undefined;
  DashBoard?: undefined;

  Menu?: undefined;
  Settings?: undefined;

  Login?: undefined;
  SignUp?: undefined;
  ForgotPassword?: undefined;

  FeatureList?: undefined;
  FeatureItem: { id: number };
};

export type ScreenProps<Screen extends keyof SCREENS_PARAMS> = NativeStackScreenProps<
  SCREENS_PARAMS,
  Screen
>;
