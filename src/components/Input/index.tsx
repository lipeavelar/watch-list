import { TextInput, TextInputProps } from "react-native";
import theme from "../../theme";
import { styles } from "./styles";

export default function Input({ style, ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={theme.COLORS.GRAY_200}
      {...rest}
    />
  );
}
