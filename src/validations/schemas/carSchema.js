import * as Yup from 'yup'

import { bosKalamaz, enAz1AdetResimSecmelisiniz } from '../../constants/strings'

export const carAddSchema = Yup.object({
    BrandId: Yup.number().required(bosKalamaz),
    ColorId: Yup.number().required(bosKalamaz),
    ModelYear: Yup.string().required(bosKalamaz),
    DailyPrice: Yup.number().required(bosKalamaz),
    Description: Yup.string().required(bosKalamaz),
    Images: Yup.array().min(1, enAz1AdetResimSecmelisiniz).nullable()
})

export const carUpdateSchema = Yup.object({
    BrandId: Yup.number().required(bosKalamaz),
    ColorId: Yup.number().required(bosKalamaz),
    ModelYear: Yup.string().required(bosKalamaz),
    DailyPrice: Yup.number().required(bosKalamaz),
    Description: Yup.string().required(bosKalamaz),
    Images: Yup.array().min(1, enAz1AdetResimSecmelisiniz).nullable()
})

