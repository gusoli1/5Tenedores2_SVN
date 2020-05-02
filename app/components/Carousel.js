import React from "react";
import {StyleSheet, View} from "react-native";
import {Image} from "react-native-elements";
import Courusel from "react-native-banner-carousel";

export default function CarouselImages (props) {
    const {arrayImage, height, width} = props;

    return(
        <Courusel
            autoplay
            autoplayTimeout={5000}
            loop
            index={0}
            pageSize={width}
            pageIndicatorStyle={styles.indicator}
            activePageIndicatorStyle={styles.insicatorActive}
        >
            {arrayImage.map(urlImage =>(
                <View key={urlImage}>
                    <Image style={{width,height}} source={{url: urlImage}}/>
                </View>
                ))}
        </Courusel>
    )
}

const styles = StyleSheet.create({
    indicator:{
        backgroundColor:"#00a680"
    },
    insicatorActive:{
        backgroundColor:"#00ffc5"
    }
})