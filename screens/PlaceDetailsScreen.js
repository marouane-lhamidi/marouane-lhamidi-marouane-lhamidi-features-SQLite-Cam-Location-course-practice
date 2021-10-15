import React from 'react';
import {View,Text,StyleSheet,Platform,ScrollView,Image} from 'react-native';
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import HeaderNewButton from "../componenets/HeaderButton";
import MapPreview from "../componenets/MapPreview";
import Colors from "../constants/Colors";

const PlaceDetailsList = props => {
    const selectedItem = props.navigation.getParam('item');


    const mapHandler = () =>{
        props.navigation.navigate('Map', {readOnly : true, item : {lat : selectedItem.lat, lng : selectedItem.lng}})
    }
    return(
        <ScrollView contentContainerStyle={{alignItems : 'center'}}>
            <Image source={{uri : selectedItem.imageUri}} style={styles.image}/>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedItem.address}</Text>
                </View>
                <MapPreview
                    location={{lat: selectedItem.lat,lng: selectedItem.lng}}
                    style={styles.mapPreview}
                    onPress={mapHandler}
                />
            </View>
        </ScrollView>
    )
};


PlaceDetailsList.navigationOptions = navData=>{
    const title = navData.navigation.getParam('item').title

    return {
        headerTitle: title

    }
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default PlaceDetailsList;