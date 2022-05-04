import React, { useEffect, useState } from 'react'
import useTitle from '../../../utilities/useTitle'
import { Link } from 'react-router-dom';

import Select from 'react-select'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

import CarService from '../../../services/common/carService';
import CarImageService from '../../../services/common/carImageService';
import BrandService from '../../../services/common/brandService';
import ColorService from '../../../services/common/colorService';



import { ToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/toastrService';


import { useNavigate } from 'react-router';

import SnSelect from '../../../utilities/CustomElements/SnSelect';
import { Formik, Form, Field, useFormik } from 'formik';
import carSchema from '../../../validations/schemas/carSchema';
import SnTextInput from '../../../utilities/CustomElements/SnTextInput';

const initialValues = {
    Images: null,
    BrandId: '',
    ColorId: '',
    ModelYear: '',
    DailyPrice: '',
    Description: ''


}


export default function Add({ title }) {
    useTitle(title);


    const [selectedImagesPath, setSelectedImagesPath] = useState([])

    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])

    const [schema, setSchema] = useState(carSchema)


    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        setImages(selectedFiles);
    }

    const onDropFile = (event) => {
        const selectedFiles = event.dataTransfer.files;
        setImages(selectedFiles);
    }


    const setImages = (images) => {
        const selectedFilesArray = Array.from(images);
        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })

        setSelectedImagesPath(imagesArray)
    }

    const getBrands = () => {
        let brandService = new BrandService()
        const selectOptions = []
        brandService.getBrands().then(result => {
            result.data.data.map((option) => (
                selectOptions.push({ value: option.id, label: option.brandName || option.colorName })
            ))
        });
        setBrands(selectOptions)
    }
    const getColors = () => {
        let colorService = new ColorService()
        const selectOptions = []
        colorService.getColors().then(result => {
            result.data.data.map((option) => (
                selectOptions.push({ value: option.id, label: option.brandName || option.colorName })
            ))
        });

        setColors(selectOptions)

    }



    const handleSubmit = (values) => {
        const toastrService = new ToastrService()
        const carImageService = new CarImageService()
        const carService = new CarService();
        console.log(values)

        const { Images, ...car } = values

        carService.add(car).then((response) => {
            toastrService.message(response.data.message, "Başarılı", ToastrMessageType.success, ToastrPosition.topRight)
            console.log(Images)
            carImageService.add(Images).then(() => {
                setTimeout(() => { window.location.reload(); }, 2000)
            })
        })






    }

    useEffect(() => {
        getBrands()
        getColors()
    }, [])

    return (
        <>

            <div>
                <h4 className="font-semibold text-xl ">Araç Bilgileri</h4>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
            <div className="mt-10 sm:mt-0">
                <Formik
                    initialValues={initialValues}
                    validationSchema={schema}
                    onSubmit={
                        handleSubmit
                    }
                >
                    {(formik) => (
                        <Form>
                            <div className="md:grid md:grid-cols-2 md:gap-6 ">

                                <div className="mt-5 md:mt-0 md:col-span-2 ">

                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">



                                                    <Select
                                                        options={brands}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("BrandId", e.value)
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                                    <Select
                                                        options={colors}
                                                        onChange={(e) => {
                                                            formik.setFieldValue("ColorId", e.value)
                                                        }} />
                                                </div>


                                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Model Yılı
                                                    </label>
                                                    <SnTextInput
                                                        type="text"
                                                        name="ModelYear"
                                                        autoComplete="street-address"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Günlük Ücret
                                                    </label>
                                                    <SnTextInput
                                                        type="number"
                                                        name="DailyPrice"
                                                        autoComplete="address-level2"
                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                    />
                                                </div>

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-6"
                                                    onDragEnter={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                    }}
                                                    onDragLeave={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                    }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                    }}
                                                    onDrop={e => {
                                                        onDropFile(e)
                                                        formik.setFieldValue("Images", Array.from(e.dataTransfer.files))
                                                    }}

                                                >
                                                    <label className="block text-sm font-medium text-gray-700">Yüklemek istediğiniz resimleri tek seferde seçin.</label>
                                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                                        <div className="space-y-1 text-center">
                                                            <svg
                                                                className="mx-auto h-12 w-12 text-gray-400"
                                                                stroke="currentColor"
                                                                fill="none"
                                                                viewBox="0 0 48 48"
                                                                aria-hidden="true"
                                                            >
                                                                <path
                                                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <div className="flex text-sm relative text-gray-600">
                                                                <label
                                                                    htmlFor="file-upload"
                                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                >
                                                                    <span>Resim yükle</span>
                                                                    <input id="file-upload" name="Images" type="file" className="sr-only" onChange={(e) => {
                                                                        onSelectFile(e)
                                                                        formik.setFieldValue("Images", Array.from(e.target.files))

                                                                    }} multiple accept="image/png image/jpeg, image/jpg" />



                                                                </label>
                                                                <p className="pl-1">or drag and drop</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                        </div>


                                                    </div>



                                                </div>

                                                {selectedImagesPath && selectedImagesPath.map((image, index) => (
                                                    <div className="col-span-1 " key={index}>
                                                        <div className=" relative " >
                                                            <img src={image} className="w-48 h-24" />
                                                            <span className="absolute top-1 right-1 cursor-pointer " onClick={() => setSelectedImagesPath(selectedImagesPath.filter((e) => e !== image))}>
                                                                <FontAwesomeIcon icon={faXmark} className="  w-6 h-6 bg-red-900 text-white rounded" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-6">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Açıklama
                                                    </label>
                                                    <div className="mt-1">
                                                        <SnTextInput
                                                            type="text"

                                                            as="textarea"
                                                            name="Description"
                                                            rows={3}
                                                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"

                                                        />
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Araç için kısa bir açıklama yazın.
                                                    </p>
                                                </div>


                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">


                                            {
                                                (selectedImagesPath.length > 10 ? (
                                                    <p className="error">
                                                        En fazla <b>10</b> adet resim yükleyebilirsin. <br />
                                                        <span>
                                                            lütfen <b> {selectedImagesPath.length - 10} </b> adet resmi sil{" "}
                                                        </span>
                                                    </p>
                                                ) : (
                                                    <button
                                                        type="submit"
                                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Save
                                                    </button>
                                                ))
                                            }

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Form>
                    )}

                </Formik>


            </div >

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>


        </>
    )
}
