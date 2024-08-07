import React from 'react'

export default function Home() {
  return (
    <div className=''>
      <div className="main  max-w-7xl m-auto p-4 flex sm:flex-col sm:items-center sm:p-1  flex-col-reverse  md:flex-row  mt-12 ">
        <div className="left md:w-6/12 p-5 flex justify-center  sm:w-10/12  w-2/2">
          <img src={require("./images/wool.webp")} alt="" className='' />
        </div>
        <div className="right md:w-6/12 flex justify-center items-center p-3 self-center ">
          <div className=" flex flex-col gap-3 ">
            <span className=' text-6xl text-green-600'>From Nature , For Nature</span>
            <p className=' text-black'>It is not about the pasture of the sheep, but about their wool.</p>
            <p>A single platform for Farmers , Buyers and Service Providers</p>
            <button className='p-1 rounded-lg text-black  w-40 font-bold border border-black '>Know More</button>
          </div>
        </div>
      </div>
      <div className="feature m-auto p-5 flex flex-col gap-5 md:max-w-6xl md:flex-row md:gap-5">
        <div className="border-2  p-4 rounded-lg  hover:border-green-600 flex flex-col justify-center text-center md:w-1/3">
          <div className=" bg-yellow-300 flex justify-center">
            <img src={require("./images/uv.gif")} alt="" />
          </div>
          <h3 className=' font-bold'>Wool has natural UV protection </h3>
          <p>Wool naturally absorbs the suns UV rays before it can make contact with your skin.</p>
        </div>
        <div className="border-2 p-4 rounded-lg hover:border-green-600 flex flex-col justify-center text-center md:w-1/3">
          <div className=" bg-yellow-300 flex justify-center">
            <img src={require("./images/card7.gif")} alt="" />
          </div>
          <h3 className=' font-bold'>Keeps you warm in winter and cool in summer</h3>
          <p> - Wool is renowned for its ability to regulate body temperature.</p>
        </div>
        <div className="border-2 p-4 rounded-lg hover:border-green-600 flex flex-col justify-center text-center md:w-1/3">
          <div className=" bg-yellow-300 flex justify-center">
            <img src={require("./images/card8.gif")} alt="" />
          </div>
          <h3 className=' font-bold'>Wool is stain resistant</h3>
          <p>- The waxy outer coating of wool helps to repel liquids.</p>
        </div>
      </div>
    </div>
  )
}
