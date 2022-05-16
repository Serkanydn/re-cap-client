import axios from 'axios'
import { baseUrl } from './projectUrls'

export default class ColorService {

    getColors() {
        return  axios.get(`${baseUrl}/colors/getall`);
    }

    add(color) {
        return axios.post(`${baseUrl}/colors/add`, color);
    }

    update(color) {
        return axios.post(`${baseUrl}/colors/update`, color);
    }

    delete(color) {
        return axios.post(`${baseUrl}/colors/delete`,color);
    }

}