import React,{useCallback,useState} from 'react';
import {View,Text,StyleSheet,TextInput,Button,ScrollView} from 'react-native';
import {useDispatch} from "react-redux";


import Colors from "../constants/Colors";
import * as PlaceActions from "../store/Place_Action"
import ImagePicker from "../componenets/ImagePicker";
import LocationPicker from "../componenets/LocationPicker";

const NewPlaceScreen = props=>{
    const [title, setTitle] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState();
    const dispatch = useDispatch();


    const Imagetaken= (val) => {
        setImage(val);
    }
    const Locationtaken = useCallback((val)=>{
        setLocation(val);
    }, [location])

    const onPressHandler = () =>{

        dispatch(PlaceActions.addPlace(title, image, location));
        props.navigation.goBack();
    }


    const changeText= (val) => {
        setTitle(val);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={changeText} value={title}/>
                <ImagePicker Imagetaken={Imagetaken} />
                <LocationPicker navigation={props.navigation} Locationtaken={Locationtaken} />
                <View style={styles.button}>
                    <Button title="save Place" color={Colors.primary} onPress={onPressHandler} />
                </View>
            </View>
        </ScrollView>
    )
};

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}
const styles = StyleSheet.create({
    form : {
        margin : 20,
    },
    label : {
        fontSize : 15,
        marginTop : 15,
        paddingVertical : 10,
        paddingHorizontal:  5,
    },
    textInput : {
        marginTop : 15,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1,
        marginBottom : 30
    }
})

export default NewPlaceScreen;