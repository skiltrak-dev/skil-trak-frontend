import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// components
import { Button, BackButton, Card, DocumentView, Typography } from '@components'

// Context
import { useContextBar } from '@hooks'

const IndustryConsultation: NextPageWithLayout = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col gap-y-2">
            <BackButton
                link={'/portals/industry/general-information'}
                text={'Back To Dashboard'}
            />

            {/* Data */}
            <DocumentView
                title={'Industry Consultation'}
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
            </DocumentView>

            <Card>
                <Typography variant={'subtitle'}>
                    Want to become a consultant?
                </Typography>

                <div className="flex items-center gap-x-4 mt-4">
                    <Button
                        variant={'success'}
                        text={'Yes'}
                        onClick={() =>
                            router.push(
                                '/portals/industry/general-information/consultation'
                            )
                        }
                    />

                    <Button variant={'primary'} text={'Confirm Upon Request'} />
                    <Button text={'No'} variant={'error'} />
                </div>
            </Card>
        </div>
    )
}

IndustryConsultation.getLayout = (page: ReactElement) => {
    return <IndustryLayout>{page}</IndustryLayout>
}

export default IndustryConsultation
