import { Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
  label: string;
  children: string;
}

export default function DetailsPage({ label, children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, ...styles.label }}>{label}</Text>
      <Text style={{ ...styles.text, ...styles.content }}>{children}</Text>
    </View>
  );
}
