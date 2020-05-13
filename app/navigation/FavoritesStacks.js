import {createStackNavigator} from 'react-navigation-stack'
import FavoritesScreen from "../screens/Favorites";

export const FavoritesScreenStacks = createStackNavigator(
    {
        Favorites:{
            screen : FavoritesScreen,
            navigationOptions: () => ({
                title: "Favoritos",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
    }
);

export default FavoritesScreenStacks;