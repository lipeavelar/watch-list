import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ComboBox from "../../components/ComboBox";
import { useLocalization } from "../../utils/LocalizationProvider";
import Providers from "./providers";
import { providersContainerStyles } from "./styles";

interface Props {
  type: string;
  id: string;
}

export default function ProvidersContainer({ type, id }: Props) {
  const { getTranslation, countryList, country, updateCountry } =
    useLocalization();
  const [providers, setProviders] = useState<ProvidersInfo>({
    buy: [],
    rent: [],
    streaming: [],
  });
  const providersTypes = ["streaming", "rent", "buy"];

  useEffect(() => {
    async function requestProviders() {
      try {
        const mediaProvidersRes = await fetch(
          `${Constants.expoConfig.extra.apiURL}/${type}/${id}/watch/providers?api_key=${Constants.expoConfig.extra.apiKey}`
        );
        const providersAPI =
          (await mediaProvidersRes.json()) as MediaProvidersAPI;
        const code = country.code in providersAPI.results ? country.code : "US";
        const providersFormatted: ProvidersInfo = {
          buy:
            providersAPI.results[code]?.buy?.map((item) => item.provider_id) ??
            [],
          rent:
            providersAPI.results[code]?.rent?.map((item) => item.provider_id) ??
            [],
          streaming:
            providersAPI.results[code]?.flatrate?.map(
              (item) => item.provider_id
            ) ?? [],
        };

        setProviders(providersFormatted);
      } catch (err) {
        console.log(err);
      }
    }
    requestProviders();
  }, [country]);

  return (
    <>
      {Object.values(providers).some((arr) => arr.length > 0) && (
        <View style={providersContainerStyles.providersContainer}>
          <Text style={providersContainerStyles.providersTitle}>
            {getTranslation("details.available")}
          </Text>
          <ComboBox
            options={countryList.map((country) => ({
              label: country.name,
              value: country.code,
            }))}
            selectedValue={country.code}
            onChange={updateCountry}
          />
          {providersTypes.map((type) => (
            <Providers
              key={type}
              type={getTranslation(`details.${type}`)}
              providers={providers[type]}
            />
          ))}
        </View>
      )}
    </>
  );
}
