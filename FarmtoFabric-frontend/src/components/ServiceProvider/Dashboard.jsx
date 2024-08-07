import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Dashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div>
            {/* Main  */}
            
            <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
                {/* <div class="py-2 px-6 bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <button type="button" class="text-lg text-gray-600 sidebar-toggle md:hidden "
                     onClick={() =>{
                        setIsSidebarOpen(true)
                     }}
                    > 
                        <img src={require("../images/menu.png")} alt="" />
                    </button>
                    <ul class="flex items-center text-sm ml-4">
                        <li class="mr-2">
                            <a href="#" class="text-gray-400 hover:text-gray-600 font-medium">Dashboard</a>
                        </li>
                    </ul>
                </div> */}

                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div class="bg-white rounded-md  border-gray-100 p-0 pl-0 pr-0 shadow-md shadow-black/5 h-[250px]">
                            <div class="flex justify-between mb-6  w-full items-center ">
                                <div class="bg-[#51b2ff] w-full h-[100px] flex items-center rounded-t-md">

                                    <div class="text-4xl font-medium text-white p-[10px] ">Active orders</div>
                                </div>
                            </div>
                            <div class="flex justify-around h-full text-[60px] mt-[50px] ">
                                <i class="fa-solid fa-chart-line"></i>

                                <div class="" >70</div>
                            </div>

                        </div>

                        <div class="bg-white rounded-md border border-gray-100 p-0 pl-0 pr-0 shadow-md shadow-black/5 h-[250px] ">
                            <div class="flex justify-between mb-6  w-full ">
                                <div class="bg-[#51b2ff] w-full h-[100px] flex items-center rounded-t-md">

                                    <div class="text-4xl font-medium text-white p-[10px] ">Happy Customer</div>
                                </div>
                            </div>
                            <div class="flex justify-around h-full text-[60px] mt-[50px]">
                                <div>100+</div>
                            </div>

                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            <div class="flex justify-between mb-4 items-start">
                                <div class="font-medium">Manage orders</div>

                            </div>
                            
                            <div class="overflow-x-auto">
                                <table class="w-full min-w-[540px]" data-tab-for="order" data-page="active">
                                    <thead>
                                        <tr>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Orders</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Price</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Date</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <div class="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <span class="text-[13px] font-medium text-gray-400">3 days</span>
                                            </td>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <span class="text-[13px] font-medium text-gray-400">$56</span>
                                            </td>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <span class="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">In progress</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>


                            </div>
                        </div> */}
                        {/* <div class="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
                            <div class="flex justify-between mb-4 items-start">
                                <div class="font-medium">Manage Services</div>

                            </div>

                            <div class="overflow-x-auto">
                                <table class="w-full min-w-[540px]">
                                    <thead>
                                        <tr>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Estimate</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Price</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Date</th>
                                            <th class="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <div class="flex items-center">
                                                    <img src="https://placehold.co/32x32" alt="" class="w-8 h-8 rounded object-cover block" />
                                                    <a href="#" class="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                                                </div>
                                            </td>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <span class="text-[13px] font-medium text-gray-400">$235</span>
                                            </td>
                                            <td class="py-2 px-4 border-b border-b-gray-50">
                                                <span class="text-[13px] font-medium text-gray-400">1K</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div> */}
                    </div>
                </div>
            </main>

        </div>
    )
}
