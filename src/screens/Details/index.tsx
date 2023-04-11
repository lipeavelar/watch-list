import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import LabeledText from "../../components/LabeledText";
import { Loading } from "../../components/Loading";
import PriorityBox from "../../components/PriorityBox";
import RatingBox from "../../components/RatingBox";
import { useLocalization } from "../../context/LocalizationProvider";
import { usePreferences } from "../../context/PreferencesProvider";
import { useUserInfo } from "../../context/UserInfoProvider";
import DetailsHeader from "./details-header";
import ProvidersContainer from "./providers-container";
import { styles } from "./styles";

interface Params {
  id: string;
}

export default function Details() {
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const { id } = route.params as Params;

  const { locale, getTranslation } = useLocalization();
  const { preferences } = usePreferences();
  const { userInfo, updateWatch } = useUserInfo();

  useEffect(() => {
    async function requestDetails() {
      try {
        const mediaDetailRes = await fetch(
          `${Constants.expoConfig.extra.apiURL}/${preferences.mediaType}/${id}?api_key=${Constants.expoConfig.extra.apiKey}&language=${locale}`
        );
        const mediaDetail = (await mediaDetailRes.json()) as MediaDetailAPI;

        const releaseDate =
          mediaDetail.release_date ??
          mediaDetail.seasons?.reduce((prev, next) =>
            prev.season_number > next.season_number ? prev : next
          )?.air_date ??
          "-";

        setMedia({
          id: mediaDetail.id,
          title: mediaDetail.title ?? mediaDetail.name ?? "",
          poster: mediaDetail.poster_path,
          description: mediaDetail.overview,
          genres: mediaDetail.genres.map((genre) => genre.name),
          releaseDate,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    setLoading(true);
    requestDetails();
  }, [id]);

  function handleNewRating(newRating: Rating) {
    async function updateList() {
      try {
        const updateItem: SavedMedia = {
          id,
          poster: media?.poster,
          title: media?.title,
          type: preferences.mediaType,
          rating: newRating,
        };
        await updateWatch("rated", updateItem, action);
      } catch (err) {
        console.error(err);
      }
    }
    const action: WatchListAction = newRating > 0 ? "add" : "remove";
    updateList();
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <DetailsHeader media={media} />
          <ScrollView
            style={styles.details}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={[styles.doubleColumContainer, { minHeight: 60 }]}>
              {userInfo.watchLater.findIndex((i) => i.id === id) > -1 ? (
                <PriorityBox id={id} />
              ) : (
                <View></View>
              )}
              <RatingBox
                rating={
                  userInfo.rated.find((item) => item.id === id)?.rating ?? 0
                }
                onUpdate={handleNewRating}
              />
            </View>
            <View style={styles.doubleColumContainer}>
              <LabeledText label={getTranslation("details.genres")}>
                {media.genres.join(", ")}
              </LabeledText>
              <View>
                <LabeledText
                  label={getTranslation(
                    `details.${preferences.mediaType}ReleaseDate`
                  )}
                >
                  {media.releaseDate.split("-").reverse().join("-")}
                </LabeledText>
              </View>
            </View>

            <LabeledText
              label={getTranslation("details.description")}
              justifyContent
            >
              {media.description}
            </LabeledText>
            <ProvidersContainer id={id} />
          </ScrollView>
        </View>
      )}
    </>
  );
}
