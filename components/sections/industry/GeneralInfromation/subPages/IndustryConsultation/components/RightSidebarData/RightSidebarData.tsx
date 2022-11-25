import React from 'react'
import { useRouter } from 'next/router'

// componemts
import {
  Button,
  // OtherDocumentLinks,
  Typography,
  DisplayPrimaryActions,
} from '@components'
import { GeneralInfoPrimaryActions } from '@components/sections/industry/GeneralInfromation/GeneralInfromation'

export const RightSidebarData = () => {
  const router = useRouter()
  return (
    <div className="w-full flex flex-col items-start gap-y-4">
      <img
        className="w-full h-[180px] object-cover rounded-lg"
        src="https://picsum.photos/800/800"
        alt="Sidebar"
      />
      <Button onClick={() => {}}>Apply For RPL</Button>

      <div className="flex flex-col gap-y-2 mt-2">
        <Typography variant={'small'} color={'text-gray-700'}>
          Related Links
        </Typography>

        <DisplayPrimaryActions actions={GeneralInfoPrimaryActions} />
      </div>

    </div>
  )
}
