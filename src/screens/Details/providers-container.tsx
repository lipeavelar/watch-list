import { Text, View } from "react-native";
import { ProvidersInfo } from ".";
import { useLocalization } from "../../utils/LocalizationProvider";
import Providers from "./providers";
import { providersContainerStyles } from "./styles";

interface Props {
  providers: ProvidersInfo;
}

export default function ProvidersContainer({ providers }: Props) {
  const { getTranslation } = useLocalization();
  const providersTypes = ["streaming", "rent", "buy"];

  return (
    <>
      {Object.values(providers).some((arr) => arr.length > 0) && (
        <View style={providersContainerStyles.providersContainer}>
          <View style={providersContainerStyles.providersContainerTitle}>
            <Text style={providersContainerStyles.providersTitle}>
              {getTranslation("details.available")}
            </Text>
            {/* <ComboBox
          options={[
            {
              label: getTranslation("global.movies"),
              value: "movie",
            },
            {
              label: getTranslation("global.series"),
              value: "tv",
            },
          ]}
          onChange={handleTypeChange}
        /> */}
          </View>
          {providersTypes.map((type) => (
            <Providers
              key={type}
              type={getTranslation(`details.${type}`)}
              providers={providers[type]}
            />
          ))}
        </View>
      )}
    </>
  );
}
