import * as Yup from 'yup'
import { bosKalamaz } from '../../constants/strings'

export const colorAddSchema = Yup.object({
    ColorName: Yup.string().required(bosKalamaz)
})

