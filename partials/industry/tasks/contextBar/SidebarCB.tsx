import { useRouter } from 'next/router'

import { Animations } from '@animations'

// componemts
import { Typography, DisplayPrimaryActions } from '@components'
import { AdForRPL } from '@components/sections/industry/ApplyForRPL'

const CreateTaskActions = [
    {
        // link: 'unit-requirements',
        link: '#',
        title: 'Documentation Required',
        description: ' ',
        // image: null, //"./images/dashboardbtn3.png",
        animation: Animations.Industry.GeneralInfo.UnitRequirements,
    },
    {
        link: 'placement-workflow',
        title: 'Documentation Required',
        description: ' ',
        // image: null, //"./images/dashboardbtn4.png",
        animation: Animations.Industry.GeneralInfo.Placement,
    },
]

export const SidebarCB = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-start gap-y-4">
            <AdForRPL short />

            <div className="w-full flex flex-col gap-y-2 mt-2">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Related Links
                </Typography>
                {/* <OtherDocumentLinks /> */}
            </div>

            {/* Other Links */}
            <div className="flex flex-col gap-y-2 mt-2">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Other Links
                </Typography>
                <DisplayPrimaryActions actions={CreateTaskActions} />
            </div>
        </div>
    )
}
