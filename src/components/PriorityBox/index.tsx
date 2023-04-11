import { useMemo } from "react";
import { View } from "react-native";
import { usePreferences } from "../../context/PreferencesProvider";
import { useUserInfo } from "../../context/UserInfoProvider";
import ComboBox from "../ComboBox";

interface Props {
  id: string;
}

export default function PriorityBox({ id }: Props) {
  const { userInfo, updatePriority } = useUserInfo();
  const { preferences } = usePreferences();

  const numberOfMedias = useMemo(
    () =>
      userInfo.watchLater.filter((item) => item.type === preferences.mediaType)
        .length,
    [userInfo.watchLater]
  );

  const selectedMedia = useMemo(
    () => userInfo.watchLater.findIndex((i) => i.id === id),
    [userInfo.watchLater]
  );

  function handlePriotyChange(newPriority: string) {
    updatePriority(id, Number(newPriority));
  }

  return (
    <View style={{ minWidth: "25%" }}>
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
