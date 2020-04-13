import React from "react";
import { Icon } from "react-native-elements";
import { createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from "react-navigation-tabs";
import { RestaurantsScreenStacks } from "../navigation/RestaurantsStacks";
import { TopListScreenStacks } from "../navigation/TopListStacks";
import { SearchScreenStacks } from "../navigation/SearchStacks";
import { AccountScreenStacks } from "../navigation/AccountStacks";

const NavigationStacks = createBottomTabNavigator (
    {
        Restaurants:{
            screen: RestaurantsScreenStacks,
            navigationOptions: () => ({
                title: "Restaurantes",
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        type="material-community"
                        name="compass-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        TopLists:{
            screen: TopListScreenStacks,
            navigationOptions: () => ({
                title: "Ranking",
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        type="material-community"
                        name="star-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        Search:{
            screen: SearchScreenStacks,
            navigationOptions: () => ({
                title: "Buscar",
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        type="material-community"
                        name="magnify"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        },
        Account:{
            screen: AccountScreenStacks,
            navigationOptions: () => ({
                title: "Mi cuenta",
                tabBarIcon: ({tintColor}) => (
                    <Icon
                        type="material-community"
                        name="home-outline"
                        size={22}
                        color={tintColor}
                    />
                )
            })
        }
    },
    {
        initialRouteName: "Restaurants",
        order: ["Restaurants", "TopLists", "Search", "Account"],
        tabBarOptions:{
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680",
            inactiveBackgroundColor:"black",
            activeBackgroundColor:"black"
        }
    }
)

export default createAppContainer(NavigationStacks);
