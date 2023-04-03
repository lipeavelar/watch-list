interface UserInfo {
  watchLater: SavedMedia[];
}

type UpdateWatchLater = (
  media: SavedMedia,
  action: WatchListAction
) => Promise<void>;

type WatchListAction = "add" | "remove";
