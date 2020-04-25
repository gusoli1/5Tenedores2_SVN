import React from 'react';
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props){
    const {isVisible, setIsVisible, children}= props;
    const closeModal = () => setIsVisible(false);

    return (
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor = "rgba(0, 0, 0, .5)"
            overlayBackgroundColor = "transparent"
            overlayStyle = {styles.overlay}
            onBackdropPress = {closeModal}
        >
            {children? children : <View><Text>Waiting for Data</Text></View>}
        </Overlay>
    )
}

const styles = StyleSheet.create ({
    overlay :{
        backgroundColor:"#fff",
        height:"auto",
        width:"90%",
        //backgroundColor:"transparent",
        //flex:1,
        //width:"90%",
        //height:"45%",
        //alignContent:"center"
    }
});