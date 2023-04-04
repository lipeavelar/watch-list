import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ComboBox from "../../components/ComboBox";
import { useLocalization } from "../../context/LocalizationProvider";
import { usePreferences } from "../../context/PreferencesProvider";
import Providers from "./providers";
import { providersContainerStyles } from "./styles";

interface Props {
  id: string;
}

export default function ProvidersContainer({ id }: Props) {
  const { getTranslation, countryList, country } = useLocalization();
  const { preferences } = usePreferences();

  const { updatePreferences } = usePreferences();
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
          `${Constants.expoConfig.extra.apiURL}/${preferences.mediaType}/${id}/watch/providers?api_key=${Constants.expoConfig.extra.apiKey}`
        );
        const providersAPI =
          (await mediaProvidersRes.json()) as MediaProvidersAPI;
        const providersFormatted: ProvidersInfo = {
          buy:
            providersAPI.results[country.code]?.buy?.map(
              (item) => item.provider_id
            ) ?? [],
          rent:
            providersAPI.results[country.code]?.rent?.map(
              (item) => item.provider_id
            ) ?? [],
          streaming:
            providersAPI.results[country.code]?.flatrate?.map(
              (item) => item.provider_id
            ) ?? [],
        };

        setProviders(providersFormatted);
      } catch (err) {
        console.error(err);
      }
    }
    requestProviders();
  }, [country.code]);

  return (
    <>
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
          onChange={(countryCode: string) =>
            updatePreferences({
              countryCode,
            })
          }
        />
        {Object.values(providers).some((arr) => arr.length > 0) ? (
          providersTypes.map((type) => (
            <Providers
              key={type}
              type={getTranslation(`details.${type}`)}
              providers={providers[type]}
            />
          ))
        ) : (
          <Text style={providersContainerStyles.notFoundText}>
            {getTranslation("details.notFound")}
          </Text>
        )}
      </View>
    </>
  );
}
