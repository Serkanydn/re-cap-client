import React, { useEffect } from 'react'
import useTitle from '../../../components/useTitle'

//Services
import ColorService from "../../../services/common/colorService"

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setColors } from "../../../store/actions/colorActions"

//React Table 
import Table from "../../../components/reactTable/table"
import COLUMNS from "./columns"


import Add from '../color/add'


export default function List({ title }) {
    useTitle(title)

    const dispatch = useDispatch()
    const { colors } = useSelector(state => state.colorReducer)

    const getColors = () => {
        const colorService = new ColorService()
        colorService.getColors().then((response) => {
            dispatch(setColors(response.data.data))
        })
    }

    useEffect(() => {
        getColors()
    }, [])


    return (
        <div className='flex space-x-3'>
            <div className='w-1/3'>
                <Add />
            </div>
            <div className="w-2/3">
                <Table DATA={colors} COLUMNS={COLUMNS} />
            </div>
        </div>
    )
}
