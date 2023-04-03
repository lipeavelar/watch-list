import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_INFO_WATCH_LATER } from "./storage-config";

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

    return <UserInfo>{
      watchLater,
    };
  } catch (err) {
    throw err;
  }
}
