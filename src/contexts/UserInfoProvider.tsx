import { createContext, useContext, useEffect, useState } from "react";

import getLocalizedTitles from "../api/getLocalizedTitles";
import {
  USER_INFO_RATED,
  USER_INFO_WATCH_LATER,
} from "../storage/storage-config";
import { loadUserInfo, updateWatchList } from "../storage/user-info";
import { useLocalization } from "./LocalizationProvider";

interface Props {
  children: React.ReactNode;
}

interface userInfoCtx {
  userInfo: UserInfo;
  updateWatch: UpdateWatch;
  replaceLists: ReplaceLists;
  updatePriority: UpdatePriority;
}

const UserInfoContext = createContext<userInfoCtx>({
  userInfo: {
    watchLater: [],
    rated: [],
  },
  updateWatch: async () => {},
  replaceLists: async () => {},
  updatePriority: async () => {},
});

export function UserInfoProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    watchLater: [],
    rated: [],
  });

  const { locale } = useLocalization();

  useEffect(() => {
    async function loadInfos() {
      try {
        const infos = await loadUserInfo();

        await updateMissingLocalizedTitles(
          infos.watchLater,
          USER_INFO_WATCH_LATER
        );
        await updateMissingLocalizedTitles(infos.rated, USER_INFO_RATED);

        setUserInfo(infos);
      } catch (err) {
        console.error(err);
      }
    }
    loadInfos();
  }, []);

  useEffect(() => {
    updateTitles(locale);
  }, [locale]);

  async function updateTitles(countryTag: string) {
    console.log(locale);
    function updateList(list: SavedMedia[]) {
      return list.map((item) => {
        const title = item.localizedTitles?.[countryTag] ?? item.title;
        return {
          ...item,
          title,
        };
      });
    }

    const newWatchLater = updateList(userInfo.watchLater);
    const newRated = updateList(userInfo.rated);

    updateWatchList(USER_INFO_WATCH_LATER, newWatchLater);
    updateWatchList(USER_INFO_RATED, newRated);

    setUserInfo({
      ...userInfo,
      watchLater: newWatchLater,
      rated: newRated,
    });
  }

  async function updateMissingLocalizedTitles(list: SavedMedia[], key: string) {
    try {
      const promises = list.map(async (item) => {
        if (!item.localizedTitles) {
          const localizedTitles = await getLocalizedTitles(item.id, item.type);
          item.localizedTitles = localizedTitles;
        }
        return item;
      });

      const newList = await Promise.all(promises);
      await updateWatchList(key, newList);
    } catch (err) {
      console.error(err);
    }
  }

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
        if (!media.localizedTitles) {
          const localizedTitles = await getLocalizedTitles(
            media.id,
            media.type
          );
          media.localizedTitles = localizedTitles;
        }
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

  async function updatePriority(id: string, newPriority: number) {
    if (newPriority >= userInfo.watchLater.length) {
      return;
    }

    const indexToRemove = userInfo.watchLater.findIndex(
      (item) => item.id === id
    );
    if (indexToRemove < 0) {
      return;
    }

    const newWatchLater = [...userInfo.watchLater];
    const removedElement = newWatchLater.splice(indexToRemove, 1)[0];
    newWatchLater.splice(newPriority, 0, removedElement);

    try {
      await updateWatchList(USER_INFO_WATCH_LATER, newWatchLater);
      setUserInfo({
        ...userInfo,
        ...{
          watchLater: newWatchLater,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  const value = {
    userInfo,
    updateWatch,
    replaceLists,
    updatePriority,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
