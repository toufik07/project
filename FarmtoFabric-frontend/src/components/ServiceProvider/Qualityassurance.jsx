import axios from 'axios'
import React, { useState } from 'react'

export default function Qualityassurance() {

  const[Fiber_Diameter,setfabricdm] = useState()
  const[Length,setlength] = useState()
  const[Crimp,setCrimp] = useState()
  const[Cleanliness,setClean] = useState()
  const[Color,setColor] = useState("")
  const[quality,setquality] = useState("")

  const data  = {
    Fiber_Diameter,
    Length,
    Color,
    Crimp,
    Cleanliness,
  }

  function predictquality(e){
    e.preventDefault();

    axios.post("http://localhost:5000/predict",data)
    .then((res) =>{
        setquality(res.data.prediction)
    })
    .catch((rej)=>{
        console.log(rej)
    })


  }
  return (
    <div className='md:ml-64 flex md:p-10 gap-5'>
      
      <div className="left flex flex-col border p-5 sm:w-full md:w-2/4">
      <h1 className=' mb-10 text-2xl text-green-500 font-bold self-center'>Wool Quality Assurance</h1>
        <input type="text" name="" id="" className=' border m-2 p-2 border-green-700 shadow-md' placeholder='Fiber Diameter..' value={Fiber_Diameter}
         onChange={(e)=>{
          setfabricdm(parseFloat(e.target.value))
         }}
        />
        <input type="text" name="" id="" className='border m-2 p-2 border-green-700  shadow-md' placeholder='Length...' value={Length}
        onChange={(e)=>{
          setlength(parseFloat(e.target.value))
        }}
        />
        <input type="text" name="" id="" className='border m-2 p-2 border-green-700  shadow-md' placeholder='Crimp...' value={Crimp}
        onChange={(e)=>{
          setCrimp(parseFloat(e.target.value))
        }}
        />
        <input type="text" name="" id="" className='border m-2 p-2 border-green-700 shadow-md' placeholder='Cleanliness..' value={Cleanliness}
        onChange={(e)=>{
           setClean(parseFloat(e.target.value))
        }}
        />
        <select name="" id="" className='border p-2 m-2 shadow-md' value={Color}
         onChange={(e)=>{
          setColor(e.target.value)
         }}
        >
          <option value="" hidden>Choose color..</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
          <option value="Brown">Brown</option>
        </select>
        <button className=' bg-blue-500 p-2 rounded-md text-white' onClick={(e)=>{predictquality(e)}}>
          Predict Quality
        </button>
      </div>

      <div className="right w-1/4 border p-5 flex flex-col h-2/4">
      <h1 className=' mb-10 text-2xl text-green-500 font-bold self-center'>Predicted Quality</h1>
        <div className="border flex justify-center w-1/2 m-auto p-5 rounded-full">
          <span className=' text-xl text-yellow-700 font-bold '>{quality}</span>
        </div>
      </div>
    </div>
  )
}
