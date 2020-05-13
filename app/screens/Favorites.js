import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View , Text, FlatList, ActivityIndicator, TouchableOpacity, Alert} from "react-native";
import { Image, Icon, Botton} from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import { firebaseApp } from "../utils/FireBase";
import firebase from 'firebase';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Favorites () {
    const [restaurants, setRestaurants]=useState(null);
    const [userLogged, setUserLogged]=useState(false);
    console.log(restaurants);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useFocusEffect(
        useCallback(() => {
            if (userLogged){
                const idUser = firebase.auth().currentUser.uid;
                db.collection("favorites")
                    .where("idUser",'==',idUser)
                    .get()
                    .then((response) => {
                        const idRestaurantsArray = [];
                        response.forEach((doc) => {
                            idRestaurantsArray.push(doc.data().idRestaurant)
                        })
                        getDataRestaurant(idRestaurantsArray).then((response)=>{
                            const restaurants = [];
                            response.forEach((doc) => {
                                const restaurant = doc.data();
                                restaurant.id = doc.id;
                                restaurants.push(restaurant)
                            })
                            setRestaurants(restaurants)
                        })
                    })
            }
            },[userLogged])
    )

    const getDataRestaurant = (idRestaurantsArray) => {
        const arrayRestaurants = [];
        idRestaurantsArray.forEach((idRestaurant) => {
            const result = db.collection("Restaurants").doc(idRestaurant).get();
            arrayRestaurants.push(result);
        })
        return Promise.all(arrayRestaurants)
    }

    return(
        <View style={{ backgroundColor: "black", flex: 1}}>
            <Text style={{color:"white"}}>
                Estmos en Favoritos
            </Text>
        </View>
    );
}