import React from 'react';
import {View , Text} from "react-native";
import { colors } from 'react-native-elements';

export default function Restaurants () {
    return(
        <View style={{ backgroundColor: "black", flex: 1}}>
            <Text style={{color:"white"}}>
                Estmos en Restaurantes
            </Text>
        </View>
    );
}