import { createContext, useContext, useEffect, useState } from "react";

import { Alert } from "react-native";
import {
  USER_INFO_RATED,
  USER_INFO_WATCH_LATER,
} from "../storage/storage-config";
import { loadUserInfo, updateWatchList } from "../storage/user-info";

interface Props {
  children: React.ReactNode;
}

interface userInfoCtx {
  userInfo: UserInfo;
  updateWatch: UpdateWatch;
}

const UserInfoContext = createContext<userInfoCtx>({
  userInfo: {
    watchLater: [],
    rated: [],
  },
  updateWatch: async () => {},
});

export function UserInfoProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    watchLater: [],
    rated: [],
  });

  useEffect(() => {
    async function loadInfos() {
      try {
        const infos = await loadUserInfo();
        setUserInfo(infos);
      } catch (err) {
        Alert.alert(err);
      }
    }
    loadInfos();
  }, []);

  async function updateWatchLater(newWatchLater: SavedMedia[]) {
    await updateWatchList(USER_INFO_WATCH_LATER, newWatchLater);
    setUserInfo({
      ...userInfo,
      ...{
        watchLater: newWatchLater,
      },
    });
  }

  async function updateWatched(newRated: SavedMedia[]) {
    await updateWatchList(USER_INFO_RATED, newRated);
    setUserInfo({
      ...userInfo,
      ...{
        rated: newRated,
      },
    });
  }

  const updates: { [key: string]: (w: SavedMedia[]) => Promise<void> } = {
    "to-see": updateWatchLater,
    seen: updateWatched,
  };

  async function updateWatch(
    list: WatchListType,
    media: SavedMedia,
    action: WatchListAction
  ) {
    const newWatch: SavedMedia[] = [...userInfo.watchLater];
    const index = newWatch.findIndex((item) => item.id === media.id);
    switch (action) {
      case "add":
        if (index === -1) {
          newWatch.push(media);
        }
        break;
      case "remove":
        if (index >= 0) {
          newWatch.splice(index, 1);
        }
        break;
    }

    try {
      await updates[list](newWatch);
    } catch (err) {
      Alert.alert(err);
    }
  }

  const value = {
    userInfo,
    updateWatch,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
