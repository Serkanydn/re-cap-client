import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export default function GlobalFilter({ filter, setFilter }) {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)

    return (

        <span>
            <input
                type="text"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md my-5"
                placeholder="Tabloda Ara"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
            />

        </span >

    )
}
