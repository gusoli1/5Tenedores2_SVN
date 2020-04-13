import React , {useRef} from 'react';
import { View, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from "../../Account/RegisterForm";
import Toast from "react-native-easy-toast";

export default function Register(){
    const ToastRef = useRef();
    return(
        <KeyboardAwareScrollView style={Styles.keyboardForm}>
            <Image
                source={require("../../../assets/img/1350_fitness_logo.jpg")}
                style={Styles.image}
//                resizeMode="contain"
            />
            <View
                style={Styles.viewForm}>
                <RegisterForm ToastRef={ToastRef}/>
            </View>
            <Toast ref={ToastRef} 
                    style = {{backgroundColor : 'white' }}
                    textStyle = {{color : 'black' }}
                    position = 'top' 
                    positionValue = { 200 }
                    opacity={0.7} 
            />
        </KeyboardAwareScrollView>
    )
}

const Styles = StyleSheet.create({
    image:{
        height:200,
        width:200,
        alignSelf:"center",
        borderRadius:15,
        marginTop:10
    },
    viewForm:{
        marginLeft:0,
        marginRight:0,
        backgroundColor:"black"
    },
    keyboardForm:{
        backgroundColor:"black"
    }
})