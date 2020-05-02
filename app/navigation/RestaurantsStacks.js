import {createStackNavigator} from 'react-navigation-stack'
import RestaurantsScreen from "../screens/Restaurants";
import AddRestaurantScreeen from "../screens/Restaurants/AddRestaurant";
import RestaurantScreen from "../screens/Restaurants/Restaurant";
import AddReviewRestaurantScreen from "../screens/Restaurants/AddReviewRestaurant";

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
                title: "Nuevo Restaurant"
            })
        },
        Restaurant:{
            screen: RestaurantScreen,
            navigationOptions:(props) =>({
                title: props.navigation.state.params.restaurant.item.restaurant.name
            })
        },
        AddReviewRestaurant:{
            screen: AddReviewRestaurantScreen,
            navigationOptions:() =>({
                title:"Nuevo comentario"
            })
        }
    },
    //{headerMode: 'none'}
);

export default RestaurantsScreenStacks;