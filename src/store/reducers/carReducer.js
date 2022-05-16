import { SET_CARS } from "../actions/carActions";
import { SET_CAR } from "../actions/carActions";
import { cars } from "../initialValues/car";
import { car } from "../initialValues/car";

const initialState = {
    cars: cars,
    car: car
}

export default function carReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_CARS:
            return {
                ...state,
                cars: [...payload]
            }
        case SET_CAR:
            return {
                ...state,
                car: {...payload}
            }
        default:
            return state;

    }

}