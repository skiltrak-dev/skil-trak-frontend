import { ReactElement, useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

// Layouts
import { AdminLayout } from '@layouts'
// Types
import { useNavbar } from '@hooks'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'
import {
    BackButton,
    Button,
    Card,
    InputContentEditor,
    Typography,
    draftToHtmlText,
} from '@components'
import { BsDot } from 'react-icons/bs'
import { TicketUser } from '@partials/admin/Tickets/components'

const Tickets: NextPageWithLayout = () => {
    const router = useRouter()
    const { setTitle } = useNavbar()

    useEffect(() => {
        setTitle('Ticket Detail')
    }, [])

    const methods = useForm({
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        const content = draftToHtmlText(values?.message)
        console.log('Saad', content)
    }

    return (
        <div className="px-4">
            <div className="flex items-center justify-between mb-4">
                <BackButton
                    text={'Tickets'}
                    link={'/portals/admin/tickets?tab=my-open-tickets'}
                />
                <Button text={'Close Ticket'} variant={'dark'} />
            </div>

            <div className="sticky top-2 z-50">
                <Card>
                    <div className="flex justify-between">
                        <div>
                            <Typography variant={'h3'}>
                                <span className="font-bold cursor-pointer">
                                    [#0123] Subject of Ticket
                                </span>
                            </Typography>
                            <div className="flex items-center gap-x-1 mt-1">
                                <div className="rounded-full bg-success uppercase text-[11px] text-white px-1.5 whitespace-pre">
                                    OPEN
                                </div>
                                <BsDot />
                                <Typography
                                    variant={'label'}
                                    color={'text-[#6B7280]'}
                                >
                                    Ticket was opened by
                                </Typography>
                                <div className="rounded-full bg-secondary uppercase text-sm text-black px-1.5 whitespace-pre">
                                    Admin
                                </div>
                                <Typography
                                    variant={'label'}
                                    color={'text-[#6B7280]'}
                                >
                                    On Monday, 5 June, 2023 at 11:00 am
                                </Typography>
                            </div>
                        </div>
                        <div className="flex gap-x-12">
                            <div>
                                <Typography
                                    color={'text-gray-400'}
                                    variant={'xs'}
                                >
                                    Created By:
                                </Typography>
                                <TicketUser
                                    small
                                    ticket={{ user: { name: 'Saad' } }}
                                />
                            </div>
                            <div>
                                <Typography
                                    color={'text-gray-400'}
                                    variant={'xs'}
                                >
                                    Created By:
                                </Typography>
                                <TicketUser
                                    small
                                    ticket={{ user: { name: 'Saad' } }}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col gap-y-4 mt-4">
                {[...Array(10)].map((_, i) => (
                    <div
                        className={`${
                            i % 2 == 1 ? 'bg-gray-100' : ''
                        } border border-gray-300 rounded-md px-4 py-5`}
                    >
                        <div className="flex justify-between items-center">
                            <TicketUser
                                ticket={{
                                    phone: 1234567,
                                    user: { name: 'Saad', email: 'saad.h' },
                                }}
                            />
                            <Typography
                                variant={'label'}
                                color={'text-gray-500'}
                            >
                                Monday 05 June, 2023 - 11:30 am
                            </Typography>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Etiam tincidunt nisl at fermentum tempor. Cras
                            fringilla a eros ac sagittis. Nullam venenatis vel
                            mi quis convallis. Donec mollis vitae nunc sed
                            maximus. Orci varius natoque penatibus et magnis dis
                            parturient montes, nascetur ridiculus mus. Morbi eu
                            fringilla nisi. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus
                            mus. Curabitur a lacus pretium, lobortis lorem sed,
                            tristique justo. Phasellus maximus rhoncus sapien
                            vel ornare. Vivamus facilisis ligula at molestie
                            auctor. Vestibulum odio lacus, luctus a mollis non,
                            egestas ac libero.
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-2 fixed bottom-0 w-[100%-300px]">
                <Card>
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <InputContentEditor
                                name={'message'}
                                label={'Message'}
                            />
                            <Button submit text={'Reply'} variant={'dark'} />
                        </form>
                    </FormProvider>
                </Card>
            </div>
        </div>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
