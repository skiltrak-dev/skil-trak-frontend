import React from 'react'

// componemts
import {
    // OtherDocumentLinks,
    // PrimaryActionLink,
    Typography,
} from '@components'

export const RightSidebarData = () => {
    return (
        <div className="flex flex-col items-start gap-y-4">
            <div className="flex flex-col gap-y-2 mt-2">
                <Typography variant={'small'} color={'gray'}>
                    Related Links
                </Typography>
                {/* <OtherDocumentLinks /> */}
            </div>

            {/* Other Links */}
            <div className="flex flex-col gap-y-2 mt-2">
                <Typography variant={'small'} color={'gray'}>
                    Other Links
                </Typography>
                {/* <PrimaryActionLink
                    bgColor={'white'}
                    bgHoverColor={'secondary'}
                    title={'Documentation Required'}
                    desc={' '}
                    img={'./images/dashboardbtn.png'}
                />

                <PrimaryActionLink
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
