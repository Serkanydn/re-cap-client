import axios from 'axios'
import { baseUrl } from './projectUrls'

export default class CarImageService {

    add(Images) {
        const formData = new FormData();
        Images.forEach(image => {
            formData.append("Images", image);
        });


        return axios.post(`${baseUrl}/carImages/addrange`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }

        })

    }


} 