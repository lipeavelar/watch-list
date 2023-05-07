import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_INFO_RATED, USER_INFO_WATCH_LATER } from "./storage-config";

export async function updateWatchList(
  listKey: string,
  watchLater: SavedMedia[]
) {
  try {
    await AsyncStorage.setItem(listKey, JSON.stringify(watchLater));
  } catch (err) {
    throw err;
  }
}

export async function loadUserInfo(): Promise<UserInfo> {
  try {
    const watchLaterString = await AsyncStorage.getItem(USER_INFO_WATCH_LATER);
    const watchLater = watchLaterString ? JSON.parse(watchLaterString) : [];

    const ratedString = await AsyncStorage.getItem(USER_INFO_RATED);
    const rated = ratedString ? JSON.parse(ratedString) : [];

    if (rated && rated.length > 0) {
      const currentDate = new Date();
      let removeDays = rated.length;
      let updated = false;
      rated.forEach((media: SavedMedia) => {
        if (media.ratingAdded) {
          media.ratingAdded = new Date(media.ratingAdded);
        } else {
          const rateDate = new Date();
          rateDate.setDate(currentDate.getDate() - removeDays);
          media.ratingAdded = rateDate;
          updated = true;
        }

        removeDays--;
      });

      if (updated) {
        await AsyncStorage.setItem(USER_INFO_RATED, JSON.stringify(rated));
      }
    }
    return <UserInfo>{
      watchLater,
      rated,
    };
  } catch (err) {
    throw err;
  }
}
