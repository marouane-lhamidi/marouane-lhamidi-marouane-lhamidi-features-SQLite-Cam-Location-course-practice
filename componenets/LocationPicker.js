import React,{useEffect,useState} from 'react';
import {View,Button,TouchableOpacity,Text,StyleSheet,Alert,ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import MapPreview from "./MapPreview";

const LocationPicker = props => {
    const [location, setLocation] = useState();
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const ele = props.navigation.getParam('Coordinate');


    useEffect(()=>{
        if (!!ele){
            setLocation({
                lat : ele.latitude,
                lng : ele.longitude
            })
            props.Locationtaken({
                lat : ele.latitude,
                lng : ele.longitude
            })
        }

    },[ele])

    const OpenMap = () =>{
        props.navigation.navigate('Map',{item : location});
    }

    const takeImageHandler = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        try {
            setIsLoading(true)
            let location = await Location.getCurrentPositionAsync({
                timeout : 5000,
            });
            setLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
            props.Locationtaken({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });
        }catch (err) {
            Alert.alert(
                'could not fetch location',
                'you should try later',
                [{text : 'Okay'}]
            )
        }
        setIsLoading(false)
    };


    return (
        <View style={styles.imagePicker}>
            <View  style={styles.touch}>
                <MapPreview style={styles.imagePreview} location={location} onPress={OpenMap}>
                    {isLoading ? <ActivityIndicator size="large" color={Colors.primary}/> : <Text>Hello</Text>}
                </MapPreview>
            </View>
            <View style={styles.button}>
                <Button
                    title="Get Location"
                    onPress={takeImageHandler}
                />
                <Button title="Open Map" onPress={OpenMap}/>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    touch : {
        width : '100%'
    },
    imagePreview: {
        width: '100%',
        height: 150,
        marginVertical: 10,
        borderColor: '#ccc',
        borderWidth: 1
    },
    button : {
        marginVertical: 10,
        width : '60%',
        flexDirection : "row",
        justifyContent  : 'space-between'
    }
});

export default LocationPicker;