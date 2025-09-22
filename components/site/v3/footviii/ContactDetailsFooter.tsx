import { Typography } from '@components/Typography'
import React from 'react'
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";


export const ContactDetailsFooter = () => {
  return (
    <div className='w-full'>
       
        <div className="">
              <Typography variant='title' color="text-primary">GET IN TOUCH</Typography>
             <div className="flex items-center gap-x-2">
                <div className="">

                <FiPhone className="text-primaryNew" />
                </div>

                 <Typography variant='body' color="text-primaryNew">03-9363-6378</Typography>
             </div>
             <div className="flex items-center gap-x-2">
                <div className="">

                <MdOutlineMailOutline className="text-primaryNew" />
                </div>

                 <Typography variant='body' color="text-primaryNew">info@skiltrak.com.au</Typography>
             </div>
             <div className="flex gap-x-2 whitespace-nowrap" >
               <div className="">
                 <IoLocationOutline size={20}  className="text-primaryNew" />
               </div>

                 <Typography variant='body' color="text-primaryNew">27/101 Collins street Melbourne, 3000</Typography>
             </div>
           
        </div>
    </div>
  )
}
