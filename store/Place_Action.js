import * as FileSystem from "expo-file-system";
import vars from "../env";

import {setPlace, getPlaces} from "../Helpers/db";
export const ADD_PLACE = 'ADD_PLACE'
export const IMPORT_DB = 'IMPORT_DB'

export const addPlace = (title, image, location) => {
    return async dispatch => {
        // any async code you want!
        const folderName = image.split('/').pop() ;
        const newPath = FileSystem.documentDirectory + folderName ;

        const response1 = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${vars.googleApiKey}`)


        if (!response1.ok){

            throw new Error('something wrong with you');
        }
        const resData = await response1.json();

        const address = resData.results[0].formatted_address;
        console.log(address);

        try {
             await FileSystem.moveAsync({
                 from : image,
                 to : newPath
             })
             const response = await setPlace(title, newPath, address, location.lat, location.lng);
             dispatch({type: ADD_PLACE, PlaceInfo : {id : response.insertId, title : title, imageUri : newPath, address, infoAddress : {lat : location.lat, lng : location.lng} }});

         }catch (err) {
             console.log(err);
             throw err;
         }

    };

}

export const importData = () => {
    return async dispatch => {
        // any async code you want!

         try {
             const db = await getPlaces();
             dispatch({type: IMPORT_DB, Places : db.rows._array});

         }catch (err) {
             console.log(err);
             throw err;
         }

    };

}

