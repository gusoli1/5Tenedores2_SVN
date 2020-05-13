import React, {useState, useEffect, useCallback, useRef} from "react";
import { StyleSheet, View, ScrollView ,Text, Dimensions} from "react-native";
import {Rating, ListItem, Icon} from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from"firebase";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
import ListReviews from "../../components/ListReviews";
import { useFocusEffect } from "@react-navigation/native";

import { firebaseApp } from "../../utils/FireBase";
const db = firebase.firestore(firebaseApp);

const screenWidht = Dimensions.get("window").width;

export default function Restaurant (props) {
    const {navigation} = props;
    const {restaurant} = navigation.state.params.restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState([]);
    const [rating, setRating] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [userLogged, setUserLogged] = useState(false);
    const toastRef = useRef();
    
    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false);
    })

    useEffect(() => {
        const arrayUrls = [];
        (async() => {
            await Promise.all(
                restaurant.images.map(async idImage => {
                    await firebase.storage()
                            .ref(`restaurant-images/${idImage}`)
                            .getDownloadURL()
                            .then(imageUrl => arrayUrls.push(imageUrl));
                })
            )
            setImageRestaurant(arrayUrls);
        })()
    }, [])

    useEffect(() => {        
        if (userLogged && restaurant) {
            db.collection("favorites")
                .where("idRestaurante", "==", restaurant.id)
                .where("idUser","==", firebase.auth().currentUser.uid)
                .get()
                .then((response) => {
                    if (response.docs.length > 0) {
                        setIsFavorite(true);
                    }
                })
        }
    }, [userLogged, restaurant])

const addFavorite = () => {
    
    if (!userLogged) {
        toastRef.current.show("Debe estar logeado")
    } else {
       const payload = {
           idUser: firebase.auth().currentUser.uid,
           idRestaurante: restaurant.id
       }
       db.collection("favorites")
            .add(payload)
            .then(() => {
                setIsFavorite(true);
                toastRef.current.show("Restaurante agregado a favoritos");
       })
       .catch(() => {
        toastRef.current.show("Error al agregar el restaurante a favoritos")
       });
    }
}

const removeFavorite = () => {
    db.collection("favorites")
        .where("idRestaurante", "==", restaurant.id)
        .where("idUser","==", firebase.auth().currentUser.uid)
        .get()
        .then((response) => {
            response.forEach((doc) => {
                const idFavorite = doc.id;
                db.collection("favorites")
                    .doc(idFavorite)
                    .delete()
                    .then(() =>{
                        setIsFavorite(false)
                        toastRef.current.show("El restaurante fue eliminado de favoritos")
                    })
                    .catch(()=>{
                        toastRef.current.show("Error al eliminar el restaurante de favoritos")
                    })
            })
        })
}
    return(
        <ScrollView style={styles.viewBody}>
            <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name= { isFavorite ? "heart" : "heart-outline"}
                    onPress={ isFavorite ? removeFavorite : addFavorite}
                    color={ isFavorite ? "#f00" : "#000"}
                    size={25}
                    underlaycolor="transparent"
                />
            </View>
            <Carousel
                arrayImage={imageRestaurant}
                width={screenWidht}
                height={200}
            />
            <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
            />
            <RestaurantInfo
                location={restaurant.location}
                name={restaurant.name}
                addres={restaurant.address}
            />
            <ListReviews
                navigation={navigation}
                idRestaurant={restaurant.id}
                setRating={setRating}

            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </ScrollView>
    )
}

function TitleRestaurant(props){
    const{ name, description, rating }=props;

    return(
        <View style={styles.viewRestaurantTitle}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.nameRestaurant}>
                    {name}
                </Text>
                <Rating
                    //type='custom'
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                    //ratingColor='black'
                    //ratingBackgroundColor='black'
                    //ratingTextColor='black'
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

function RestaurantInfo(props){
    const {location ,name, address}= props;

    const listInfo =[{
        text: address,
        iconName:"map-marker",
        iconType:"material-community",
        action:null
    }]

    return(
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restarantInfoTitle}>
                Informacion sobre el restaurant
            </Text>
            <Map location={location} name={name} height={100}/>
            {listInfo.map((item, index) => (
                <ListItem
                    key={index}
                    title={item.text}
                    leftIcon={{
                        name: item.iconName,
                        type: item.iconType,
                        color: "#00a680"
                    }}
                    containerStyle={styles.containerListItem}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        //backgroundColor:'black'
    },
    viewRestaurantTitle:{
        margin:15,
        //backgroundColor:'black'
    },
    nameRestaurant:{
        fontSize:20,
        fontWeight: 'bold',
        color:'white'
    },
    rating:{
        position:'absolute',
        right:0
    },
    descriptionRestaurant:{
        marginTop:5,
        color:"grey"
    },
    viewRestaurantInfo:{
        margin:15,
        marginTop:25
    },
    restarantInfoTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:10,
        color:"white"
    },
    containerListItem:{
        borderBottomColor: "#d8d8d8",
        borderBottomWidth:1
    },
    viewFavorite:{
        position:"absolute",
        top:0,
        right:0,
        zIndex:2,
        backgroundColor:"#fff",
        borderBottomLeftRadius:100,
        padding:4,
        paddingLeft:15
    }
});