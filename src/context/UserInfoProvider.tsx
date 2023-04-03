import { createContext, useContext, useEffect, useState } from "react";

import { USER_INFO_WATCH_LATER } from "../storage/storage-config";
import { loadUserInfo, updateWatchList } from "../storage/user-info";

interface Props {
  children: React.ReactNode;
}

interface userInfoCtx {
  userInfo: UserInfo;
  updateWatchLater: UpdateWatchLater;
}

const UserInfoContext = createContext<userInfoCtx>({
  userInfo: {
    watchLater: [],
  },
  updateWatchLater: async () => {},
});

export function UserInfoProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    watchLater: [],
  });

  useEffect(() => {
    async function loadInfos() {
      try {
        const infos = await loadUserInfo();
        setUserInfo(infos);
      } catch (err) {
        console.log(err);
      }
    }
    loadInfos();
  }, []);

  async function updateWatchLater(media: SavedMedia, action: WatchListAction) {
    const newWatchLater: SavedMedia[] = [...userInfo.watchLater];
    const index = newWatchLater.findIndex((item) => item.id === media.id);
    switch (action) {
      case "add":
        if (index === -1) {
          newWatchLater.push(media);
        }
        break;
      case "remove":
        if (index >= 0) {
          newWatchLater.splice(index, 1);
        }
        break;
    }

    try {
      await updateWatchList(USER_INFO_WATCH_LATER, newWatchLater);
      setUserInfo({
        watchLater: newWatchLater,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const value = {
    userInfo,
    updateWatchLater,
  };

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
}

export const useUserInfo = () => useContext(UserInfoContext);
