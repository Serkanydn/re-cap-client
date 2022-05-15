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

    addByCarId(Images,carId) {
        const formData = new FormData();
        formData.append("CarId", carId);
        Images.forEach(image => {
            formData.append("Images", image);
        });

        return axios.post(`${baseUrl}/carImages/addrangebycarid`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        })
    }

    delete(image) {
        const formData = new FormData();
        formData.append("Id", image);
        return axios.post(`${baseUrl}/carImages/delete`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'

            }
        })
    }
} 