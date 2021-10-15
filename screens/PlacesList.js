import React, {useEffect} from 'react';
import {StyleSheet,Platform,FlatList} from 'react-native';
import {HeaderButtons,Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";


import HeaderNewButton from "../componenets/HeaderButton";
import PlaceItem from "../componenets/PlaceItem";
import * as PlaceActions from "../store/Place_Action";

const PlacesList = props => {
    const dataPlaces = useSelector(state=> state.PlaceReducer.places);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(PlaceActions.importData());
    }, [dispatch])

    return(
        <FlatList data={dataPlaces} keyExtractor={item=>item.id.toString()}
                  renderItem={dataItem=><PlaceItem image={dataItem.item.imageUri} title={dataItem.item.title} address={dataItem.item.address} onSelect={()=>{
                      props.navigation.navigate('Place',{
                          item: dataItem.item
                      })
                  }}/>}
        />
    )
};
PlacesList.navigationOptions = navData=>{

    return {
        headerTitle:'Places List',
        headerRight:() =>
            <HeaderButtons HeaderButtonComponent={HeaderNewButton}>
                <Item
                    title="Save"
                    iconName={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewPlace')
                    }}
                />
            </HeaderButtons>

    }
}
const styles = StyleSheet.create({})

export default PlacesList;