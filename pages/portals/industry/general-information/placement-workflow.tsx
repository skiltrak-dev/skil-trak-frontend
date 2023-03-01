import { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import { Typography, BackButton, DocumentView } from '@components'

// Context
import { useContextBar } from '@hooks'

const PlacementWorkflow: NextPageWithLayout = () => {
    const router = useRouter()
    const { query } = router

    const { setContent } = useContextBar()

    return (
        <div>
            <BackButton link={'/portals/industry/general-information'} text={'Back To Dashboard'} />

            {/* Data */}
            <DocumentView
                title={'Placement Workflow'}
                downloadLink={
                    'http://www.africau.edu/images/default/sample.pdf'
                }
            >
                <Typography variant={'title'}>Section 1</Typography>
                <div className="flex flex-col gap-y-3 my-2.5">
                    <Typography>
                        Lorem ipsum dolor sit amet. Quo dolore repellat qui
                        culpa voluptates est dolor perspiciatis qui voluptatem
                        placeat. Eos fugiat internos aut autem vero sed placeat
                        odit aut eaque porro qui explicabo voluptas 33 odit
                        asperiores.
                    </Typography>
                    <Typography>
                        Vel commodi repellat et repellat error ut minima tenetur
                        id magnam iure 33 nisi quisquam At error cumque. Et
                        sequi eligendi sed corrupti perferendis in consequatur
                        expedita et enim galisum non reiciendis repudiandae qui
                        fugiat dolorum.
                    </Typography>
                    <Typography>
                        Quo dolorum eius quisquam debitis sit quisquam
                        doloremque! Est earum voluptas nam vero sequi sed
                        maiores esse et quidem dicta sed eveniet animi.
                    </Typography>
                </div>

                {/* Section 2 */}
                <Typography variant={'title'}>Section 2</Typography>
                <div className="flex flex-col gap-y-3 my-2.5">
                    <Typography>
                        Lorem ipsum dolor sit amet. Quo dolore repellat qui
                        culpa voluptates est dolor perspiciatis qui voluptatem
                        placeat. Eos fugiat internos aut autem vero sed placeat
                        odit aut eaque porro qui explicabo voluptas 33 odit
                        asperiores.
                    </Typography>
                    <Typography>
                        Vel commodi repellat et repellat error ut minima tenetur
                        id magnam iure 33 nisi quisquam At error cumque. Et
                        sequi eligendi sed corrupti perferendis in consequatur
                        expedita et enim galisum non reiciendis repudiandae qui
                        fugiat dolorum.
                    </Typography>
                    <Typography>
                        Quo dolorum eius quisquam debitis sit quisquam
                        doloremque! Est earum voluptas nam vero sequi sed
                        maiores esse et quidem dicta sed eveniet animi.
                    </Typography>
                </div>
            </DocumentView>
        </div>
    )
}

PlacementWorkflow.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default PlacementWorkflow
