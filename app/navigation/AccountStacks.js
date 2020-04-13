import {createStackNavigator} from 'react-navigation-stack'
import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";

export const AccountScreenStacks = createStackNavigator(
    {
        MyAccount:{
            screen : MyAccountScreen,
            navigationOptions: () => ({
                title: "Mi cuenta",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        },
        Login:{
            screen : LoginScreen,
            navigationOptions: () => ({
                title: "Login",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
        ,
        Register:{
            screen : RegisterScreen,
            navigationOptions: () => ({
                title: "Registrar",
                headerStyle:{backgroundColor: 'black'},
                headerTintColor: 'white'
            })
        }
    }
);

export default AccountScreenStacks;