import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Products() {
  let{title} = useParams()
  const [productsdata, setProductsData] = useState([]);

  // to delete the data
  
  function deleteData(id) {
    axios.delete("http://localhost:5000/product/" + id)
      .then((res) => {
        alert(res.data.message)
        loadData()
      })
      .catch((rej) => {
        alert("unable to delete an item")
      })
  }

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
    <div className=' md:ml-64'>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product Image
              </th>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                Price
              </th>
              <th scope="col" class="px-6 py-3">
                MRP
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              productsdata.map((data, i) => (

                <tr class="odd:bg-white  even:bg-gray-50  border-b " key={i}>
                  <td className='px-6 py-4'>
                    <img src={data['imgpath']} alt="" className=' w-10' />
                  </td>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {data['title']}
                  </th>
                  <td class="px-6 py-4">
                    {data['category']}
                  </td>
                  <td class="px-6 py-4">
                    {data['price']}Rs
                  </td>
                  <td class="px-6 py-4">
                    {data['mrp']}Rs
                  </td>
                  <td class="px-6 py-4">
                    <Link class="font-medium bg-blue-500 text-white rounded-md p-2 mr-1"
                    >Edit</Link>
                    <Link class="font-medium bg-red-500 text-white rounded-md p-2"
                    onClick={
                      (e) =>{
                        e.preventDefault()
                        deleteData(data.id)
                      }
                    }
                    >Delete</Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
