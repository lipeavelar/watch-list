import { useMemo } from "react";
import { View } from "react-native";
import { usePreferences } from "../../contexts/PreferencesProvider";
import { useUserInfo } from "../../contexts/UserInfoProvider";
import ComboBox from "../ComboBox";

interface Props {
  id: string;
}

export default function PriorityBox({ id }: Props) {
  const { userInfo, updatePriority } = useUserInfo();
  const { filterByMediaTypeFunc } = usePreferences();

  const numberOfMedias = useMemo(
    () => userInfo.watchLater.filter(filterByMediaTypeFunc).length,
    [userInfo.watchLater]
  );

  const selectedMedia = useMemo(
    () =>
      userInfo.watchLater
        .filter(filterByMediaTypeFunc)
        .findIndex((i) => i.id === id),
    [userInfo.watchLater]
  );

  function handlePriotyChange(newPriority: string) {
    updatePriority(id, Number(newPriority));
  }

  return (
    <View style={{ minWidth: "40%" }}>
      <ComboBox
        options={[...Array(numberOfMedias).keys()].map((i) => ({
          label: (i + 1).toString(),
          value: i.toString(),
        }))}
        selectedValue={selectedMedia > -1 ? selectedMedia.toString() : ""}
        onChange={handlePriotyChange}
      />
    </View>
  );
}
