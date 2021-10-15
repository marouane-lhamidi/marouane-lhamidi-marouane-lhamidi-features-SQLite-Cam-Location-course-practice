import React from 'react';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';


import PlacesList from "../screens/PlacesList";
import MapScreen from "../screens/MapScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceDetailsList from "../screens/PlaceDetailsScreen";
import {Platform} from "react-native";
import Colors from "../constants/Colors";



const NavigationApp = createStackNavigator({
    Places : PlacesList,
    Map : MapScreen,
        NewPlace : NewPlaceScreen,
    Place : PlaceDetailsList
}, {
    defaultNavigationOptions:{
        headerStyle : {
            backgroundColor : Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor : Platform.OS === 'ios' ? Colors.primary : 'white'
    }
})



export default createAppContainer(NavigationApp);