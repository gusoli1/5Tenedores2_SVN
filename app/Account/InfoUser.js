import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from 'react-native-elements';
import firebase from "firebase";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings(["Setting a timer"]); //con esto oculto los warning de time out
export default function InfoUser(props){
    const {userInfo: {uid , displayName , email , photoURL},
        setReloadData,
        toastRef,
        setIsLoading,
        settextLoading
    } = props;

    const changeAvatar= async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === "denied"){
            toastRef.current.show("Sin acceso a la galeria, verificar los permisos de la aplicacion");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, aspect: [4,3]
            });
            if (result.cancelled) {
                toastRef.current.show("Has cerrado la galeria");
            } else {
                uploadImage(result.uri , uid).then(() => {
                    updatePhotoUrl(uid);
                });
            }
        }
    };

    const uploadImage = async (uri , nameImage) => {
        setIsLoading(true);
        settextLoading("Actualizando avatar");
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
        return ref.put(blob);
    };

    const updatePhotoUrl = uid => {
        firebase
            .storage()
            .ref(`avatar/${uid}`)
            .getDownloadURL()
            .then(async result => {
                const update = {
                photoURL: result
            };
            await firebase.auth().currentUser.updateProfile(update);
            setReloadData(true);
            setIsLoading(false);
        })
        .catch(() => {
            toastRef.current.show("Error al recuperar el avatar");
        })
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.avatarUserInfo}
                source={{uri: photoURL ? photoURL : photoURL}}
            />
            <View>
                <Text style={styles.textdisplayName}> 
                    {displayName ? displayName : "Anonimo"} 
                </Text>
                <Text style={styles.textdisplayName}> 
                    {email ? email : " "} 
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        //flex:0,
        //alignItems:"center",
        //justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"black",
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10
    },
    avatarUserInfo:{
        marginRight:10,
    },
    textdisplayName:{
        fontWeight:"bold",
        fontSize:15,
        marginBottom:5,
        //textAlign:"center",
        color:"white"
    }
    // inputForm:{
    //     width:"100%",
    //     marginTop:10
    // },
    // iconRight:{
    //     color:"#c1c1c1"
    // },
    // btnContainerRegister:{
    //     marginTop:20,
    //     width:"100%",
    //     borderRadius: 10
    // },
    // btnRegister:{
    //     backgroundColor:"#00a680",
    //     borderRadius: 10
    // }
})