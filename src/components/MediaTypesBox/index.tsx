import { useLocalization } from "../../context/LocalizationProvider";
import { usePreferences } from "../../context/PreferencesProvider";
import ComboBox from "../ComboBox";

interface Props {
  onUpdate?: (mediaType: MediaTypes) => void;
}

export default function MediaTypesBox({ onUpdate = () => {} }: Props) {
  const { getTranslation } = useLocalization();
  const { preferences, updatePreferences } = usePreferences();

  function handleTypeChange(type: MediaTypes) {
    updatePreferences({ mediaType: type });
    onUpdate(type);
  }

  return (
    <ComboBox
      options={[
        {
          label: getTranslation("global.movie"),
          value: "movie",
        },
        {
          label: getTranslation("global.tv"),
          value: "tv",
        },
      ]}
      selectedValue={preferences.mediaType}
      onChange={handleTypeChange}
    />
  );
}
