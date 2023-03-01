import { useEffect } from 'react'

// Icons

// components
import {
    ActionAlert,
    ActionButton,
    BackButton,
    Card,
    DocumentView,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { RightSidebarData } from './components/RightSidebarData/RightSidebarData'

// Context
import { useRequestAVolunteerMutation } from '@queries'
import { useContextBar, useNotification } from 'hooks'
import { useRouter } from 'next/router'

export const RequestAVolunteerStudent = () => {
    const { setContent, show } = useContextBar()
    const router = useRouter()

    // query
    const [requestAVolunteer, requestAVolunteerResult] =
        useRequestAVolunteerMutation()

    useEffect(() => {
        setContent(
            <>
                <RightSidebarData />
            </>
        )
        show(false)
    }, [setContent])

    const onVolunteer = () => {
        requestAVolunteer()
    }

    return (
        <>
            <ShowErrorNotifications result={requestAVolunteerResult} />
            {requestAVolunteerResult.isSuccess ? (
                <Card>
                    <ActionAlert
                        title={'Successfully requested a volunteer student'}
                        description={
                            'You will be redirected to jobs in a moment.'
                        }
                    />
                </Card>
            ) : (
                <>
                    <BackButton link={'/portals/industry/students'} text={'Back To Dashboard'} />

                    {/* Data */}
                    <DocumentView title={'Request A Volunteer Student'}>
                        <Typography variant={'title'}>Section 1</Typography>
                        <div className="flex flex-col gap-y-3 my-2.5">
                            <Typography>
                                Lorem ipsum dolor sit amet. Quo dolore repellat
                                qui culpa voluptates est dolor perspiciatis qui
                                voluptatem placeat. Eos fugiat internos aut
                                autem vero sed placeat odit aut eaque porro qui
                                explicabo voluptas 33 odit asperiores.
                            </Typography>
                            <Typography>
                                Vel commodi repellat et repellat error ut minima
                                tenetur id magnam iure 33 nisi quisquam At error
                                cumque. Et sequi eligendi sed corrupti
                                perferendis in consequatur expedita et enim
                                galisum non reiciendis repudiandae qui fugiat
                                dolorum.
                            </Typography>
                            <Typography>
                                Quo dolorum eius quisquam debitis sit quisquam
                                doloremque! Est earum voluptas nam vero sequi
                                sed maiores esse et quidem dicta sed eveniet
                                animi.
                            </Typography>

                            <div className="w-full mt-6 flex gap-x-2">
                                {/* TODO 500 error */}
                                <ActionButton
                                    variant={'dark'}
                                    onClick={onVolunteer}
                                    loading={requestAVolunteerResult.isLoading}
                                    disabled={requestAVolunteerResult.isLoading}
                                >
                                    {' '}
                                    Yes{' '}
                                </ActionButton>
                                <ActionButton
                                    variant={'error'}
                                    onClick={() =>
                                        router.push(
                                            '/portals/industry/students'
                                        )
                                    }
                                >
                                    No
                                </ActionButton>
                            </div>
                        </div>
                    </DocumentView>
                </>
            )}
        </>
    )
}
