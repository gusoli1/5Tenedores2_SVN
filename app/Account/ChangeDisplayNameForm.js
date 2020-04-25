import React ,{ useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from 'firebase';

export default function ChangeDisplayNameForm(props){
    const {displayName, setIsVisibleModal, setReloadData , toastRef} = props;
    const [newDisplayName, setnewDisplayName] = useState(null);
    const [error, setError]=useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateDisplayName = ()  => {
        setError(null);
        if (!newDisplayName){
            setError("Debe ingresar un nombre");
        } else {
            setIsLoading(true);
            const update = {
                displayName : newDisplayName
            }
            firebase.auth().currentUser.updateProfile(update).then(() => {
                setIsLoading(false);
                console.log("aca2");
                setReloadData(true);
                console.log("aca3");
                toastRef.current.show("Nombre actualizado");
                setIsVisibleModal(false)
            }).catch(() => {
                setError("Error alactualizar el nombre");
                setIsLoading(false);
            })
        }
    }
    
    return(
        <View style={styles.view}>
            <Input
                placeholder="Nombre"
                containerStyle={styles.input}
                placeholderTextColor="grey"
                defaultValue={displayName && displayName}
                onChange={e => setnewDisplayName(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name:"account-circle-outline",
                    color:"#c2c2c2"
                }}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={updateDisplayName}
                loading={isLoading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10
    },
    input:{
        marginBottom:10
    },
    btncontainer:{
        marginTop:20,
        width:"100%"
    },
    btn:{
        backgroundColor:"#00a680"
    }
})