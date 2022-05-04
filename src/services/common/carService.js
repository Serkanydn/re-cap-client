import axios from 'axios'
import { baseUrl } from './projectUrls'

export default class CarService {

    getCars() {
        return axios.get(`${baseUrl}/cars/getall`);
    }

    getCarDetailDtos() {
        return axios.get(`${baseUrl}/cars/getcardetaildtos`);
    }

    add(car) {
        return axios.post(`${baseUrl}/cars/add`, car);

        // return axios({
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     url: `${baseUrl}/cars/add`,
        //     data: car
        // });
    }


} 