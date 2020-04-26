import {createStackNavigator} from 'react-navigation-stack'
import RestaurantsScreen from "../screens/Restaurants";
import AddRestaurantScreeen from "../screens/Restaurants/AddRestaurant";

export const RestaurantsScreenStacks = createStackNavigator(
    {
        Restaurants:{
            screen : RestaurantsScreen,
            navigationOptions: () => ({
                title: "Restaurantes",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        },
        AddRestaurant:{
            screen: AddRestaurantScreeen,
            navigationOptions:() =>({
                title: "Nuevo Restaurante"
            })
        }
    },
    //{headerMode: 'none'}
);

export default RestaurantsScreenStacks;