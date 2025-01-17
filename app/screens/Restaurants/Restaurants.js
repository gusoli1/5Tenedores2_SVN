import React, {useEffect, useState} from 'react';
import { StyleSheet , View , Text} from "react-native";
import ActionButton from 'react-native-action-button';
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore" ;
import ListRestaurants from '../../components/Restaurants/ListRestaurants';
const db = firebase.firestore(firebaseApp);

export default function Restaurants (props) {
    const {navigation} = props;
    const [user , setUser] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [startRestaurants, setStartRestaurants] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [totalRestaurants, setTotalRestaurants] = useState(0);
    const limitRestaurants = 8;
    const [isReloadRestaurants, setIsReloadRestaurants] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });
    }, []);

    useEffect(() => {
        db.collection("Restaurants")
            .get()
            .then(snap => {
                setTotalRestaurants(snap.size);
        });

        (async() => {
            const resultRestaurants = [];
            const restaurants = db.collection("Restaurants")
                                    .orderBy("createAt", "desc")
                                    .limit(limitRestaurants)
                                    ;
            
            await restaurants
                    .get()
                    .then(response => {setStartRestaurants(response.docs[response.docs.length -1]);
                
                response.forEach(doc => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push({restaurant});
                });

                setRestaurants(resultRestaurants);
            })
        })()
        setIsReloadRestaurants(false);
    }, [isReloadRestaurants])


    const hadleLoadMore = async () =>{
        const resultRestaurants= [];
        restaurants.length < totalRestaurants && setIsLoading(true);

        const restaurantDb = db.collection('restaurants')
                                .orderBy("createAt","desc")
                                .startAfter(startRestaurants.data().createAt)
                                .limit(limitRestaurants)

        await restaurantDb.get().then(response => {
            if(response.docs.length > 0){
                setStartRestaurants(response.docs[response.docs.length -1]);
            } else {
                setIsLoading(false)
            }
            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id =doc.id;
                resultRestaurants.push({restaurant});
            });

            setRestaurants([...restaurants, ...resultRestaurants]);
        });
    };

    return(
        <View style={styles.viewBody}>
            <ListRestaurants 
                restaurants={restaurants}
                isLoading={isLoading}
                hadleLoadMore={hadleLoadMore}
                navigation= {navigation}
            />
            {user && <AddRestaurantButton navigation={navigation} setIsReloadRestaurants={setIsReloadRestaurants}/>}
        </View>
    );
}

function AddRestaurantButton(props) {
    const {navigation, setIsReloadRestaurants} = props;
    
    return(
        <ActionButton
            buttonColor="#00a680"
            onPress={() => navigation.navigate("AddRestaurant", {setIsReloadRestaurants})}
        />
    );
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor: "black"
    }
})