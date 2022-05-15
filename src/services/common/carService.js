import axios from 'axios'
import { baseUrl } from './projectUrls'

export default class CarService {

    async getCars() {
        return await axios.get(`${baseUrl}/cars/getall`);
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

    update(car){
        return axios.post(`${baseUrl}/cars/update`, car);
    }
    
    delete(car){
        return axios.post(`${baseUrl}/cars/delete`, car);
    }
    
    getCarDetailDtoById(carId){
        return axios.get(`${baseUrl}/cars/getcardetailsbycarid?carId=${carId}`); 
    }

    

} 