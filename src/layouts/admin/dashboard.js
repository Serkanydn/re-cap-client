import React from 'react'
import { Outlet  } from 'react-router-dom'
import {useNavigate} from 'react-router'
import Sidebar from './sideBar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'


import { useState } from "react";

export default function Dashboard() {

    const [title, setTitle] = useState("");

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate(-1)
    }

    return (
        <div className="flex">
            <Sidebar />

            <main className="w-full">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <header className="bg-white shadow">
                        <div className="w-full mx-auto py-6 px-4 flex justify-between   items-center sm:px-6 lg:px-8 ">
                            <h1 className="text-3xl font-bold text-gray-900"> {title}</h1>
                            <FontAwesomeIcon className="w-8 h-8 cursor-pointer" onClick={()=>{handleBack()}} icon={faCircleArrowLeft} />
                        </div>
                    </header>

                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-2 border-dashed border-gray-200 rounded-lg h-full p-5" >
                            <Outlet context={{ title, setTitle }} />
                        </div>


                    </div>

                </div>
            </main>

        </div>
    )
}
