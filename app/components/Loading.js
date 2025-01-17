import React from 'react';
import { StyleSheet , View , Text , ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Loading(props) {
    const {isVisible , text} = props;
    return(
        <Overlay
            isVisible = {isVisible}
            windowBackgroundColor = "rgba(0,0,0,0.5)"
            overlayBackgroundColor = "transparent"
            overlayStyle = {styles.overlay}
        >
            <View styles={styles.view}>
                <ActivityIndicator size= "large" color="#00a680"/>
                {text && (<Text style={styles.text}>{text}</Text>)}
            </View>
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width:"auto",
        height:"auto",
        backgroundColor:"#fff",
        borderColor:"#00a680",
        borderWidth:1,
        borderRadius:10
    },
    view:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    text:{
        color:"#00a680",
        textTransform:"uppercase",
        marginTop:10
    }
})