import {createStackNavigator} from 'react-navigation-stack'
import TopRestaurantsScreen from "../screens/TopRestaurants";

export const TopListScreenStacks = createStackNavigator(
    {
        TopLists:{
            screen : TopRestaurantsScreen,
            navigationOptions: () => ({
                title: "Ranking",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
    }
);

export default TopListScreenStacks;