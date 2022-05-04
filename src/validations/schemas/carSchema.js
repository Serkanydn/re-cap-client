import * as Yup from 'yup'


const carSchema = Yup.object({
    BrandId: Yup.number().required("Boş kalamaz"),
    ColorId: Yup.number().required("Boş kalamaz"),
    ModelYear: Yup.string().required("Boş kalamaz"),
    DailyPrice: Yup.number().required("Boş kalamaz"),
    Description: Yup.string().required("Boş kalamaz"),
    //Images: Yup.array().required("En az 1 adet resim seçmelisiniz"),
})

export default carSchema;