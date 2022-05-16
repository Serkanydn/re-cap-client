export const SET_BRANDS="SET_BRANDS"

export function setBrands(brands){

    return{
        type:SET_BRANDS,
        payload:brands
    }
}