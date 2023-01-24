import React from 'react'
import { useRouter } from 'next/router'
import { StudentsPrimaryActions } from '@partials/industry'

// componemts
import {
    Button,
    // OtherDocumentLinks,
    DisplayPrimaryActions,
    Typography,
} from '@components'
import { AdForRPL } from '@components/sections/industry/ApplyForRPL'

export const RightSidebarData = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-start gap-y-4">
            {/* <img
                className="w-full h-[180px] object-cover rounded-lg"
                src="https://picsum.photos/800/800"
                alt="Sidebar"
            />
            <Button onClick={() => {}}>Apply For RPL</Button> */}
            <AdForRPL short />

            <div className="flex flex-col gap-y-2 mt-2">
                {/* <Typography variant={'title'} color={'gray'}>
                    Related Links
                </Typography> */}

                {/* <DisplayPrimaryActions actions={StudentsPrimaryActions} /> */}
            </div>

            {/* Other Links */}
            <div className="flex flex-col gap-y-2 mt-2">
                {/* <Typography varient={'text'} color={'gray'}>
          Other Links
        </Typography> */}

                {/* <OtherDocumentLinks /> */}
            </div>
        </div>
    )
}
