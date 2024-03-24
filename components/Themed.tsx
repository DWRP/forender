/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextnput,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type TextInputProps = ThemeProps & DefaultTextnput["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "dark";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, secureTextEntry, ...otherProps } =
    props;
  const [hidePassword, setHidePassword] = useState(true);
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "borderColor"
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <DefaultTextnput
        secureTextEntry={secureTextEntry && hidePassword}
        placeholderTextColor={color}
        style={[
          {
            color,
            borderColor,
            borderWidth: 1,
            borderRadius: 8,
            width: "75%",
            marginVertical: 8,
            padding: 8,
          },
          style,
        ]}
        {...otherProps}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
          <FontAwesome
            name={hidePassword ? "eye" : "eye-slash"}
            size={24}
            color={color}
            style={{ position: "absolute", left: -40, bottom: -10 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
