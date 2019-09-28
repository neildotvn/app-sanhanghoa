import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import MarketTabScreen from "../screens/market/MarketTabScreen";
import Colors from "../constants/Colors";

const marketTabNavigator = createMaterialTopTabNavigator(
    {
        Album: { screen: MarketTabScreen },
        Library: { screen: MarketTabScreen },
        History: { screen: MarketTabScreen },
        Cart: { screen: MarketTabScreen }
    },
    {
        initialRouteName: "Album",
        tabBarOptions: {
            activeTintColor: Colors.darkBlue,
            inactiveTintColor: Colors.black3,
            style: {
                height: 30,
                backgroundColor: Colors.grey
            }
        },
        indicatorStyle: {
            height: 1,
            backgroundColor: Colors.darkBlue
        }
    }
);

export default marketTabNavigator;
