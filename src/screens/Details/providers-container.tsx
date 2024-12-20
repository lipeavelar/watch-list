import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CountryBox from "../../components/CountryBox";
import { useLocalization } from "../../contexts/LocalizationProvider";
import { usePreferences } from "../../contexts/PreferencesProvider";
import Providers from "./providers";
import { providersContainerStyles } from "./styles";

interface Props {
  id: string;
}

export default function ProvidersContainer({ id }: Props) {
  const { getTranslation, country } = useLocalization();
  const { preferences } = usePreferences();

  const { updatePreferences } = usePreferences();
  const [providers, setProviders] = useState<ProvidersInfo>({
    buy: [],
    rent: [],
    streaming: [],
  });
  const providersTypes = ["streaming", "rent", "buy"];

  function convertProviderFromAPI(provider: MediaProviderAPI): Provider {
    if (!provider || !provider.provider_id || !provider.logo_path) {
      return;
    }
    return {
      id: provider.provider_id,
      logoPath: provider.logo_path,
    };
  }

  useEffect(() => {
    async function requestProviders() {
      try {
        const mediaProvidersRes = await fetch(
          `${Constants.expoConfig.extra.apiURL}${preferences.mediaType}/${id}/watch/providers?api_key=${Constants.expoConfig.extra.apiKey}`
        );
        const providersAPI =
          (await mediaProvidersRes.json()) as MediaProvidersAPI;
        const providersFormatted: ProvidersInfo = {
          buy:
            providersAPI.results[country.code]?.buy?.map(
              convertProviderFromAPI
            ) ?? [],
          rent:
            providersAPI.results[country.code]?.rent?.map(
              convertProviderFromAPI
            ) ?? [],
          streaming:
            providersAPI.results[country.code]?.flatrate?.map(
              convertProviderFromAPI
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
        <CountryBox
          onChange={(countryCode) => updatePreferences({ countryCode })}
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
