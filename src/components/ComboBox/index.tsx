import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View } from "react-native";
import theme from "../../theme";
import { styles } from "./styles";

interface ComboBoxOption {
  value: string;
  label: string;
}

interface Props {
  options: ComboBoxOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
}

export default function ComboBox({
  options,
  selectedValue = "",
  onChange = () => "",
}: Props) {
  const [selected, setSelected] = useState(
    options.find((item) => item.value == selectedValue)?.value ??
      options[0].value
  );

  function handleValueChange(itemValue: string) {
    setSelected(itemValue);
    onChange(itemValue);
  }

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selected}
        onValueChange={handleValueChange}
        dropdownIconColor={theme.COLORS.WHITE}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
}
