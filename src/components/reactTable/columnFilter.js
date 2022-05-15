import React from 'react'
import { useAsyncDebounce } from 'react-table'

export default function ColumnFilter({ column }) {
    const { filterValue, setFilter } = column

    return (

        <span>
            <input
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md my-5 py-1"
                type="text"
                placeholder="Ara:"
                value={filterValue || ''}
                onChange={(e) => {

                    setFilter(e.target.value)
                }
                } />
        </span>

    )
}
