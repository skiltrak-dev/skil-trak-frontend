import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaInstagram   } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";


export const SocialLinks = () => {
  return (
    <div className="flex flex-col gap-y-10">
         <Typography color="text-primaryNew">SkilTrak acknowledges the  Aboriginal and Torres Strait Islander people, the Traditional Custodians of the land on which our business is located. We pay our respects to Elders past and present, and extend that respect to all Aboriginal and Torres Strait Islander peoples.</Typography>
         <div className="flex items-center gap-x-4 mt-5">
         <Image
                            src={`/images/site/home-page-v3/footer/mauritius-flag.png`}
                            alt="Logo"
                            width={62}
                            height={32}
                            priority
                        />
                         <Image
                            src={`/images/site/home-page-v3/footer/torres-strait-islander-flag.png`}
                            alt="Logo"
                            width={62}
                            height={32}
                            priority
                        />
                        <Image
                            src={`/images/site/home-page-v3/footer/australian-national-flag.png`}
                            alt="Logo"
                            width={62}
                            height={32}
                            priority
                        />
         </div>
         <div className="flex items-center gap-x-4 mt-5">
            <div className="bg-blue-200 rounded-full p-2">
                <FaFacebookF className="text-blue-900"/>
            </div>
             <div className="bg-blue-200 rounded-full p-2">
                <FaLinkedinIn  className="text-blue-900"/>
            </div>
             <div className="bg-blue-200 rounded-full p-2">
                <FaInstagram className="text-blue-900"/>
            </div>
            <div className="bg-blue-200 rounded-full p-2">
                <AiOutlineYoutube className="text-blue-900"/>
            </div>

         </div>
         <div className="flex items-center justify-between w-full">
              <Typography>All Rights Reserved - 2025</Typography>
                <Typography>ABN: 58 634 992 706</Typography>
                  <Typography>Terms & Conditions</Typography>
         </div>
    </div>
  )
}
