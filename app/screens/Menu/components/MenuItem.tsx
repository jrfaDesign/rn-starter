import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MenuItemProps } from "..";

import ThemeText from "@/components/ThemeText";
import Icon from "@/components/Icon";
import useThemeColor from "@/hooks/useThemeColor";
import { useNav } from "@/hooks/useNav";

type Props = {
  item: MenuItemProps;
  isLast: boolean;
};
const MenuItem = ({ item }: Props) => {
  const { useNavigateToTab, useNavigationToStack } = useNav();
  const { backgroundContainer } = useThemeColor();

  const { iconFrom, iconName, title, navigationProps } = item;

  return (
    <Pressable
      onPress={() => {
        if ("tabName" in navigationProps) {
          useNavigateToTab(navigationProps.tabName, navigationProps.params);
        }
        if ("stackName" in navigationProps) {
          useNavigationToStack(navigationProps.stackName, navigationProps.params);
        }
      }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.menuContainer,
            { opacity: pressed ? 0.5 : 1, backgroundColor: backgroundContainer }
          ]}
        >
          <View style={styles.innerContentContainer}>
            <Icon size={28} from={iconFrom} name={iconName} />
            <ThemeText size={20}>{title}</ThemeText>
          </View>
          <Icon from={"MaterialIcons"} name={"navigate-next"} size={34} />
        </View>
      )}
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 18
  },

  innerContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  }
});
