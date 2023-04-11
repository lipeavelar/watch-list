import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
  icon: JSX.Element;
  onPress: () => void;
  children?: string;
}

export function IconButton({ icon, onPress, children }: Props) {
  function handlePress() {
    onPress();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {icon}
      {children && <Text style={styles.text}>{children}</Text>}
    </TouchableOpacity>
  );
}
