import React,{useState} from 'react';
import { SocialIcon } from "react-native-elements";
import * as Facebook from "expo-facebook";
import * as Firebase from "firebase";
import {FaceBookApi} from "../../app/utils/Social";
import Loading from "../components/Loading";

export default function LoginFacebook (props){
  const {ToastRef, navigation} = props;
  const[isVisibleLoadin, setisVisibleLoadin] =useState(false);

  const login = async () => {
    setisVisibleLoadin(true);
    try {
      await Facebook.initializeAsync(FaceBookApi.aplication_Id);
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile']});
      if (type === 'success') {
        const credentials = Firebase.auth.FacebookAuthProvider.credential(token);
        //const credentials = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        await Firebase.auth().signInWithCredential(credentials).then(() => {
          //console.log("login correcto")
          navigation.navigate("MyAccount")
         }).catch(() => 
            //console.log("Error al ingresar con FaceBook");
            ToastRef.current.show("Error al ingresar con FaceBook"));
      } else {
        //console.log("Inicio de sesion cancelado")
        ToastRef.current.show("Inicio de sesion cancelado");
      }
     } catch ({ message }) {
       //console.log("Error al intentar registrarse");
       ToastRef.current.show("Error al intentar registrarse");
    }
    setisVisibleLoadin(false);
  };

    return(
      <>
        <SocialIcon
            title="Ingresar con FaceBook"
            button
            type="facebook"
            onPress={login}
        />
        <Loading isVisible={isVisibleLoadin} text="Iniciando sesion"/>
      </>
    );
}