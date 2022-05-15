import { createStoreHook } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk"
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))
export function configureStore() {
    return createStore(
        rootReducer,
        composedEnhancer
    );
}