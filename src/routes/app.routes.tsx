import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Details from "../screens/Details";
import Trending from "../screens/Trending";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="trending" component={Trending} />
      <Screen name="details" component={Details} />
    </Navigator>
  );
}
