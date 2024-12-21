import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  KeyboardTypeOptions,
  ViewStyle,
  TextStyle
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Icon, { FromType } from "../Icon";
import ThemeText from "../ThemeText";
import useThemeColor from "@/hooks/useThemeColor";

type InputType = "email" | "password" | "text" | "num";

type Props = {
  value: string;
  setValue: (value: string) => void;
  type: InputType;
  icon?: {
    from: FromType;
    name: string;
    size?: number;
    color?: string;
  };
  placeholder?: string;
  multiline?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
  errorMsg?: string;
};

const Input = ({
  value,
  setValue,
  type = "text",
  icon,
  placeholder,
  multiline = false,
  containerStyle,
  inputStyle,
  errorMsg
}: Props) => {
  const { theme, backgroundContainer, background, text, grey, error, primary } = useThemeColor();

  const inputRef = useRef<TextInput>(null);
  const [hidePassword, setHidePassword] = useState(type === "password");
  const [isFocused, setIsFocused] = useState(false);

  const getKeyboardProps = useCallback(
    (type: InputType) => {
      const config = {
        email: {
          keyboardType: "email-address" as KeyboardTypeOptions,
          textContentType: "emailAddress" as const,
          secureTextEntry: false
        },
        password: {
          keyboardType: "default" as KeyboardTypeOptions,
          textContentType: "password" as const,
          secureTextEntry: hidePassword
        },
        num: {
          keyboardType: "numeric" as KeyboardTypeOptions,
          textContentType: "none" as const,
          secureTextEntry: false
        },
        text: {
          keyboardType: "default" as KeyboardTypeOptions,
          textContentType: "none" as const,
          secureTextEntry: false
        }
      };
      return config[type];
    },
    [hidePassword]
  );

  const { keyboardType, textContentType, secureTextEntry } = getKeyboardProps(type);

  return (
    <View style={containerStyle}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: theme === "light" ? background : backgroundContainer,
            borderColor: isFocused ? primary : theme === "light" ? background : backgroundContainer
          }
        ]}
        onPress={() => inputRef.current?.focus()}
      >
        {icon && <Icon {...icon} />}

        <TextInput
          ref={inputRef}
          style={[
            styles.input,
            { color: text },
            inputStyle,
            //  { color: theme.textPrimary },
            multiline && { height: 100, textAlignVertical: "top" }
          ]}
          onChangeText={setValue}
          value={value}
          placeholder={placeholder || getDefaultPlaceholder(type)}
          keyboardType={keyboardType}
          textContentType={textContentType}
          keyboardAppearance={theme}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          placeholderTextColor={grey}
        />

        {type === "password" && (
          <Pressable onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIconContainer}>
            <Icon
              from="Feather"
              name={hidePassword ? "eye-off" : "eye"}
              size={16}
              //color={theme.textPrimary}
            />
          </Pressable>
        )}
      </Pressable>
      {errorMsg && (
        <View style={{ left: 4, top: 4 }}>
          <ThemeText fontWeight="500" color={error}>
            {errorMsg}
          </ThemeText>
        </View>
      )}
    </View>
  );
};

const getDefaultPlaceholder = (type: InputType) => {
  const defaultPlaceholders = {
    email: "Enter your email",
    password: "Enter your password",
    text: "Enter text",
    num: "Enter a number"
  };
  return defaultPlaceholders[type];
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 8,
    minHeight: 34,
    marginLeft: 6
  },
  icon: {
    marginRight: 8
  },
  eyeIconContainer: {
    padding: 8
  }
});

const InputLabel = ({ text }: { text: string }) => {
  return (
    <ThemeText fontWeight="600" size={16} style={{ marginBottom: 12 }}>
      {text}
    </ThemeText>
  );
};

export { InputLabel };
