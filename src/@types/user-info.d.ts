interface UserInfo {
  watchLater: SavedMedia[];
  rated: SavedMedia[];
}

type UpdateWatch = (
  list: WatchListType,
  media: SavedMedia,
  action: WatchListAction
) => Promise<void>;

type ReplaceLists = (
  watchLaterList: SavedMedia[],
  rated: SavedMedia[]
) => Promise<void>;

type UpdatePriority = (id: string, newPriority: number) => Promise<void>;

type WatchListAction = "add" | "remove";
