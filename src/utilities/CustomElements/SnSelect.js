import React from "react";
import Select from 'react-select'
import { useField } from 'formik'


export default function SnSelect({  ...props }) {

    const [field, meta] = useField(props)
    console.log("field")
    console.log(field)
    console.log("meta")
    console.log(meta)
    console.log("props")
    console.log(props)

    


    return (
        <div>
            <Select {...props} {...field} 
                onChange={(e) => {
                    console.log(e.value)
                }}
            />

        </div>
    )
}
