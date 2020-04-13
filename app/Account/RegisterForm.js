import React , {useState} from 'react';
import { StyleSheet , View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../utils/Validation";
import * as Firebase from 'firebase';
import Loading from '../components/Loading';
import { withNavigation } from "react-navigation";

function RegisterForm(props){
    const {ToastRef, navigation} = props;
    const[hidePassword, setHidePassword]=useState(true);
    const[hideRepitPassword, setHideRepitPassword]=useState(true);
    const[email, setEmail]=useState(true);
    const[password, setPassword]=useState(true);
    const[repitPassword, setRepitPassword]=useState(true);
    const[isVisibleLoadin, setisVisibleLoadin] =useState(false);

    const register = async () => {
        setisVisibleLoadin(true);
        if (!email || !password || !repitPassword){
            ToastRef.current.show("Todos los campos son obligatorios");
        } else { 
            if (!validateEmail(email)) {
                ToastRef.current.show("El email es incorrecto");
            } else { 
                if(password !== repitPassword) {
                    ToastRef.current.show("Las contraseñas no son iguales");
                } else {
                    await Firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
                        navigation.navigate("MyAccount");
                    }).catch(() =>{ 
                        ToastRef.current.show("Error al crear la cuenta");
                    })
                }
            }
        }
        setisVisibleLoadin(false);
    };

    return(
        <View
            style={styles.formContainer}>
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
            <Input
                placeholder="Repetir Contraseña"
                password={true}
                secureTextEntry={hideRepitPassword}
                containerStyle={styles.inputForm}
                placeholderTextColor="grey"                
                onChange={e => setRepitPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hideRepitPassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=> setHideRepitPassword(!hideRepitPassword)}
                    />
                }
            />
            <Button
                title="Registrarse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
            <Loading isVisible={isVisibleLoadin} text="Creando cuenta"/>
        </View>
    )
}

export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },
    inputForm:{
        width:"100%",
        marginTop:10,
        color:"grey",
        backgroundColor:"white",
        borderRadius:15
    },
    iconRight:{
        color:"#c1c1c1"
    },
    btnContainerRegister:{
        marginTop:20,
        width:"100%",
        borderRadius: 15
    },
    btnRegister:{
        backgroundColor:"#00a680",
        borderRadius: 15
    }
})