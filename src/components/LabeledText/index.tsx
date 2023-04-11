import { Text, View } from "react-native";
import { styles } from "./styles";

interface Props {
  label: string;
  justifyContent?: boolean;
  children: string;
}

export default function DetailsPage({
  label,
  children,
  justifyContent = false,
}: Props) {
  const containerStyle = justifyContent
    ? [styles.text, styles.content, styles.justify]
    : [styles.text, styles.content];

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      <Text style={containerStyle}>{children}</Text>
    </View>
  );
}
