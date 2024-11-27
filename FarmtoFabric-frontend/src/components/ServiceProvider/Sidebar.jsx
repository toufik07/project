import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar(props) {
    let { id, name } = useParams()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div>
            <div class="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                <button type="button" class="text-lg text-gray-600 sidebar-toggle md:hidden "
                    onClick={() => {
                        setIsSidebarOpen(true)
                    }}
                >
                    <img src={require("../images/menu.png")} alt="" />
                </button>
                <ul class="flex items-center text-sm ml-4">
                    <li class="mr-2">
                        <a href="#" class="text-gray-400 hover:text-gray-600 font-medium md:pl-60">{props.name}</a>
                    </li>
                </ul>
            </div>
            <div className={`fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}  >
                <a
                    href="#"
                    className="flex flex-col gap-2 items-center pb-4 border-b border-b-gray-800"
                >
                    <i class="fa-solid fa-user-tie text-3xl  rounded object-cover text-white"></i>
                    <span className="text-lg font-bold text-white ml-3" >Hello {name}</span>
                </a>
                <ul className="mt-4">
                    <Link to={'/sprovider/'+ id + '/' + name}>
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md "
                            >
                                <i class="fa-solid fa-house mr-2"></i>
                                <span className="text-sm">Dashboard</span>
                            </a>
                        </li>
                    </Link>

                    <Link to={'/sprovider/'+ id + '/' + name + '/orders'} >
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-solid fa-bag-shopping mr-2"></i>
                                <span className="text-sm">Orders</span>
                            </a>

                        </li>
                    </Link>

                    <Link to={'/sprovider/'+ id + '/' + name + '/products'} >
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-brands fa-product-hunt mr-2"></i>
                                <span className="text-sm">Products</span>
                            </a>

                        </li>
                    </Link>

                    <Link to={'/sprovider/'+ id + '/' + name + '/addproducts'} >
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-solid fa-plus mr-2"></i>
                                <span className="text-sm">Add products</span>
                            </a>

                        </li>
                    </Link>

                    <Link to={'/sprovider/'+ id + '/' + name + '/services'} >
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-brands fa-first-order-alt mr-2"></i>
                                <span className="text-sm">Farmer Requests</span>
                            </a>

                        </li>
                    </Link>

                    <Link to={'/sprovider/'+ id + '/' + name + '/qualityassurace'}>
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-regular fa-circle-check mr-2"></i>
                                <span className="text-sm">Quality Assurance </span>
                            </a>
                        </li>
                    </Link>

                    <Link to={'/'}>
                        <li className="mb-4 group">
                            <a
                                href="#"
                                className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md  sidebar-dropdown-toggle"
                            >
                                <i class="fa-solid fa-right-from-bracket mr-2"></i>
                                <span className="text-sm">Logout</span>
                            </a>
                        </li>
                    </Link>


                </ul>
            </div>

            {/* Sidebar Overlay */}
            <div
                className={`fixed top-1 left-56 z-50 text-gray-300  hover:text-gray-100  border p-1 rounded-md md:hidden ${isSidebarOpen ? "block" : "hidden"
                    }`}
                onClick={() => {
                    setIsSidebarOpen(false)
                }
                }
            >
                    <i class="fa-solid fa-arrow-left"></i>
            </div>
        </div>
    )
}
