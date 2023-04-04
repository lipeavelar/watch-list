import { Star } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import theme from "../../theme";
import { styles } from "./styles";

interface Props {
  rating?: Rating;
  onUpdate?: (rating: Rating) => void;
}

export default function RatingBox({ rating, onUpdate }: Props) {
  const [currentRating, setCurrentRating] = useState<Rating>(rating ?? 0);

  const MAX_RATING = 5;
  const ratings = [...Array(MAX_RATING).keys()].map((i) => i + 1);

  function handlePress(newRating: Rating) {
    if (newRating === currentRating) {
      newRating = 0;
    }
    setCurrentRating(newRating);
    onUpdate(newRating);
  }

  return (
    <View style={styles.container}>
      {ratings.map((i) => (
        <TouchableOpacity
          key={`rating-${i}`}
          activeOpacity={1}
          onPress={() => handlePress(i as Rating)}
          style={styles.star}
        >
          <Star
            size={20}
            weight={i > (currentRating ?? 0) ? "regular" : "fill"}
            color={theme.COLORS.YELLOW_DARK}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}
