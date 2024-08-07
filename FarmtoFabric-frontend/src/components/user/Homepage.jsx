import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Homepage() {
    const [productdata, setProductsData] = useState([])
    

    function loadData() {
        axios.get("http://localhost:5000/products")
            .then((res) => {
                //  setData(res.data)
                console.log(res.data)
                setProductsData(res.data)
            })
            .catch((rej) => {
                alert("enable to get the data")
            })
    }

    useEffect(() => {
        loadData();
    }, [])
    return ( 
        <div className=' w-full 
        mt-20 m-auto md:max-w-7xl p-2 flex gap-5 md:flex-wrap justify-start border flex-col md:flex-row'>
            {
                productdata.map((data, i) => (
                    //     <div className=" product_card p-2 border border-blue-600 flex flex-col items-center gap-3 w-full sm:w-1/3" key={i}>
                    //     <div className=" border border-black">
                    //         <img src={data['imgpath']} alt="productimg" className=' w-16' />
                    //     </div>
                    //     <p>{data['title']}</p>
                    //     <p>{data['description']}</p>
                    //     <p>Mrp-{data['mrp']}</p>
                    //     <p>Price-{data['price']}</p>
                    //     <div className=" flex gap-5">
                    //         <button className='border text-white p-1 rounded-md bg-blue-600'>Add to Cart</button>
                    //         <button className='border text-white p-1 rounded-md bg-black'>Buy Now</button>
                    //     </div>
                    // </div>


                    <div class=" bg-white border border-gray-200 rounded-lg md:w-1/4 h-fit md:ml-14">
                        <div className=' w-3/4  h-40 m-auto'>
                            <img class="p-8 rounded-t-lg w-full h-full " src={data['imgpath']} alt="product image" />
                        </div>
                        <div class="px-5 pb-5">

                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">{data['title']} - {data['description']}</h5>

                            <div class="flex items-center mt-2.5 mb-5">
                            <i class="fa-solid fa-indian-rupee-sign"></i><strike>{data['mrp']}</strike> 
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-3xl font-bold text-gray-900"><i class="fa-solid fa-indian-rupee-sign"></i>{data['price']}</span>
                                <a href="#" class="text-white bg-blue-700 hover:bg-blue-800   font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add to cart</a>
                            </div>
                        </div>
                    </div>

                ))
            }
        </div>
    )
}
