import React from "react";
import * as Icons from "@expo/vector-icons";
import useThemeColor from "@/hooks/useThemeColor";

export type FromType = keyof typeof Icons;

type IconProps = {
  from: FromType;
  name: string;
  size?: number;
  color?: string;
};

const Icon = ({ from, name, size = 24, color }: IconProps) => {
  const IconComponent = Icons[from];

  const { text } = useThemeColor();
  if (!IconComponent) {
    console.warn(`Icon library "${from}" not found.`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color ?? text} />;
};

export default Icon;
