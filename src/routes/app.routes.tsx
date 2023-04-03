import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FilmSlate, Queue } from "phosphor-react-native";

import Details from "../screens/Details";
import Trending from "../screens/Trending";
import WatchLater from "../screens/WatchLater";
import theme from "../theme";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.COLORS.BLUE,
        tabBarInactiveTintColor: theme.COLORS.GRAY_200,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_500,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="trending"
        component={Trending}
        options={{
          tabBarIcon: ({ focused }) => (
            <FilmSlate
              size={28}
              color={focused ? theme.COLORS.BLUE : theme.COLORS.GRAY_200}
            />
          ),
        }}
      />
      <Screen
        name="watch-later"
        component={WatchLater}
        options={{
          tabBarIcon: ({ focused }) => (
            <Queue
              size={28}
              color={focused ? theme.COLORS.BLUE : theme.COLORS.GRAY_200}
            />
          ),
        }}
      />
      <Screen
        name="details"
        component={Details}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
