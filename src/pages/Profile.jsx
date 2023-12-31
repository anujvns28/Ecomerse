import React, { useEffect, useState } from 'react'
import { FetchUserData } from '../service/operation/profil'
import { useSelector } from 'react-redux'
import { MdSwitchAccount } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoMdSettings } from "react-icons/io";
import { MdAddLocation } from "react-icons/md";
import { CiCircleInfo } from "react-icons/ci";
import ProfileInfo from '../components/core/profile/ProfileInfo';
import { Link, Outlet, matchPath, useLocation, useParams } from 'react-router-dom';
import { GiRunningShoe } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { AiOutlineHeart } from "react-icons/ai"
import {AiFillCaretDown} from "react-icons/ai"


const Profile = () => {
  
  const accountSetting = [
    {
      name : "Update Profile Image",
      logo: <CiImageOn/>,
      link:"/my-profile/update-profileImg"
    },
    {
      name : "Update Profile ",
      logo: <MdSwitchAccount/>,
      link:"/my-profile/update-profile"
    },
    {
      name : "Add Address",
      logo: <MdAddLocation/>,
      link:"/my-profile/add-address"
    },
  ]

  const accountInfo = [
    {
      name : "Profile ",
      logo: <MdSwitchAccount/>,
      link:"/my-profile/view-profile"
    },
    {
      name : "Profile Image",
      logo: <CiImageOn/>,
      link:"/my-profile/view-profileImg"
    },
    {
      name : "Address",
      logo: <MdAddLocation/>,
      link:"/my-profile/view-address"
    },
  ]

  const myStuff = [
    {
      name:"Wishlist",
      logo:<AiOutlineHeart/>,
      link:"/my-profile/wishlist"
    },
    {
      name:"Cart",
      logo:<AiOutlineShoppingCart/>,
      link:"/cart"
    },
  ]
   
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState()
  const location = useLocation()
  
  const getUserDAta = async () => {
    const result = await FetchUserData(user._id)
    if (result) {
      console.log("this is user Response", result)
      setUserData(result.data)
    }
  }

   const matchRoute = (data) => {
   return matchPath({path:data},location.pathname)
   }

  useEffect(() => {
    getUserDAta();
  }, []) 
  return (
    <div className='w-[1260px] mx-auto'>
      {
        userData
          ? <div className='flex flex-row gap-4'>
            <div className=' w-[30%] h-screen p-4 flex flex-col gap-3'>
              <div className='w-full  border border-black flex flex-row gap-2 p-3 '>
                <div className='' >
                  <img className='w-[60px] h-[60px] rounded-full'
                    src={userData.image} />
                </div>
                <div className='p-2'>
                  <p className='text-xs'>Hello,</p>
                  <h1 className='text-xl'>{userData.firstName} {userData.lastName}</h1>
                </div>
              </div>
              <div className='w-full h-full border border-red-700 p-3 '>
                <details className='cursor-pointer' open>
               <summary className='flex'>
               <div className='flex w-full flex-row gap-3 items-center justify-between mb-1 border border-black p-3'>
                 <div className='flex w-full flex-row gap-3 items-center'>
                 <p className='text-2xl'><CiCircleInfo/></p>
                  <h1 className='text-xl'> INFORMATION</h1>
                 </div>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                 </div>


               </summary>

                {
                  accountInfo.map((item,index) =>{
                    return <Link to={item.link}>
                       <div  key={index} className={`flex flex-row gap-3 items-center cursor-pointer   rounded-md  p-3
                        ${matchRoute(item.link) ? "bg-slate-500 text-white" : "hover:text-slate-600"} `}>
                    <p className='text-2xl'>{item.logo}</p>
                    <h1 className=''>{item.name}</h1>
                   </div>
                    </Link>
                  })
                }
                </details>

                 <details className='cursor-pointer'>
                  <summary className='flex'>
                  <div className='flex w-full flex-row gap-3 items-center justify-between mb-1 border border-black p-3 mt-4'>
                  <div className='flex w-full flex-row gap-3 items-center'>
                  <p className='text-2xl'><IoMdSettings/></p>
                  <h1 className='text-xl'>SETTINGS</h1>
                  </div>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                 </div>
                  </summary>

                  {
                  accountSetting.map((item,index) =>{
                    return <Link to={item.link}>
                    <div key={index} className={`flex flex-row gap-3 items-center cursor-pointer   rounded-md  p-3
                        ${matchRoute(item.link) ? "bg-slate-500 text-white" : "hover:text-slate-600"} `}>
                    <p className='text-2xl'>{item.logo}</p>
                    <h1 className=''>{item.name}</h1>
                   </div>
                    </Link>
                  })
                }
                 </details>
          
               <details className='cursor-pointer'>
                <summary className='flex'>
                <div className='flex w-full flex-row gap-3 items-center mb-1 border justify-between border-black p-3 mt-4'>
                  <div className='flex w-full flex-row gap-3 items-center'>
                  <p className='text-2xl'><GiRunningShoe/></p>
                  <h1 className='text-xl'>MY STUFF</h1>
                  </div>
                  <AiFillCaretDown className={`text-xl text-richblack-300`} />
                 </div>
                </summary>
               

                 {
                  myStuff.map((item,index) =>{
                    return <Link to={item.link}>
                    <div key={index} className={`flex flex-row gap-3 items-center cursor-pointer   rounded-md  p-3
                        ${matchRoute(item.link) ? "bg-slate-500 text-white" : "hover:text-slate-600"} `}>
                    <p className='text-2xl'>{item.logo}</p>
                    <h1 className=''>{item.name}</h1>
                   </div>
                    </Link>
                  })
                }
               </details>

              </div>
            </div>
            <div className='border border-black w-[75%]  p-6 flex flex-col gap-3'>
           <Outlet context={[userData,getUserDAta]} />
            </div>
          </div>
          : <div className='w-full h-full flex items-center justify-center'>Loading...</div>
      }
    </div>
  )
}

export default Profile
