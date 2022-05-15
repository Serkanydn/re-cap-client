import { brands } from "../initialValues/brands"

export const SET_BRANDS="SET_BRANDS"

export function setBrands(){

    return{
        type:SET_BRANDS,
        payload:brands
    }
}