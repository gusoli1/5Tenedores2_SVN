import React , {useState} from 'react';
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { Modal } from "../components/Modal";

export default function AccountOptions () {
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const menuOptions = [
        {
            title:"Cambiar nombre y apellido",
            iconType:"material-community",
            iconNameLeft: "account-circle",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            //onPress:()=>console.log("Change DisplayName")
            onPress:()=>selectedComponent()
        },
        {
            title:"Cambiar Email",
            iconType:"material-community",
            iconNameLeft: "at",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:()=>console.log("Change Email")
        },
        {
            title:"Cambiar Contraseña",
            iconType:"material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress:()=>console.log("Change password")
        }
    ];

    const selectedComponent=() => {
        setIsVisibleModal(true);
    };

    return(
        <View>
            {menuOptions.map((menu, index) => (
                <ListItem
                    key={index}
                    title={menu.title}
                    leftIcon={{
                        type: menu.iconType,
                        name: menu.iconNameLeft,
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType,
                        name: menu.iconNameRight,
                        color: menu.iconColorRight
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}
            <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                <View>
                    <Text>
                        Estoy dentro del modal
                    </Text>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3"
    }
})