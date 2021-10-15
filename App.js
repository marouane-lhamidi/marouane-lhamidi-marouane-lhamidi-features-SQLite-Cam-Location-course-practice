import React from 'react';
import { Provider} from 'react-redux';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'


import NavigationApp from "./Navigation/PlacesNavigator";
import PlaceReducer from "./store/Place-Reducer";
import { Init } from "./Helpers/db";

Init().then(() =>{
    console.log('Resolve DataBase')
}).catch(err => {
    console.log('Reject DataBase')
    console.log(err)
})

const root_reducer = combineReducers({
  PlaceReducer,
});

const store = createStore(root_reducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
      <Provider store={store}>
        <NavigationApp/>
      </Provider>
  );
}

