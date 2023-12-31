import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({cardData,showFilter }) => {
  

  return (
    <div className='border w-full drop-shadow-xl border-black p-3  rounded-md  hover:scale-[1.03] transition-all duration-500'>
      
      <Link to={`/${cardData._id}`}> 
    <div className=' w-full flex justify-center items-center bg-slate-100 border-b rounded-lg  '>  
    <img className={` object-cover h-[400px] bg-contain rounded-md ${showFilter ? "h-[350px] transition-all  duration-500" : "h-[450px] transition-all  duration-500"}`} 
    src={cardData.mainImage} height={200}/>
    </div>

    <div className="flex flex-col  px-1 py-3  text-orange-500">
      <p className="text-xl font-semibold">{cardData.productName}</p>
      <p className="text-lg text-slate-400">{cardData.forWhom}' Shouse</p>
     <div className='flex flex-row gap-6'>
     <p className='text-lg text-black font-semibold'>MRP : ₹ {cardData.price}</p>
     <p className='text-lg text-black font-semibold pl-5'>Color : {cardData.color}</p>
     </div>
    </div>
      </Link> 
    </div>
  )
}

export default Card
