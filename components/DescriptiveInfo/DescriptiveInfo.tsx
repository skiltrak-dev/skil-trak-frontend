import { Typography } from '@components/Typography'

interface DescriptiveInfoProps {
   Icon: any
   title: string
   description: string
}
export const DescriptiveInfo = ({
   Icon,
   title,
   description,
}: DescriptiveInfoProps) => {
   return (
      <div className="h-full flex flex-col justify-center py-2 px-4">
         <div className="flex items-center gap-x-2 text-gray-500 text-xs font-medium ">
            <Icon className="text-gray-400" />
            <p className="">{title}</p>
         </div>
         <p className="text-sm">{description}</p>
      </div>
   )
}
