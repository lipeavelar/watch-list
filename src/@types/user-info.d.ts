interface UserInfo {
  watchLater: SavedMedia[];
  rated: SavedMedia[];
}

type UpdateWatch = (
  list: WatchListType,
  media: SavedMedia,
  action: WatchListAction
) => Promise<void>;

type WatchListAction = "add" | "remove";
