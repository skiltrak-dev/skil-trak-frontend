import { Rto } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RtoCellInfo = ({ rto, short }: { rto: Rto; short?: boolean }) => {
   return (
      <Link href={`rto/${rto.id}`}>
         <a className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full">
               <img
                  src={
                     rto.user.avatar ||
                     `https://picsum.photos/64/${64 + rto.id}`
                  }
                  className={`${short ? 'w-6 h-6' : 'w-8 h-8'} rounded-full`}
               />
            </div>
            <div>
               <p className={`${short?'font-medium':'font-semibold'}`}>{rto.user.name}</p>
               <div className="font-medium text-xs text-gray-500">
                  <p className="flex items-center gap-x-1">
                     <span>
                        <MdEmail />
                     </span>
                     {rto.user.email}
                  </p>
                  {!short && (
                     <p className="flex items-center gap-x-1">
                        <span>
                           <MdPhoneIphone />
                        </span>
                        {rto.phone}
                     </p>
                  )}
               </div>
            </div>
         </a>
      </Link>
   )
}
