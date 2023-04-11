import { createContext, useContext, useEffect, useState } from "react";

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
  replaceLists: ReplaceLists;
}

const UserInfoContext = createContext<userInfoCtx>({
  userInfo: {
    watchLater: [],
    rated: [],
  },
  updateWatch: async () => {},
  replaceLists: async () => {},
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
        console.error(err);
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

  async function updateRated(newRated: SavedMedia[]) {
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
    rated: updateRated,
  };

  async function updateWatch(
    list: WatchListType,
    media: SavedMedia,
    action: WatchListAction
  ) {
    const newWatch: SavedMedia[] =
      list === "to-see" ? [...userInfo.watchLater] : [...userInfo.rated];
    const index = newWatch.findIndex((item) => item.id === media.id);
    switch (action) {
      case "add":
        if (index === -1) {
          newWatch.push(media);
        } else {
          newWatch[index] = media;
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
      console.error(err);
    }
  }

  async function replaceLists(watchLater: SavedMedia[], rated: SavedMedia[]) {
    try {
      await updateWatchList(USER_INFO_WATCH_LATER, watchLater);
      await updateWatchList(USER_INFO_RATED, rated);

      setUserInfo({
        watchLater,
        rated,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const value = {
    userInfo,
    updateWatch,
    replaceLists,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
