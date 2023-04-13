import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { DownloadSimple, UploadSimple } from "phosphor-react-native";
import { Text, View } from "react-native";
const { StorageAccessFramework } = FileSystem;

import { IconButton } from "../../components/IconButton";
import { useLocalization } from "../../contexts/LocalizationProvider";
import { useUserInfo } from "../../contexts/UserInfoProvider";
import theme from "../../theme";
import { styles } from "./styles";

export default function Settings() {
  const { userInfo, replaceLists } = useUserInfo();
  const { getTranslation } = useLocalization();

  async function exportFile() {
    try {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const fileURI = await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "data",
          "application/json"
        );
        await FileSystem.writeAsStringAsync(fileURI, JSON.stringify(userInfo));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function importFile() {
    try {
      const picker = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        type: "application/json",
      });
      if (picker.type === "success") {
        const fileContents = await FileSystem.readAsStringAsync(picker.uri);
        const { watchLater, rated }: UserInfo = JSON.parse(fileContents);

        await replaceLists(watchLater, rated);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {getTranslation("settings.importExportLabel")}
      </Text>
      <View style={styles.dataContainer}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={<UploadSimple size={32} color={theme.COLORS.WHITE} />}
            onPress={exportFile}
          >
            {getTranslation("settings.export")}
          </IconButton>
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={<DownloadSimple size={32} color={theme.COLORS.WHITE} />}
            onPress={importFile}
          >
            {getTranslation("settings.import")}
          </IconButton>
        </View>
      </View>
    </View>
  );
}
