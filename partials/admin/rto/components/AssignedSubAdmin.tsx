import { ActionButton } from '@components'
import { Course, SubAdmin } from '@types'
import { useState } from 'react'
import { FaMinusCircle } from 'react-icons/fa'

interface AssignedCourseProps {
   subAdmin: SubAdmin
   onRemove: Function
}
export const AssignedSubAdmin = ({
   subAdmin,
   onRemove,
}: AssignedCourseProps) => {
   const [showUnassign, setShowUnassign] = useState(false)

   const onRemoveClicked = () => {
      setShowUnassign(true)
   }
   const onCancelClicked = () => {
      setShowUnassign(false)
   }

   const onUnassignClick = () => {
      onRemove(subAdmin)
   }

   return (
      <div className="border-t py-2">
         {!showUnassign ? (
            <div className="flex items-start justify-between">
               <div>
                  <p className="text-sm">{subAdmin.user.name}</p>
                  <p className="text-xs text-gray-400">{subAdmin.user.email}</p>
               </div>

               <div>
                  <button
                     className="text-red-500 text-[11px] flex items-center gap-x-2 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-all
           duration-300"
                     onClick={() => {
                        onRemoveClicked()
                     }}
                  >
                     <FaMinusCircle />
                     <span>Remove</span>
                  </button>
               </div>
            </div>
         ) : (
            <div className="p-1">
               <p className="text-xs mb-2">
                  You are about to unassign sub-admin{' '}
                  <span className="font-medium">{subAdmin.user.name}</span>. Do
                  you wish to continue?
               </p>

               <div className="flex gap-x-1">
                  <ActionButton variant="error" onClick={onUnassignClick}>
                     Unassign
                  </ActionButton>
                  <ActionButton onClick={onCancelClicked}>Cancel</ActionButton>
               </div>
            </div>
         )}
      </div>
   )
}
