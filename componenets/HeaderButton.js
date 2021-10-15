import React from 'react';
import {HeaderButton} from "react-navigation-header-buttons";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from "../constants/Colors";
import {Platform} from "react-native";

const HeaderNewButton = props => {
    return(
        <HeaderButton
            {...props}
            iconSize={23}
            IconComponent={Icon}
            color={ Platform.OS === 'ios' ? Colors.primary : 'white'}

        />
    )
};


export default HeaderNewButton;