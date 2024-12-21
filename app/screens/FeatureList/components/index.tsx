import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNav } from "@/hooks/useNav";
import ThemeText from "@/components/ThemeText";
import useThemeColor from "@/hooks/useThemeColor";

type Props = {
  item: {
    id: number;
    label: string;
  };
};

const ListItem = ({ item }: Props) => {
  const { useNavigationToStack } = useNav();
  const { backgroundContainer } = useThemeColor();
  const { id, label } = item;
  return (
    <Pressable
      onPress={() =>
        useNavigationToStack("FeatureStack", { screen: "FeatureItem", params: { id } })
      }
    >
      {({ pressed }) => (
        <View
          style={[
            { opacity: pressed ? 0.5 : 1, backgroundColor: backgroundContainer },
            styles.container
          ]}
        >
          <ThemeText>{label}</ThemeText>
        </View>
      )}
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4
      },
      android: {
        elevation: 4
      }
    })
  }
});
