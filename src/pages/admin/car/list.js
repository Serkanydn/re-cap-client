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

//React Table 
import Table from "../../../components/reactTable/table"

export default function List({ title }) {
    useTitle(title);

    const dispatch = useDispatch()
    const { cars } = useSelector(state => state.carReducer)

    const getCars = () => {
        let carService = new CarService();
        carService.getCarDetailDtos().then(response => {
            dispatch(setCars(response.data.data))
        })
    }

    useEffect(() => {
        getCars()
    }, [])


    return (
        <>
            <Link to="/admin/car/add" className="p-1 inline-flex  items-center justify-center w-24 h-10 rounded-lg mt-1 font-bold text-gray-800 bg-blue-400 hover:bg-blue-300  hover:text-black transition-all"> Ekle</Link>
            <Table DATA={cars} COLUMNS={COLUMNS} />
        </>
    )
}
