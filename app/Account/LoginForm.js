import React , {useState} from 'react';
import { StyleSheet , View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../utils/Validation";
import * as Firebase from 'firebase';
import Loading from '../components/Loading';
import { withNavigation } from "react-navigation";

function LoginForm(props){
    const {ToastRef, navigation}=props;
    const[hidePassword, setHidePassword]=useState(true);
    const[email, setEmail]=useState(false);
    const[password, setPassword]=useState(false);
    const[isVisibleLoadin, setisVisibleLoadin] =useState(false);

    const login = async () => {
        setisVisibleLoadin(true);
        if (!email || !password ){
            ToastRef.current.show("Todos los campos son obligatorios");
        } else { 
            if (!validateEmail(email)) {
                ToastRef.current.show("El email es incorrecto");
            } else { 
                    await Firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
                        navigation.navigate("MyAccount");
                    }).catch(() =>{ 
                        ToastRef.current.show("Correo o contraseña incorrecta");
                    })
            }
        }
        setisVisibleLoadin(false);
    };

    return(
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                placeholderTextColor="grey"
                onChange={e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                placeholderTextColor="grey"
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=> setHidePassword(!hidePassword)}
                    />
                }
            />
            <Button
                title="Iniciar sesion"
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={login}
            />
            <Loading isVisible={isVisibleLoadin} text="Iniciando sesion"/>            
        </View>
    )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10
    },
    inputForm:{
        width:"100%",
        marginTop:10,
        backgroundColor:"white",
        borderRadius:15
    },
    iconRight:{
        color:"#c1c1c1"
    },
    btnContainerLogin:{
        marginTop:20,
        width:"100%",
        borderRadius: 15
    },
    btnLogin:{
        backgroundColor:"#00a680",
        borderRadius: 15
    }
})