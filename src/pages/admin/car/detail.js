import React, { useEffect, useState } from 'react'
import useTitle from '../../../components/useTitle'
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
import { useParams } from 'react-router-dom';

import SnSelect from '../../../components/CustomElements/SnSelect';
import { Formik, Form, Field, useFormik, useFormikContext, ErrorMessage } from 'formik';
import { carAddSchema } from '../../../validations/schemas/carSchema';
import SnTextInput from '../../../components/CustomElements/SnTextInput';
import { imageUrl } from '../../../services/common/projectUrls'
import { useDispatch, useSelector } from 'react-redux';
import { setCar } from '../../../store/actions/carActions';



export default function Add({ title }) {
  useTitle(title);

  const { carId } = useParams()

  const [selectedImagesPath, setSelectedImagesPath] = useState([])

  const [brands, setBrands] = useState([])
  const [colors, setColors] = useState([])

  const navigation = useNavigate()

  const [schema, setSchema] = useState(carAddSchema)

  const dispatch = useDispatch()

  const { car } = useSelector(state => state.carReducer)

  const setImages = (images, setFieldValue) => {
    const selectedFilesArray = Array.from(images);
    const imagesArray = selectedFilesArray.map((file) => {
      file.path = URL.createObjectURL(file)
      return file
    })
    setSelectedImagesPath(imagesArray)
    setFieldValue("Images", imagesArray)
  }


  const onDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
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

  const getCar = () => {
    let carService = new CarService()
    carService.getCarDetailDtoById(carId).then(result => {
      dispatch(setCar(result.data.data))
    })
  }

  const handleSubmit = (values) => {
    const toastrService = new ToastrService()
    const carImageService = new CarImageService()
    const carService = new CarService();

    const { Images, ...car } = values

    carService.update(car).then((response) => {
      toastrService.message(response.data.message, "Başarılı", ToastrMessageType.success, ToastrPosition.topRight)
      carImageService.addByCarId(Images, car.Id).then((response) => {
        setTimeout(() => { navigation(-1) }, 2000)

      })
    })

  }

  const handleDelete = (imageId) => {
    const toastrService = new ToastrService()
    const carImageService = new CarImageService()
    carImageService.delete(imageId).then((response) => {
      toastrService.message(response.data.message, "Başarılı", ToastrMessageType.success, ToastrPosition.topRight)
      setTimeout(() => { getCar() }, 100)
    })
  }

  useEffect(() => {
    getBrands()
    getColors()
    getCar()
    console.log(car)
  }, [])



  const initialValues = {
    Id: parseInt(carId),
    Images: car.carImages || "",
    BrandId: car.brandId || "",
    ColorId: car.colorId || "",
    ModelYear: car.modelYear || "",
    DailyPrice: car.dailyPrice || "",
    Description: car.description || ""
  }
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
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {(formik) => (
            <Form>
              <div className="md:grid md:grid-cols-2 md:gap-6 ">

                <div className="mt-5 md:mt-0 md:col-span-2 ">

                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">

                          <SnSelect
                            options={brands}
                            value={formik.values.BrandId}
                            name="BrandId"
                            label="  Marka Seçin"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => {
                              formik.setFieldValue("BrandId", e.value)
                            }}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                          <SnSelect
                            options={colors}
                            value={formik.values.ColorId === '' ? car.colorId : formik.values.ColorId}
                            name="ColorId"
                            label="  Renk Seçin"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            onChange={(e) => {
                              formik.setFieldValue("ColorId", e.value)
                            }}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Model Yılı
                          </label>
                          <SnTextInput
                            value={car.modelYear}
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
                          onDragEnter={onDrag}
                          onDragLeave={onDrag}
                          onDragOver={onDrag}
                          onDrop={e => {
                            setImages(e.dataTransfer.files, formik.setFieldValue)
                          }}>

                          {car.carImages.length>0 && <><label className="block text-sm font-medium text-gray-700">Mevcut Resimler - <span className='font-bold'>Resimler tamamen silinecektir.</span></label>
                            <div className="mt-1 flex flex-wrap  px-3 py-3 justify-center border-2 border-gray-300 border-dashed rounded-md">
                              {car.carImages.map((image, index) => (
                              <div className="col-span-1 mx-2 my-2" key={index}>
                                <div className=" relative " >
                                  <img src={`${imageUrl}${image.imagePath}`} className="w-48 h-24" />
                                  <span className="absolute top-1 right-1 cursor-pointer " onClick={() => {
                                    handleDelete(image.id)

                                  }}>
                                    <FontAwesomeIcon icon={faXmark} type="submit" className="  w-6 h-6 bg-red-900 text-white rounded" />
                                  </span>
                                </div>
                              </div>
                              ))}
                            </div>
                          </>}


                          <label className="block text-sm font-medium mt-5 text-gray-700">Yüklemek istediğiniz resimleri tek seferde seçin.</label>
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
                                    setImages(e.target.files, formik.setFieldValue)

                                  }} multiple accept="image/png image/jpeg, image/jpg" />
                                </label>

                                <p className="pl-1">ya da sürükle bırak</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                          </div>
                          {formik.errors.Images ? (
                            <p className="text-red-600 block w-full">{formik.errors.Images}</p>
                          ) : null}
                          <ErrorMessage name="Images" > </ErrorMessage>
                        </div>


                        {selectedImagesPath.length > 0 && <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-700">Eklenen Resimler:</label>
                          <div className="mt-1 flex flex-wrap  px-3 py-3 justify-center border-2 border-gray-300 border-dashed rounded-md">

                            {selectedImagesPath.map((image, index) => (
                              <div className="col-span-1 mx-2 my-2" key={index}>
                                <div className=" relative " >
                                  <img src={image.path} className="w-48 h-24" />
                                  <span className="absolute top-1 right-1 cursor-pointer " onClick={() => {
                                    const filteredImages = selectedImagesPath.filter((img) => img.path !== image.path)
                                    setImages(filteredImages, formik.setFieldValue)
                                  }}>
                                    <FontAwesomeIcon icon={faXmark} className="  w-6 h-6 bg-red-900 text-white rounded" />
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>}


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


                      {(car.carImages && car.carImages.length + selectedImagesPath.length > 10 ? (
                        <p className="error">
                          En fazla <b>10</b> adet resim yükleyebilirsin. <br />
                          <span> lütfen <b> {car.carImages.length + selectedImagesPath.length - 10} </b> adet resmi sil{" "}
                          </span>
                        </p>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Güncelle
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
