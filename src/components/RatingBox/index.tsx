import { Star } from "phosphor-react-native";
import { View } from "react-native";
import { styles } from "./styles";

interface Props {
  rating?: Rating;
}

export default function RatingBox({ rating }: Props) {
  const MAX_RATING = 5;
  const ratings = [...Array(MAX_RATING).keys()].map((i) => i + 1);
  return (
    <View style={styles.container}>
      {ratings.map((i) => (
        <Star size={20} weight={i > (rating ?? 0) ? "regular" : "fill"} />
      ))}
    </View>
  );
}
