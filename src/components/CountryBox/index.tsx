import { useLocalization } from "../../contexts/LocalizationProvider";
import ComboBox from "../ComboBox";

interface Props {
  initialValue?: string;
  onChange: (countryCode: string) => void;
}

export default function CountryBox({ initialValue, onChange }: Props) {
  const { countryList, country } = useLocalization();

  return (
    <ComboBox
      options={countryList.map((country) => ({
        label: country.name,
        value: country.code,
      }))}
      selectedValue={initialValue ?? country.code}
      onChange={onChange}
    />
  );
}
