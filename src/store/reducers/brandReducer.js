import { SET_BRANDS } from "../actions/brandActions";
import { brands } from "../initialValues/brands";

const initialState = {
    brands: brands
}

export default function brandReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_BRANDS:
            return {
                brands: [...payload]
            }

        default:
            return state;

    }
}