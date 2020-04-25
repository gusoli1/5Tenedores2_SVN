import React, {useState} from 'react';
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../app/utils/Api";
import BackgroundImage from "../components/Backgroundimage";

export default function ChangePasswordForm(props){
    const {setIsVisibleModal, toastRef} = props;
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error,setError] = useState({});
    const [isLoading, setIsLoading]= useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);

    const updatePassword = () => {
        setError({});
        if (!password || !newPassword || !newPasswordRepeat) {
            let objError = {};
            !password &&(objError.password = "No puede estar vacio");
            !newPassword &&(objError.newPassword = "No puede estar vacio");
            !newPasswordRepeat &&(objError.newPasswordRepeat = "No puede estar vacio");
            setError(objError);
        } else {
            if (newPassword !== newPasswordRepeat) {
                setError({
                newPassword:"Las nuevas contraseñas son distintas",
                newPasswordRepeat:"Las nuevas contraseñas son distintas"
                });
            } else {
                setIsLoading(true);
                reauthenticate(password).then(() => {
                    firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                        setIsLoading(false);
                        toastRef.current.show("Contraseña actualizada");
                        setIsVisibleModal(false);
                        //firebase.auth().signOut;
                    }).catch(() => {
                        setError({general:"Error al cambiar la contraseña"});
                        setIsLoading(false);
                    })
                }).catch(() =>{
                    setError({password:"La contraseña no es correcta"});
                    setIsLoading(false);
                });
            }
        }
    };
    
    return(
        
        <View style={styles.view}>
                <Input
                    placeholder={"Contraseña actual"}
                    containerStyle={styles.input}
                    placeholderTextColor="grey"
                    password={true}
                    secureTextEntry={hidePassword}
                    onChange={e => setPassword(e.nativeEvent.text)}
                    rightIcon={{
                        type:"material-community",
                        name: hidePassword ? "eye-outline" : "eye-off-outline",
                        color:"#c2c2c2",
                        onPress: () => setHidePassword(!hidePassword)
                    }}
                    errorMessage={error.password}
                />
                <Input
                    placeholder={"Repetir nueva contraseña"}
                    containerStyle={styles.input}
                    placeholderTextColor="grey"
                    password={true}
                    secureTextEntry={hideNewPassword}
                    onChange={e => setNewPassword(e.nativeEvent.text)}
                    rightIcon={{
                        type:"material-community",
                        name: hideNewPassword ? "eye-outline" : "eye-off-outline",
                        color:"#c2c2c2",
                        onPress: () => setHideNewPassword(!hideNewPassword)
                    }}
                    errorMessage={error.newPassword}
                />
                <Input
                    placeholder={"Repetir nueva contraseña"}
                    containerStyle={styles.input}
                    placeholderTextColor="grey"
                    password={true}
                    secureTextEntry={hideNewPasswordRepeat}
                    onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
                    rightIcon={{
                        type:"material-community",
                        name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
                        color:"#c2c2c2",
                        onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
                    }}
                    errorMessage={error.newPasswordRepeat}
                />
                <Button
                    title="Cambiar contraseña"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={updatePassword}
                    loading={isLoading}
                />
        </View>
    )
}

const styles = StyleSheet.create ({
    view:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom: 10,
        //justifyContent: 'center', 
        //alignContent:"center",
        //width: "auto",
        //height:"auto",
        //flex: 1,
    },
    input:{
        marginBottom:10,
        //width: "auto",
        //height:"auto",
        //flex:1
    },
    btnContainer: {
        marginTop:20,
        //justifyContent:"center",
        //alignContent:"space-between"
        width:"95%",
        //width: "auto",
        //height:"auto"
        //flex:1
    },
    btn:{
        //backgroundColor:"#00a680",
        //width: "auto",
        //alignContent:"flex-end",
        backgroundColor: "rgba(111, 38, 74, 0.7)",
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        marginBottom: 5,
        //height:"auto",
        //flex:1
    }
})