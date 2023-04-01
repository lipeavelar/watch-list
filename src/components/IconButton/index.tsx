import { TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface Props {
  icon: JSX.Element;
  onPress: () => void;
}

export function IconButton({ icon, onPress }: Props) {
  function handlePress() {
    onPress();
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {icon}
    </TouchableOpacity>
  );
}
