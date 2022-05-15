import React from 'react'
import { useField,Field } from 'formik'

export default function SnTextInput({ ...props }) {

    //field = name,value, onchange, onblur
    //meta = error,touched, initialvalute, initialTouched
    const [field, meta] = useField(props)
    return (
        <div>
            <Field value="sada" {...props} {...field}></Field>
            {meta.touched && !!meta.error ? (
                <p className="text-red-600">{meta.error}</p>
            ) : null}

        </ div>
    )
}
