import React from 'react'
import { useRouter } from 'next/router'

// componemts
import { Button, Typography } from '@components'

export const RightSidebarData = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-start gap-y-4">
            <img
                className="w-full h-[180px] object-cover rounded-lg"
                src=""
                alt="Sidebar"
            />
            <Button onClick={() => {}}>Apply For RPL</Button>

            <div className="flex flex-col gap-y-2 mt-2">
                <Typography variant={'title'} color={'gray'}>
                    Related Links
                </Typography>
                {/* <OtherDocumentLinks /> */}
            </div>

            {/* Other Links */}
            <div className="flex flex-col gap-y-2 mt-2">
                <Typography variant={'title'} color={'gray'}>
                    Other Links
                </Typography>
                {/* <PrimaryActionLink
          bgColor={'white'}
          bgHoverColor={'secondary'}
          title={'Documentation Required'}
          desc={' '}
          img={'./images/dashboardbtn.png'}
        /> */}

                {/* <PrimaryActionLink
          bgColor={'white'}
          bgHoverColor={'secondary'}
          title={'Documentation Required'}
          desc={' '}
          img={'./images/dashboardbtn2.png'}
        /> */}
            </div>
        </div>
    )
}
