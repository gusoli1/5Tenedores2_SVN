import React, {useState} from 'react';
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";
import { reauthenticate } from "../../app/utils/Api";

export default function ChangeEmailForm(props){
    const {email ,setIsVisibleModal, setReloadData, toastRef} = props;
    const [newEmail, setNewEmail] = useState("");
    const [error,setError] = useState({});
    const [hidePassword, setHidePassword] = useState(true);
    const [password, setPassword] = useState("");

    const updateEmail = () => {
        setError({});
        if (!newEmail || email === newEmail){
            setError({email:"Email no puede ser igual al anterior o estar vacio"})
        } else {
            setIsLoading(true);
            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                    setIsLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setIsVisibleModal(false);
                }).catch(() =>{
                    setError({email:"Error al actualizar el email"});
                    setIsLoading(false);
                })
            }).catch(() => {
                setError({password:"La contraseña no es correcta"})
                setIsLoading(false);
            })
        }
    };
    const [isLoading,setIsLoading] = useState(false);

    return(
        <View style={styles.view}>
            <Input
                placeholder={"Correo electronico"}
                containerStyle={styles.input}
                placeholderTextColor="grey"
                defaultValue={email && email}
                onChange={e => setNewEmail(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name:"at",
                    color:"#c2c2c2"
                }}
                errorMessage={error.email}
            />
            <Input
                placeholder={"Contraseña"}
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
            <Button
                title="Cambiar Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateEmail}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    view:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom: 10
    },
    input:{
        marginBottom:10,
        //marginTop: 10
    },
    btnContainer: {
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
})