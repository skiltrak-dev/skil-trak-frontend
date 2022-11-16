import React from 'react'
import { useRouter } from 'next/router'

// componemts
import {
  Button,
  OtherDocumentLinks,
  PrimaryActionLink,
  Typography,
} from 'components'

export const RightSidebarData = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-start gap-y-4">
      <img
        className="w-full h-[180px] object-cover rounded-lg"
        src="https://picsum.photos/800/800"
        alt="Sidebar"
      />
      <Button
        border={'2'}
        borderColor={'primary'}
        bgColor={'primary'}
        onClick={() => navigate('/apply-for-rpl')}
      >
        Apply For RPL
      </Button>

      <div className="flex flex-col gap-y-2 mt-2">
        <Typography varient={'text'} color={'gray'}>
          Related Links
        </Typography>
        <OtherDocumentLinks />
      </div>

      {/* Other Links */}
      <div className="flex flex-col gap-y-2 mt-2">
        <Typography varient={'text'} color={'gray'}>
          Other Links
        </Typography>
        <PrimaryActionLink
          bgColor={'white'}
          bgHoverColor={'secondary'}
          title={'Documentation Required'}
          desc={'Some helping text'}
          img={'./images/dashboardbtn.png'}
        />

        <PrimaryActionLink
          bgColor={'white'}
          bgHoverColor={'secondary'}
          title={'Documentation Required'}
          desc={'Some helping text'}
          img={'./images/dashboardbtn2.png'}
        />
      </div>
    </div>
  )
}
