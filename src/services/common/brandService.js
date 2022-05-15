import axios from 'axios';
import { baseUrl } from './projectUrls';

export default class BrandService {

    getBrands() {
        return axios.get(`${baseUrl}/brands/getall`);
    }

    add(brand) {
        return axios.post(`${baseUrl}/brands/add`, brand);
    }

    update(brand) {
        return axios.put(`${baseUrl}/brands/update`, brand);
    }

    delete(brand) {
        return axios.delete(`${baseUrl}/brands/delete/${brand.id}`);
    }


}