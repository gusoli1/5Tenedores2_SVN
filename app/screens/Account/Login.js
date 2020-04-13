import React, {useRef} from 'react';
import { View, Text , StyleSheet,ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import LoginForm from "../../Account/LoginForm";
import Toast from "react-native-easy-toast";
import LoginFacebook from "../../Account/LoginFacebook";

export default function Login(props){
    const {navigation}= props;
    const ToastRef = useRef();

    return(
        <ScrollView style={Styles.viewBody}>
            <Image
                source = {require("../../../assets/img/1350_fitness_logo.jpg")}
                style= {Styles.image}
                />
            <View style={Styles.viewContainer}>
                <LoginForm ToastRef={ToastRef}/>
                <CreateAccount navigation={navigation}/>
            </View>
            <Divider style={Styles.Divider}/>
            <View style={Styles.viewContainer}>
                <LoginFacebook ToastRef={ToastRef} navigation={navigation}/>
            </View>
            <Toast ref={ToastRef} 
                    style = {{backgroundColor : 'white' }}
                    textStyle = {{color : 'black' }}
                    position = 'top' 
                    //positionValue = { 200 }
                    //opacity={0.7} 
            />
        </ScrollView>
    )
}

function CreateAccount(props){
    const {navigation} =props;
    return(
        <Text style={Styles.textRegister}>
            ¿Aun no tienes una cuenta?  
            <Text style={Styles.btnRegister}
                onPress={() => navigation.navigate("Register")}>
                Registrarte
            </Text>
        </Text>
    )
}

const Styles =StyleSheet.create({
    viewBody:{
        marginLeft:0,
        marginRight:0,
        backgroundColor:"black"
    },
    image:{
        height:200,
        width:200,
        alignSelf:"center",
        borderRadius:15,
        marginTop:10
    },
    textRegister:{
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        color:"grey"
    },
    btnRegister:{
        color:"#00a680",
        fontWeight:"bold"
    },
    BtnStyle:{
        backgroundColor:"#00a680",
        height: 40,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 0
    },
    viewContainer:{
        marginLeft:0,
        marginRight:0,
    },
    Divider:{
        backgroundColor:"#00a680",
        margin:15
    }
})