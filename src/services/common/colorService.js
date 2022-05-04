import axios from 'axios'
import {baseUrl} from './projectUrls'

export default class ColorService{
    
        async getColors(){
            return  await axios.get(`${baseUrl}/colors/getall`);
        }
    
        add(color){
            return axios.post(`${baseUrl}/colors/add`,color);
        }
    
        update(color){
            return axios.put(`${baseUrl}/colors/update`,color);
        }
    
        delete(color){
            return axios.delete(`${baseUrl}/colors/delete/${color.id}`);
        }
    
}