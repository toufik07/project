import React from 'react'

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-75 z-50">
      <img src={require("./images/Farm to (1).png")} alt="" className='mb-4 animate-spin rounded-full h-32 w-32' />
      <span className='p-1 font-mono text-xl font-bold flex flex-col'>FARM TO <span className='text-xs text-green-600 m-auto'>FABRIC</span></span>
    </div>
  )
}
