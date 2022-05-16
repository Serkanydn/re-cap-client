export const SET_COLORS = 'SET_COLORS'


export function setColors(colors) {
    return {
        type: SET_COLORS,
        payload: colors
    }
}