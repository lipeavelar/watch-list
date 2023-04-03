import { Check, Plus } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import theme from "../../theme";

interface Props {
  selected: boolean;
  onPress: (selected: boolean) => void;
}

export function SelectButton({ selected, onPress }: Props) {
  const [currentSelection, setCurrentSelection] = useState(selected);

  function handlePress() {
    setCurrentSelection(!currentSelection);
    onPress(!currentSelection);
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      {currentSelection ? (
        <Check size={20} color={theme.COLORS.WHITE} />
      ) : (
        <Plus size={20} color={theme.COLORS.WHITE} />
      )}
    </TouchableOpacity>
  );
}
