import React,{useCallback,useEffect,useState} from 'react';
import {View,StyleSheet,Dimensions,Platform,Text,TouchableOpacity} from 'react-native';
import MapView, {Marker} from "react-native-maps";

import Colors from "../constants/Colors";

const MapScreen = props => {
    const selectedItem = props.navigation.getParam('item')
    const ReadOnly = props.navigation.getParam('readOnly')
    const [newCoordinate, setNewCoordinate] = useState(selectedItem ?{latitude : selectedItem.lat, longitude: selectedItem.lng}: null) ;


    const handlerSaveButton= useCallback(()=>{

        if (!newCoordinate){
            return;
        }
        props.navigation.navigate('NewPlace', {Coordinate : newCoordinate});
    }, [newCoordinate])

    console.log(selectedItem)

    useEffect(()=> {
        props.navigation.setParams({functionSave : handlerSaveButton})
    }, [handlerSaveButton])

    const mapRegion = {
        latitude :selectedItem ? selectedItem.lat :  37.78,
        longitude: selectedItem ? selectedItem.lng : -122.43,
        latitudeDelta : 0.0922,
        longitudeDelta : 0.042
    }
    const handlerEvent = event =>{
        if (!!ReadOnly){
            return;
        }
        setNewCoordinate({
            latitude :  event.nativeEvent.coordinate.latitude,
            longitude : event.nativeEvent.coordinate.longitude
        })
    }

    return (
        <View style={styles.container}>
            <MapView region={mapRegion} style={styles.map} onPress={handlerEvent} >
                {newCoordinate &&<Marker title="Piked Location" coordinate={newCoordinate}/>}
            </MapView>
        </View>
    );
};
MapScreen.navigationOptions = navData=>{
    const aidFunction = navData.navigation.getParam('functionSave');
    const ReadOnly = navData.navigation.getParam('readOnly');
    if (!!ReadOnly){
        return ;
    }
    return {
        headerRight:() =>
            <TouchableOpacity style={styles.touch} onPress={aidFunction}>
                <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    touch : {
      marginVertical : 10,
        marginHorizontal : 20
    },
    saveButton : {
        fontSize : 16,
        color : Platform.OS === 'ios' ? Colors.primary : 'white'
    }

});

export default MapScreen;