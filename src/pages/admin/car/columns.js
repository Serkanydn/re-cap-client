import Options from '../../../utilities/CustomElements/options'
import { imageUrl } from '../../../services/common/projectUrls';
import React from 'react'

const menus = [
    { title: 'Detay', path: `/admin/car/detail` },
    { title: 'Güncelle', path: '/admin/car/detail/:id' },
    { title: 'Sil', path: '/admin/car/detail/:id' },

]

const COLUMNS =  [
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
                <Options menus={menus} id={row.original.id} />
            ),
            disableFilters: true
        },
    ]


export default COLUMNS;