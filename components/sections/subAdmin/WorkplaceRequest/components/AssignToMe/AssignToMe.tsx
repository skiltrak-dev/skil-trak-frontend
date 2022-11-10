// components
import { Typography, Button } from '@components'

import { useAssignToSubAdminMutation } from '@queries'

export const AssignToMe = ({ workplace, appliedIndustry }: any) => {
   const [assignToMe, assignToMeResult] = useAssignToSubAdminMutation()
   return (
      <div>
         <Typography variant={'xs'} color={'text-gray-400'}>
            Allocated To:
         </Typography>
         {workplace?.assignedTo ? (
            <div>
               <Typography variant={'small'} capitalize>
                  <span className="font-semibold">
                     {workplace?.assignedTo?.user?.name}
                  </span>
               </Typography>
               <Typography variant={'badge'} color={'text-primary'}>
                  + Change Coordinator
               </Typography>
            </div>
         ) : (
            <Button
               variant={'dark'}
               text={'ASSIGN TO ME'}
               onClick={() => {
                  assignToMe({
                     industryId: appliedIndustry?.id,
                     id: workplace?.id,
                  })
               }}
               loading={assignToMeResult?.isLoading}
               disabled={assignToMeResult?.isLoading}
            />
         )}
      </div>
   )
}
