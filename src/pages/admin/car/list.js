import React, { useEffect } from 'react'
import useTitle from '../../../components/useTitle'

//Services
import CarService from '../../../services/common/carService';

//React-Table
import { useTable, useGlobalFilter, useFilters, usePagination } from 'react-table'
import ColumnFilter from '../../../components/reactTable/columnFilter'
import GlobalFilter from '../../../components/reactTable/globalFilter'

//Router
import { Link } from 'react-router-dom';

//Columns
import COLUMNS from './columns'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from '../../../store/actions/carActions'


export default function List({ title }) {
    useTitle(title);

    const dispatch = useDispatch()
    const { cars } = useSelector(state => state.carReducer)

    const getCars = () => {
        let carService = new CarService();
        carService.getCarDetailDtos().then(result => {
            dispatch(setCars(result.data.data))
        })
    }

    useEffect(() => {
        getCars()
    }, [])

    const data = React.useMemo(() => [...cars], [cars])
    const columns = React.useMemo(() => COLUMNS, [])

    const defaultColumn = React.useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage, // sonraki sayfaya geç fonksiyonu
        previousPage, // önceki sayfaya geç fonksiyonu
        canNextPage, // sonraki sayfaya geçebilir mi true/false
        canPreviousPage, // önceki sayfaya geçebilir mi true/false
        pageOptions, // sayfa ayarları
        gotoPage, // belirtilen sayfaya gitmek için
        pageCount, // sayfa sayısını öğrenmek için
        setPageSize,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        state,
        setGlobalFilter
    } = useTable(
        { columns, data, defaultColumn, initialState: { pageIndex: 0, hiddenColumns: ["id"] } },
        useGlobalFilter,
        useFilters,
        usePagination
    )


    const { globalFilter, pageIndex, pageSize } = state
    return (
        <>
            <div className="flex justify-between">
                <div className="flex-1 w-full mr-16">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <Link to="/admin/car/add" className="p-1 inline-flex  items-center justify-center w-24 h-10 rounded-lg mt-1 font-bold text-gray-800 bg-blue-400 hover:bg-blue-300  hover:text-black transition-all"> Ekle</Link>
            </div>


            {/* <div>
                <input type="checkbox" {...getToggleHideAllColumnsProps()} />All
            </div>
            {
                allColumns.map(column => (
                    <div key={column.id}>
                        <label>
                            <input type='checkbox' {...column.getToggleHiddenProps()} />
                            {column.Header}
                        </label>
                    </div>
                ))
            } */}
            <table className="table-fixed w-full text-center"  {...getTableProps()} style={{ border: 'solid 1px blue' }}>
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

                                    <div className="mt-1 mb-2">{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
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

            </table>
            <div className="flex justify-center  items-center py-5 space-x-4 ">


                <span className="text-l">
                    Go to page: {' '}
                    <input className="w-16 h-8" type='number' defaultValue={pageIndex + 1} onChange={
                        e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                            console.log(pageNumber)
                        }


                    } />
                </span>


                <button className="py-2 px-5 bg-slate-700 text-white hover:bg-slate-600 cursor-pointer rounded-lg " onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button className="py-2 px-5 bg-slate-700 text-white hover:bg-slate-600 cursor-pointer rounded-lg " onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>


                <span className="text-l">
                    Page {' '}  <strong >  {pageIndex + 1} of {pageOptions.length}</strong> {' '}
                </span>
                <button className="py-2 px-5 bg-slate-700 text-white hover:bg-slate-600 cursor-pointer rounded-lg " onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button className="py-2 px-5 bg-slate-700 text-white hover:bg-slate-600 cursor-pointer rounded-lg " onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>

                <select className="w-24 h-8 p-0  " value={pageSize} onChange={e => { setPageSize(Number(e.target.value)) }}>

                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                        ))
                    }

                </select>
            </div>


        </>
    )
}
