import React , {useState , useEffect} from 'react';
import { StyleSheet , View , Text , ScrollView , Alert , Dimensions} from 'react-native';
import { Icon , Avatar , Image , Input , Button } from "react-native-elements";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import MapView from "react-native-maps";
import Modal from "../../components/Modal";
import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore" ;

const db = firebase.firestore(firebaseApp);
const WidthScreen = Dimensions.get("window").width;
const HeightScreen = Dimensions.get("window").height;

export default function AddRestaurantForm (props){
    const { toastRef, setIsLoading, navigation, setIsReloadRestaurants} = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantDescription, setRestaurantDescription] = useState("");
    const [isVisibleMap, setIsVisibleMap] = useState(false);
    const [locationRestaurant, setLocationRestaurant] = useState(null);
    
    const addRestaurant= () => {
        if (!restaurantName || !restaurantDescription || !restaurantAddress) {
            toastRef.current.show("Todos los campos son obligatorios")
        } else if (imagesSelected.length === 0) {
                toastRef.current.show("Falta agregar una foto del restaurante")
            } else if (!locationRestaurant) {
                toastRef.current.show("Debe agregar la geolocalizacion")
            } else {
                setIsLoading(true);
                UploadImageStorage(imagesSelected)
                    .then(arrayImages => {
                        db.collection("Restaurants")
                            .add({name: restaurantName,
                                    address: restaurantAddress,
                                    description: restaurantDescription,
                                    location: locationRestaurant,
                                    images: arrayImages,
                                    rating: 0,
                                    ratingTotal: 0,
                                    quantityVoting: 0,
                                    createAt: new Date(),
                                    createBy: firebaseApp.auth().currentUser.uid
                            })
                        .then(() => {setIsLoading(false);
                                    setIsReloadRestaurants(true);
                                    navigation.navigate("Restaurants");
                        })
                        .catch(error => {console.log(error);
                                        console.log("Errorrrrrr!!!!!")
                                        setIsLoading(false);
                                        toastRef.current.show("Error al subir el restaurante");
                        });
                });
            }
    };

    const UploadImageStorage = async imageArray => {
        const imagesBlob = [];
        await Promise.all(imageArray.map(async image => 
                                            {const response = await fetch(image);
                                            const blob = await response.blob();
                                            const ref = firebase
                                                    .storage()
                                                    .ref("restaurant-images")
                                                    .child(uuid());
                                            await ref.put(blob).then(result => {
                                                imagesBlob.push(result.metadata.name)
                                            })
                                           }
                                        )
                        )
        return imagesBlob;
    };

    return( 
        <ScrollView>
            <ImageRestaurant 
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd 
                setRestaurantName={setRestaurantName} 
                setRestaurantAddress={setRestaurantAddress} 
                setRestaurantDescription={setRestaurantDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage 
                imagesSelected={imagesSelected} 
                setImagesSelected={setImagesSelected}
                toastRef={toastRef}
            />
            <Button
                title={"Crear Restaurante"}
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <Map 
                isVisibleMap={isVisibleMap} 
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    );
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props;
    
    return(
        <View style={styles.viewPhoto}>
            {imageRestaurant ? (
                <Image
                    source={{uri: imageRestaurant}}
                    //style={{width: WidthScreen, height: HeightScreen}}
                    style={{width: WidthScreen, height:200}}
                />
            ) : (
                <Image
                    source={ require("../../../assets/img/no-image.jpg") }
                    style={{width: WidthScreen, height: HeightScreen}}
                    style={{width: WidthScreen, height: 200}}
                />
            )}
        </View>
    );
}

function UploadImage(props){
    const {imagesSelected, setImagesSelected, toastRef} = props;
    
    const imageSelect = async() => {
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionsCamera = resultPermissions.permissions.cameraRoll.status;

        if (resultPermissionsCamera === 'denied') {
            toastRef.current.show("Debe aceptar los permisos para poder continuar.")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,4]
            })
            if (result.cancelled) {
                toastRef.current.show("No se selecciono ninguna imagen")
            } else {
                setImagesSelected([...imagesSelected, result.uri])
            }
        }

    }

    const removeImage = image=> {
        const arrayImage = imagesSelected;

        Alert.alert(
            "Eliminar imagen",
            "Desea eliminiar esta imagen?",
            [
                {
                    text:"Cencel",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress:() => setImagesSelected(arrayImage.filter(imageUrl => imageUrl !== image))
                }
            ],
            {cancelable:false}
        )
    }

    return(
        <View style={styles.viewImages}>

            {imagesSelected.length < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}

            {imagesSelected.map(imageRestaurant => (
                <Avatar
                    key={imageRestaurant}
                    onPress={() => removeImage(imageRestaurant)}
                    style={styles.miniatureStyles}
                    source={{uri: imageRestaurant}}
                />
            ))}
        </View>
    )
}

function FormAdd(props){
    const {
        setRestaurantName, 
        setRestaurantAddress, 
        setRestaurantDescription,
        setIsVisibleMap,
        locationRestaurant
    } = props;
    
    return(
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={e => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Direccion"
                containerStyle={styles.input}
                rightIcon={{
                    type:"material-community",
                    name:"google-maps",
                    color: locationRestaurant ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
                onChange={e => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input
                placeholder="Descripcion de restaurante"
                multiline={true}
                containerStyle={styles.textArea}
                onChange={e => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}
function Map(props){
    const {
        isVisibleMap, 
        setIsVisibleMap, 
        setLocationRestaurant, 
        toastRef
    } = props;
    const [location,setLocation] =useState(null);

    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
            const statusPermissions = resultPermissions.permissions.location.status;

            if (statusPermissions !== "granted") {
                toastRef.current.show("Faltan permisos para acceder a la geolocalizacion")
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])


    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show("Localizacion guardada correctamente");
        setIsVisibleMap(false);
    }

    return(
        
        <Modal
            isVisible={isVisibleMap}
            setIsVisibleMap={setIsVisibleMap}
        >
            <View>
                {location && (
                    <MapView
                        style={styles.MapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={region => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                   <Button
                    title="Guardar ubicacion"
                    onPress={confirmLocation}
                    containerStyle={styles.viewMapBtnContainerSave}
                    buttonStyle={styles.viewmapBtnSave}
                   /> 
                   <Button
                    title="Cancelar"
                    onPress={() => setIsVisibleMap(false)}
                    containerStyle={styles.viewMapBtnContainerCancel}
                    buttonStyle={styles.viewmapBtnCancel}
                   /> 
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create ({
    viewImages:{
        flexDirection:'row',
        marginRight:20,
        marginLeft:20,
        marginTop:30
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight:10,
        height:70,
        width:70,
        backgroundColor:"#e3e3e3"
    },
    miniatureStyles:{
        width:70,
        height:70,
        marginRight:10
    },
    viewPhoto:{
        alignItems:"center",
        height:200,
        marginBottom:20
    },
    viewForm:{
        marginLeft:10,
        marginLeft:10
    },
    input:{
        marginBottom:10
    },
    textArea:{
        height:100,
        width: "100%",
        padding:0,
        margin:0
    },
    MapStyle:{
        width:"100%",
        height:550
    },
    viewMapBtn:{
        flexDirection: "row",
        justifyContent:"center",
        marginTop: 10
    },
    viewMapBtnContainerSave:{
        paddingRight:5
    },
    viewmapBtnSave:{
        backgroundColor:"#00a680"
    },
    viewMapBtnContainerCancel:{
        paddingLeft:5
    },
    viewmapBtnCancel:{
        backgroundColor:"#a60d0d"
    },
    btnAddRestaurant:{
        backgroundColor:"#00a680",
        margin:20
    }
})