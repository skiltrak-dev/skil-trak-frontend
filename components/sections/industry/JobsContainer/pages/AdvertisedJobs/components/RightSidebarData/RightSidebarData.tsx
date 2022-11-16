import React from 'react'
import { useRouter } from 'next/router'

// componemts
import { Button, OtherDocumentLinks } from 'components'

export const RightSidebarData = () => {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col">
        <Button
          variant={'dark'}
          onClick={() => router.push('/jobs/advertise-new-job')}
        >
          Advertise New Job
        </Button>
      </div>
      <OtherDocumentLinks />
    </>
  )
}
