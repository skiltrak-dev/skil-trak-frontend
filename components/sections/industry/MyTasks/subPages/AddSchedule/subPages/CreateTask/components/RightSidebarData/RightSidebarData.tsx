import React from 'react'
import { useNavigate } from 'react-router-dom'

// componemts
import { Typography, PrimaryActionLink, OtherDocumentLinks } from 'components'
import { AdForRPL } from 'pages/ApplyForRPL'

export const RightSidebarData = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col items-start gap-y-4">
      <AdForRPL short />

      <div className="w-full flex flex-col gap-y-2 mt-2">
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
