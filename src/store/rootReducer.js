//tüm stateleri topladığımız yer
//reducerleri uygulamaya tanıtmamız gerekiyor
//Bizde tüm reducerları tek bir yerden ekleyip o şekilde tanıtacağız.
import { combineReducers } from "redux";
import brandReducer from "./reducers/brandReducer";
import carReducer from "./reducers/carReducer";

//combine birleştirmek demek
const rootReducer=combineReducers({
    carReducer:carReducer,
    brandReducer:brandReducer
})

export default rootReducer;//Bu şekilde başka yerlerden erişilecek hale getiriyoruz.