import {createStackNavigator} from 'react-navigation-stack'
import SearchScreen from "../screens/Search";

export const SearchScreenStacks = createStackNavigator(
    {
        Search:{
            screen : SearchScreen,
            navigationOptions: () => ({
                title: "Buscar",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
    }
);

export default SearchScreenStacks;