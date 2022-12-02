import { FaBox, FaBoxOpen } from 'react-icons/fa'

interface NoDataProps {
   text?: string
}
export const NoData = ({ text }: NoDataProps) => {
   return (
      <div className="border border-dashed rounded-md flex items-center justify-center flex-col p-6 gap-y-4 w-full">
         <span className="text-4xl text-slate-300">
            <FaBoxOpen />
         </span>
         <p className="text-sm font-semibold text-slate-300">
            {text || 'No Data'}
         </p>
      </div>
   )
}
