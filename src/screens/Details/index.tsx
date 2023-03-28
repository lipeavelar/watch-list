import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import LabeledText from "../../components/LabeledText";
import { Loading } from "../../components/Loading";
import { useLocalization } from "../../utils/LocalizationProvider";
import DetailsHeader from "./details-header";
import ProvidersContainer from "./providers-container";
import { styles } from "./styles";

interface Params {
  id: string;
  type: string;
}

export interface ProvidersInfo {
  streaming: string[];
  rent: string[];
  buy: string[];
}

export interface Media {
  title: string;
  poster: string;
  description: string;
  providers: ProvidersInfo;
}

interface MediaDetail {
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
}

interface MediaProvider {
  provider_id: string;
}

interface MediaProviders {
  results: {
    [key: string]: {
      flatrate?: MediaProvider[];
      rent?: MediaProvider[];
      buy?: MediaProvider[];
    };
  };
}

export default function Details() {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id, type } = route.params as Params;

  const { locale, country, getTranslation } = useLocalization();

  useEffect(() => {
    async function requestDetails() {
      try {
        const [mediaDetailRes, mediaProvidersRes] = await Promise.all([
          fetch(
            `${Constants.expoConfig.extra.apiURL}/${type}/${id}?api_key=${Constants.expoConfig.extra.apiKey}&language=${locale}`
          ),
          fetch(
            `${Constants.expoConfig.extra.apiURL}/${type}/${id}/watch/providers?api_key=${Constants.expoConfig.extra.apiKey}`
          ),
        ]);
        const [mediaDetailJSON, mediaProvidersJSON] = await Promise.all([
          mediaDetailRes.json(),
          mediaProvidersRes.json(),
        ]);
        const mediaDetail = mediaDetailJSON as MediaDetail;
        const mediaProviders = mediaProvidersJSON as MediaProviders;

        const code =
          country.code in mediaProviders.results ? country.code : "US";

        setMedia({
          title: mediaDetail.title ?? mediaDetail.name ?? "",
          poster: mediaDetail.poster_path,
          description: mediaDetail.overview,
          providers: {
            streaming:
              mediaProviders.results[code]?.flatrate?.map(
                (item) => item.provider_id
              ) ?? [],
            rent:
              mediaProviders.results[code]?.rent?.map(
                (item) => item.provider_id
              ) ?? [],
            buy:
              mediaProviders.results[code]?.buy?.map(
                (item) => item.provider_id
              ) ?? [],
          },
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    requestDetails();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <DetailsHeader media={media} />
          <ScrollView style={styles.details}>
            <LabeledText label={getTranslation("details.description")}>
              {media.description}
            </LabeledText>
            <ProvidersContainer providers={media.providers} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
