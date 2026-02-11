import React from 'react'
import { doctors } from '../assets/assets'

const TopDoctors = () => {
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>
        Top Doctors To Consult
      </h1>
      <p className='sm:w-1/3 text-center text-sm'>
        Browse through our list of top doctors to find the right healthcare provider for you and your family.
      </p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0,10).map((Item,index)=>(
            <div className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-red-50' src={Item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green'>
                        <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                        <p>Available</p>
                    </div>
                    <p>{Item.name}</p>
                    <p>{Item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button>more</button>
    </div>
  )
}

export default TopDoctors
