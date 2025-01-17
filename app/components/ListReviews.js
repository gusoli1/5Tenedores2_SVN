import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Button, Avatar, Rating } from "react-native-elements";
import { map } from "lodash";

import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app"
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function ListReviews (props){
    const {navigation, idRestaurant } = props;
    const [userLogged, setUserLogged] = useState(false);
    const [reviews, setReviews] = useState([]);

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    });

    useEffect(() => {
        db.collection("reviews")
            .where("idRestaurant", "==", idRestaurant)
            .get()
            .then((response) => {
                const resultReview = [];
                response.forEach((doc) => {
                    const data = doc.data();
                    data.id = doc.id;
                    resultReview.push(data);
                });
                setReviews(resultReview);
            })
    }, [])

    return(        
        <View>
            {userLogged ? (
                <Button
                    buttonStyle={styles.btnaddReview}
                    titleStyle={styles.btnTitleAddReview}
                    title="Escribir una opinion"
                    icon={{
                        type:"material-community",
                        name:"square-edit-outline",
                        color:"#00a680"
                    }}
                    onPress={()=>navigation.navigate("AddReviewRestaurant",{idRestaurant: idRestaurant})}
                />
            ) : (
                <Text
                    style={{textAlign:"center", color:"#a00680", padding:20}}
                    onPress={() => navigation.navigate("Login")}
                >
                    Debe lograrse para agregar comentarios{" "}
                    <Text style={{fontWeight:"bold"}}>
                        pulsa AQUI para iniciar sesion
                    </Text>
                </Text>
            )}
            {map(reviews,(review,index) => (
                <Review
                    key={index}
                    review={review}
                />
            ))}

        </View>
    )
}

function Review(props) {
    const { title, review, rating, createAt, avatarUser } = props.review;
    const createReview = new Date(createAt.seconds * 1000);

    return(
        <View style={styles.viewReview}>
            <View style={styles.viewImageAvatar}>
                <Avatar
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={avatarUser ? {uri:avatarUser} : require("../../assets/img/no-image.jpg")}
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>
                   {title}
                </Text>
                <Text style={styles.reviewText}>
                    {review}
                </Text>
                <Rating
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.reviewDate}>
                    {createReview.getDate()}/
                    {createReview.getMonth() + 1}/ 
                    {createReview.getFullYear()}- 
                    {createReview.getHours()}:
                    {createReview.getMinutes() < 10 ? "0" : ""}{createReview.getMinutes()}
                </Text>
            </View>
        </View>
    )
}
                
const styles =StyleSheet.create({
    btnaddReview:{
        backgroundColor:"transparent"
    },
    btnTitleAddReview:{
        color:"#00a680"
    },
    viewReview:{
        flexDirection:"row",
        padding:10,
        paddingBottom:20,
        borderBottomColor:"#e3e3e3",
        borderBottomWidth:1
    },
    viewImageAvatar:{
        marginRight:15
    },
    imageAvatarUser:{
        width:40,
        height:40
    },
    viewInfo:{
        flex:1,
        alignItems:"flex-start"
    },
    reviewTitle:{
        fontWeight:"bold"
    },
    reviewText:{
        padding:2,
        color:"grey",
        marginBottom:5
    },
    reviewDate:{
        marginTop: 5,
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right:0
    }
})