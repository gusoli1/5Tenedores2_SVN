import React, {useState, useEffect} from "react";
import { StyleSheet, View, ScrollView ,Text, Dimensions} from "react-native";
import {Rating, ListItem} from "react-native-elements";
import * as firebase from"firebase";
import Carousel from "../../components/Carousel";
import Map from "../../components/Map";
//import MapView from "react-native-maps";
import ListReviews from "../../components/ListReviews";

const screenWidht = Dimensions.get("window").width;

export default function Restaurant (props) {
    const {navigation} = props;
    const {restaurant} = navigation.state.params.restaurant.item;
    const [imageRestaurant, setImageRestaurant] = useState([]);

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

    return(
        <ScrollView style={styles.viewBody}>           
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
            />
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
    }
});