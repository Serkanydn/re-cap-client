
export const SET_CARS = "SET_CARS"
export const SET_CAR = "SET_CAR"

export function setCars(cars) {
    return {
        type: SET_CARS,
        payload: cars,
    }
}

export function setCar(car) {
    return {
        type: SET_CAR,
        payload: car,
    }
}
