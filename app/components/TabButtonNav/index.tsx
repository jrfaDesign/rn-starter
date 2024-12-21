import React from "react";

import { View } from "react-native";
import Icon, { FromType } from "../Icon";
import useThemeColor from "@/hooks/useThemeColor";

type TabButtonNavProps = {
  focused: boolean;
  name: string;
  from: FromType;
};

const TabButtonNav = ({ focused, name, from }: TabButtonNavProps) => {
  const { primary, textLight } = useThemeColor();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Icon name={name} from={from} size={24} color={focused ? primary : textLight} />
    </View>
  );
};

export default TabButtonNav;
