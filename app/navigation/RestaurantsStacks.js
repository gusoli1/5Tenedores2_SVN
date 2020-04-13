import {createStackNavigator} from 'react-navigation-stack'
import RestaurantsScreen from "../screens/Restaurants";

export const RestaurantsScreenStacks = createStackNavigator(
    {
        Reustarants:{
            screen : RestaurantsScreen,
            navigationOptions: () => ({
                title: "Restaurantes",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
    },
    //{headerMode: 'none'}
);

export default RestaurantsScreenStacks;