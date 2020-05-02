import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View } from "react-native";
import { Button } from "react-native";
import * as firebase from 'firebase';
import InfoUser from "../../Account/InfoUser";
import Toast from 'react-native-easy-toast';
import Loading from "../../components/Loading";
import AccountOptions from "../../Account/AccountOptions";

export default function Userlogged(){
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const toastRef = useRef();
    const [isLoading , setIsLoading] = useState(false);
    const [textLoading , settextLoading] = useState("");

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        
        setReloadData(false)
    },[reloadData]);

    return(
        <View style={styles.viewUserInfo}>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef} setIsLoading={setIsLoading} settextLoading={settextLoading}/>
            <AccountOptions userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
            <Button
                title="Cerrar sesion"
                //style={styles.btnContainerRegister}
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionText}
                onPress={()=> firebase.auth().signOut()}
            />
            <Toast ref={toastRef} 
                    //position="center" 
                    //opacity={0.5} 
                    style = {{backgroundColor : 'white' }}
                    textStyle = {{color : 'black' }}
                    position = 'top' />
            <Loading text={"Actualizando avatar"} isVisible={isLoading}/>
        </View>

    )
}

const styles = StyleSheet.create({
    viewUserInfo:{
        flex:1,
        //alignItems:"center",
        //justifyContent:"center",
        //flexDirection:"row",
        backgroundColor:"black",
        paddingLeft:10,
        paddingTop:10,
        paddingBottom:10
    },
    btnCloseSession:{
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop:10,
        paddingBottom:10
    },
    btnCloseSessionText:{
        color:"#00a680"
    }
//     viewUserInfo1:{
//        minHeight:"100%",
//        backgroundColor:"#f2f2f2"
//     }
    })