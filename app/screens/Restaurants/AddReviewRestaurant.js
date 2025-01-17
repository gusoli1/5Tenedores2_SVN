import React , {useState, useRef} from 'react';
import { StyleSheet, View, Text } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from '../../components/Loading';

import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

//falta actualizar las estrellas cuando hago goBack
//Los videos cambiaron respecto al desarrollo realizado

export default function AddReviewRestaurant(props){
    const { navigation } = props;
    const { idRestaurant } = navigation.state.params;
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [review, setReview] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const toastRef = useRef();

    const addReview = () => {
        if (!rating) {
            toastRef.current.show("Debe completar la puntuacion")
        } else if (!title) {
            toastRef.current.show("Debe completar el titulo")
        } else if (!review) {
            toastRef.current.show("Debe completar el comentario")
        } else {
            const user = firebase.auth().currentUser;
            
            const paylod = {
                idUser: user.uid,
                avatarUser: user.photoURL,
                idRestaurant: idRestaurant,
                title: title,
                review: review,
                rating: rating,
                createAt: new Date()
            }

            db.collection("reviews")
                .add(paylod)
                .then(() => {
                    setIsLoading(false);
                })
                .catch(() => {
                    toastRef.current.show("Error al subir el comentario")
                    setIsLoading(false);
                })
            
            updateRestaurant();
        }
    }

    const updateRestaurant = () => {
        const restaurantRef = db.collection("Restaurants").doc(idRestaurant);

        restaurantRef.get().then((response) => {
            const restaurantData = response.data();
            const ratingTotal = restaurantData.ratingTotal + rating;
            const quantityVoting = restaurantData.quantityVoting + 1;
            const ratingResult = ratingTotal / quantityVoting;

            restaurantRef.update({
                rating: ratingResult,
                ratingTotal: ratingTotal,
                quantityVoting: quantityVoting
            }).then(() => {
                setIsLoading(false);
                navigation.goBack();
            })
        })
    }

    return(
        <View style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={["Pesimo","Deficiente","Normal","Muy bueno","Excelente"]}
                    defaultRating={0}
                    size={25}
                    onFinishRating={(value) => {setRating(value)}}
                />
            </View>
            <View style={styles.formReview}>
                <Input
                    placeholder="Titulo"
                    containerStyle={styles.input}
                    onChange={(evento) => setTitle(evento.nativeEvent.text)}
                />
                <Input
                    placeholder="Comentario"
                    multiline={true}
                    inputContainerStyle={styles.textArea}
                    onChange={(evento) => setReview(evento.nativeEvent.text)}
                />
                <Button
                    title={"Enviar comentario"}
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast 
                ref={toastRef}
                postition={"center"}
                opacity={0}
            />
            <Loading isVisible={isLoading} text={"Enviando comentario"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    },
    viewRating:{
        height:110,
        backgroundColor:"#f2f2f2"
    },
    formReview:{
        flex:1,
        alignItems:"center",
        margin:10,
        marginTop:40
    },
    input:{
        marginBottom:10
    },
    textArea:{
        height:150,
        width:"100%",
        padding:0,
        margin:0
    },
    btnContainer:{
        flex:1,
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%"
    },
    btn:{
        backgroundColor:"#00a680",
    }
})