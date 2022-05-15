import * as Yup from 'yup'


export const carAddSchema = Yup.object({
    BrandId: Yup.number().required("Boş kalamaz"),
    ColorId: Yup.number().required("Boş kalamaz"),
    ModelYear: Yup.string().required("Boş kalamaz"),
    DailyPrice: Yup.number().required("Boş kalamaz"),
    Description: Yup.string().required("Boş kalamaz"),
    Images: Yup.array().min(1,"En az 1 resim seçmelisiniz.").nullable()
})

export const carUpdateSchema = Yup.object({
    BrandId: Yup.number().required("Boş kalamaz"),
    ColorId: Yup.number().required("Boş kalamaz"),
    ModelYear: Yup.string().required("Boş kalamaz"),
    DailyPrice: Yup.number().required("Boş kalamaz"),
    Description: Yup.string().required("Boş kalamaz"),
    Images: Yup.array().min(1,"En az 1 resim seçmelisiniz.").nullable()
})

 