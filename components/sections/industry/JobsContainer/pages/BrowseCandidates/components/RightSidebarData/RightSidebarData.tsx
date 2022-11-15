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
      <Button onClick={() => router.push('/apply-for-rpl')}>
        Apply For RPL
      </Button>

      <div className="flex flex-col gap-y-2 mt-2">
        <Typography varient={'text'} color={'gray'}>
          Related Links
        </Typography>

        <PrimaryActionLink
          link={'general-information/unit-requirements'}
          border={'1'}
          bgColor={'white'}
          bgHoverColor={'secondary'}
          borderColor={'secondary'}
          shadow={1}
          title={'Unit Requirement'}
          desc={'Some helping text'}
          img={'./images/dashboardbtn5.png'}
        />
        <PrimaryActionLink
          border={'1'}
          link={'general-information/industry-consultation'}
          bgColor={'white'}
          bgHoverColor={'secondary'}
          borderColor={'secondary'}
          shadow={1}
          title={'Industry Consultation'}
          desc={'Some helping text'}
          img={'./images/dashboardbtn7.png'}
        />
        <PrimaryActionLink
          border={'1'}
          link={'general-information/mou'}
          bgColor={'white'}
          bgHoverColor={'secondary'}
          borderColor={'secondary'}
          shadow={1}
          title={'MoU'}
          desc={'Memorandum Of Understanding'}
          img={'./images/dashboardbtn8.png'}
        />
      </div>

      {/* Other Links */}
      <div className="w-full flex flex-col gap-y-2 mt-2">
        <Typography varient={'text'} color={'gray'}>
          Other Links
        </Typography>

        <OtherDocumentLinks />
      </div>
    </div>
  )
}
