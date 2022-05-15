//React
import React from 'react'
//Services
import { imageUrl } from '../../../services/common/projectUrls';
//Custom Form Elements
import Options from './options'

const COLUMNS = [
    {
        Header: 'Resim',
        accessor: 'carImages',
        disableFilters: true,
        Cell: ({ row }) => (
            <img className='w-24 h-12 inline-flex justify-center items-center' src={row.values.carImages && `${imageUrl}${row.values.carImages[0].imagePath}`} />
        ),
    },
    {
        Header: 'Marka',
        accessor: 'brandName',
    },
    {
        Header: 'Renk',
        accessor: 'colorName',
    },
    {
        Header: 'Günlük Ücret',
        accessor: 'dailyPrice',
    },
    {
        Header: 'Model Yılı',
        accessor: 'modelYear',
    },
    {
        Header: 'İşlem',
        accessor: 'action',
        Cell: ({ row }) => (
            <Options car={row.original} />
        ),
        disableFilters: true
    },
]


export default COLUMNS;