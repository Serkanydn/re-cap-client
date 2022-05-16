import { SET_COLORS } from "../actions/colorActions";
import {colors} from "../initialValues/color"

const initialValues = {
    colors: colors
}


export default function colorReducer(state = initialValues, { type, payload }) {
    switch (type) {
        case SET_COLORS:
            return {
                ...state,
                colors: payload
            }
        default:
            return state;
    }

}
