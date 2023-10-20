import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({cardData}) => {
  return (
    <div className=''>
      
      <Link to={`/`}> 
    <div className=' flex justify-center items-center bg-slate-100 border-b rounded-lg hover:scale-[1.03] transition-all duration-500'>  
    <img className='w-rounded-xl object-cover h-[350px]' 
    src={cardData.productMainImage} />
    </div>

    <div className="flex flex-col  px-1 py-3  text-orange-500">
      <p className="text-xl font-semibold">{cardData.productName}</p>
      <p className="text-lg text-slate-400">{cardData.forWhom}' Shouse</p>
     <div className='flex flex-row gap-6'>
     <p className='text-lg text-black font-semibold'>MRP : ₹ {cardData.price}</p>
     <p className='text-lg text-black font-semibold pl-5'> {cardData.color}</p>
     </div>
    </div>
      </Link> 
    </div>
  )
}

export default Card
