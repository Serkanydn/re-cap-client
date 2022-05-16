//React
import React from 'react'
//Custom Form Elements
import Options from './options';

const COLUMNS = [
    {
        Header: 'Renk',
        accessor: 'colorName',
    },
    {
        Header: 'İşlem',
        accessor: 'action',
        Cell: ({ row }) => (
            <Options color={row.original}/>
            
        ),
        disableFilters: true
    },
]


export default COLUMNS;