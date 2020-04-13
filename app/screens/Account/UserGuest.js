import React from 'react';
import { StyleSheet , ScrollView , Image , View, Text } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";

function UserGuest(props){
    const {navigation} =props;

    return(
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image
                source={require("../../../assets/img/1350_fitness_logo.jpg")}
                style={styles.image}
            />
            <Text style={styles.title}>
                Consulta tu perfil
            </Text>
            <Text style={styles.desription}>
                Descripcion del perfil o algo.
            </Text>
            <View style={styles.viewBtn}>
                <Button 
                    buttonStyle={styles.BtnStyle}
                    containerStyle={styles.BtnContainer}   
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate("Login")}
            />
            </View>
        </ScrollView>
    )
}

export default withNavigation(UserGuest);

const styles = StyleSheet.create({
    viewBody:{
        marginLeft:0,
        marginRight:0,
        backgroundColor:"black"
    },
    image:{
        height:200,
        width:200,
        alignSelf:"center",
        borderRadius:15
        },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center",
        color:"white"
    },
    desription:{
        textAlign:"center",
        justifyContent:"center",
        marginBottom:10,
        color:"white"
    },
    viewBtn:{
        flex: 1,
        alignItems:"center"
    },
    BtnStyle:{
        backgroundColor:"#00a680",
        height: 40,
        //borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10,
        marginBottom: 0
    },
    BtnContainer:{
        width:"100%"
    }
})