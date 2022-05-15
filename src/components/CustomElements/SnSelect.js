import React from "react";
import Select from 'react-select'
import { Field, useField } from 'formik'


export default function SnSelect({ label, onChange, options, value, className, ...props }) {

    const [field, meta] = useField(props)
    // console.log(className)
    //  console.log(options)
    //  console.log("field")
    //  console.log(field)
    //  console.log("meta")
    //  console.log(meta)
    // console.log("props")
    // console.log(props)

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : ""
    }

    return (
        <div>
            <label className="block">{label}</label>
            <Select
                value={defaultValue(options, value)}
                onChange={value => onChange(value)}
                options={options}
                className={className}
            >
            </Select>
            {meta.touched && !!meta.error ? (
                <p className="text-red-600">{meta.error}</p>
            ) : null}
        </div>
    )
}
