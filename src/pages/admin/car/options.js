/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { setCars } from '../../../store/actions/carActions'
import CarService from '../../../services/common/carService';
import { columnIsFirstRightSticky } from 'react-table-sticky';
import { ToastrMessageType, ToastrPosition, ToastrService } from '../../../services/common/toastrService';
import Modal from './deleteModal';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Options({ car }) {

    const [openModal, setOpenModal] = useState(false)

    const dispatch = useDispatch()

    const handleDelete = () => {
        setOpenModal(true)
    }

 
    return (
        <>
            <Modal open={openModal} setOpen={setOpenModal} car={car}/>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center  w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                        Seçenekler
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute  z-50  right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to={`/admin/car/detail/${car.id}`}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )} >
                                        Güncelle
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <a onClick={() => handleDelete(car)}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm cursor-pointer'
                                        )} >
                                        Sil
                                    </a>
                                )}
                            </Menu.Item>


                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
