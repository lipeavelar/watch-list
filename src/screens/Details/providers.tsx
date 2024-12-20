import Constants from "expo-constants";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { providerStyles } from "./styles";

interface Props {
  type: string;
  providers: Provider[];
}

export default function Providers({ type, providers }: Props) {
  return (
    <>
      {providers.length > 0 && (
        <View style={providerStyles.container}>
          <Text style={providerStyles.providerType}>{type}</Text>
          <View style={providerStyles.logosContainer}>
            {providers.map(({ id, logoPath }) => {
              return (
                <Image
                  key={id}
                  style={providerStyles.logo}
                  source={`${Constants.expoConfig.extra.logo}${logoPath}`}
                  contentFit="cover"
                  transition={1000}
                />
              );
            })}
          </View>
        </View>
      )}
    </>
  );
}
