//components
import { Card } from '@components/cards'
import { Typography } from '@components'
// image
import Image from 'next/image'

type FigureCardProps = {
   imageUrl?: string | undefined
   count: number
   title: string
}

export const FigureCard = ({ imageUrl, count, title }: FigureCardProps) => {
   return (
      <>
         <Card>
            <div className="flex justify-between">
               {imageUrl && (
                  <div className="flex items-center gap-x-2 justify-between">
                     <Image
                        src={imageUrl || ''}
                        alt={title}
                        width={48}
                        height={48}
                     />
                  </div>
               )}
               <div className="flex flex-col items-end">
                  <p className="text-3xl font-bold">{count}</p>
                  <p className="text-xs text-gray-500 leading-3 uppercase">{title}</p>
               </div>
            </div>
         </Card>
      </>
   )
}
