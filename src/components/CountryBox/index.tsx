import { useLocalization } from "../../contexts/LocalizationProvider";
import ComboBox from "../ComboBox";

interface Props {
  onChange: (countryCode: string) => void;
}

export default function CountryBox({ onChange }: Props) {
  const { countryList, country } = useLocalization();

  return (
    <ComboBox
      options={countryList.map((country) => ({
        label: country.name,
        value: country.code,
      }))}
      selectedValue={country.code}
      onChange={onChange}
    />
  );
}
