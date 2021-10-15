import {ADD_PLACE, IMPORT_DB} from "./Place_Action";
import Place from "../models/Place";

const initialisation = {
    places : []
}


const PlaceReducer = (state = initialisation, action) => {
    switch (action.type) {
        case IMPORT_DB :
            return {
                places: action.Places.map(line => new Place(line.id.toString(), line.title, line.imageUri, line.address, line.lat, line.lng))
            }
        case ADD_PLACE :
            const newPlace = new Place(action.PlaceInfo.id , action.PlaceInfo.title, action.PlaceInfo.imageUri, action.PlaceInfo.address, action.PlaceInfo.infoAddress.lat, action.PlaceInfo.infoAddress.lng)
            return {
                places: state.places.concat(newPlace)
            }

        default :
            return state
    }

}

export default PlaceReducer;