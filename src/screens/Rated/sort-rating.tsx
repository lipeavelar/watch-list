import { View } from "react-native";
import ComboBox from "../../components/ComboBox";
import { useLocalization } from "../../contexts/LocalizationProvider";
import { usePreferences } from "../../contexts/PreferencesProvider";

interface Props {
  onUpdate?: (mediaType: RatingSort) => void;
}

export default function SortRating({ onUpdate = () => {} }: Props) {
  const { getTranslation } = useLocalization();
  const { preferences, updatePreferences } = usePreferences();

  function handleTypeChange(type: RatingSort) {
    updatePreferences({ ratingSortType: type });
    onUpdate(type);
  }

  return (
    <View style={{ marginTop: 4 }}>
      <ComboBox
        options={[
          {
            label: getTranslation("rated.sortByDate"),
            value: "sortByDate",
          },
          {
            label: getTranslation("rated.sortByRating"),
            value: "sortByRating",
          },
        ]}
        selectedValue={preferences.ratingSortType}
        onChange={handleTypeChange}
      />
    </View>
  );
}
