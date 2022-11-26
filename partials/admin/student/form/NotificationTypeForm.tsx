import { ActionButton, Button } from '@components'
import { useRouter } from 'next/router'
import React from 'react'
import { RiMailSendLine, RiMessage2Line } from 'react-icons/ri'

type Props = {}

export const NotificationTypeForm = ({ onSubmit }: { onSubmit: any }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col gap-y-2'>
      <div>
        <ActionButton variant="light">
          <RiMailSendLine className='text-orange-400' />
          <span>Via Email</span>
        </ActionButton>
      </div>
      <div>
        <ActionButton variant="light">
          <RiMessage2Line className='text-orange-400' />
          <span>Via SMS</span>
        </ActionButton>
      </div>
      <div>
        <Button onClick={() => { router.push('/auth/signup/student/review-info') }} text='Continue'  />
      </div>
    </div>
  )
}
