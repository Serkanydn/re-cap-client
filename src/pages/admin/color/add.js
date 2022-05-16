//Reeac
import React from 'react'
//Formik
import { Formik, Form, Field, useFormik, useFormikContext, ErrorMessage } from 'formik';
//CustomElements
import SnTextInput from '../../../components/CustomElements/SnTextInput';
//Schemas
import { colorAddSchema } from '../../../validations/schemas/colorShema';
//Services
import ColorService from '../../../services/common/colorService';

import { ToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/toastrService';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setColors } from '../../../store/actions/colorActions'



const initialValues = {
    ColorName: ''
}
export default function Add() {

    const dispatch = useDispatch()
    
    const getColors = (colorService) => {
        colorService.getColors().then((response) => {
            dispatch(setColors(response.data.data))
        })
    }

    const addColor = (color) => {
        const toastrService = new ToastrService()
        const colorService = new ColorService()
        colorService.add(color).then((response) => {
            toastrService.message(response.data.message,"Başarılı",ToastrMessageType.success)
            getColors(colorService)
        })
        .catch((error)=>{
            toastrService.message(error.response.data.Errors[0].ErrorMessage,"Hata",ToastrMessageType.error)
            console.log(error)
        })
    }

    const handleSubmit = (values) => {
        addColor(values)
    }


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={colorAddSchema}
            onSubmit={handleSubmit}

        >
            {(formik) => (
                <Form>
                    <div className="md:grid md:grid-cols-2 md:gap-6 ">
                        <div className="mt-5 md:mt-0 md:col-span-2 ">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Yeni Renk Ekle
                                    </label>
                                    <SnTextInput
                                        type="text"
                                        name="ColorName"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />

                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Ekle
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </Form>
            )}
        </Formik>





    )
}
