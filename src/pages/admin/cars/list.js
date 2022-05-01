import React, { useEffect, useState } from 'react'
import useTitle from '../../../utilities/useTitle'
import CarService from '../../../services/common/carService';

import { useTable, useGlobalFilter, useFilters } from 'react-table'
import ColumnFilter from '../../../utilities/reactTable/columnFilter'
import GlobalFilter from '../../../utilities/reactTable/globalFilter'

import { Link } from 'react-router-dom';

import Options from '../../../utilities/CustomElements/options'



export default function List({ title }) {
    const [cars, setCars] = useState([]);
    useTitle(title);


    useEffect(() => {
        let carService = new CarService();
        carService.getCars().then(result => {
            setCars(result.data.data)
            console.log(result.data.data)
        })
    }, [])

    const data = React.useMemo(
        () => [...cars], [cars])



    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                Footer: 'ID',
                accessor: 'id', // accessor is the "key" in the data
                Filter: ColumnFilter,

            },
            {
                Header: 'Brand',
                Footer: 'Brand',
                accessor: 'brandId',
                Filter: ColumnFilter,
            },
            {
                Header: 'Color',
                Footer: 'Color',
                accessor: 'colorId',
                Filter: ColumnFilter,
            },
            {
                Header: 'Daily Price',
                Footer: 'Daily Price',
                accessor: 'dailyPrice',
                Filter: ColumnFilter,
            },
            {
                Header: 'Model Year',
                Footer: 'Model Year',
                accessor: 'modelYear',
                Filter: ColumnFilter,
            },
            {
                Header: '',
                Footer: '',
                accessor: 'action',
                Cell: ({ row }) => (
                    <Options />



                )
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable(
        { columns, data },
        useGlobalFilter,
        useFilters
    )

    return (
        <>
            {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
            <table className="table-fixed w-full"  {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {column.render('Header')}

                                    <div className="mt-1 mb-2">{column.canFilter && column.Header!=='' ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px gray',
                                                background: 'papayawhip',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>
                    {footerGroups.map(footerGroup => (
                        <tr className="text-center" {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map(column => (
                                    <td {...column.getFooterProps()}
                                        style={{
                                            borderBottom: 'solid 3px red',
                                            background: 'aliceblue',
                                            color: 'black',
                                            fontWeight: 'bold',

                                        }}

                                    >
                                        {column.render('Footer')}
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tfoot>
            </table>
        </>
    )
}
