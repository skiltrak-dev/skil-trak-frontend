import { ReactElement, useEffect } from 'react'
import * as yup from 'yup'

// Layouts
import { AdminLayout } from '@layouts'
// Types
import { useNavbar } from '@hooks'
import { NextPageWithLayout } from '@types'
import {
    BackButton,
    Button,
    Card,
    InputContentEditor,
    Select,
    TextInput,
    draftToHtmlText,
    inputEditorErrorMessage,
} from '@components'
import { PageHeading } from '@components/headings'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminApi } from '@queries'
import { htmltotext } from '@utils'

enum TicketType {
    MyOpenTickets = 'my-open-tickets',
    MyClosedTickets = 'my-closed-tickets',
    AllTickets = 'all-tickets',
}

const Tickets: NextPageWithLayout = () => {
    const { setTitle } = useNavbar()

    const subadmins = AdminApi.Workplace.subadminForAssignWorkplace()

    useEffect(() => {
        setTitle('Add Tickets')
    }, [])

    const validationSchema = yup.object({
        assignTO: yup.number().required('Must provide Assign To'),
        subject: yup.string().required('Must provide Subject'),
        // message: yup.string().,
        message: yup
            .mixed()
            .test('Message', 'Must Provide Message', (value) =>
                inputEditorErrorMessage(value)
            ),
        // Profile Information
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: any) => {}

    const subAdminOptions = subadmins?.data?.map((subAdmin: any) => ({
        label: subAdmin?.user?.name,
        value: subAdmin?.id,
    }))

    return (
        <div className="px-4">
            <div className="mt-4">
                <BackButton text={'Ticket'} link={'/portals/admin/tickets'} />
                <PageHeading
                    title={'Create New Ticket'}
                    subtitle={'You can add Ticket here'}
                ></PageHeading>
            </div>
            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <Select
                            label={'Assign TO'}
                            name={'assignTO'}
                            placeholder={'Assign TO...'}
                            options={subAdminOptions}
                            loading={subadmins?.isLoading}
                            disabled={subadmins?.isLoading}
                            onlyValue
                        />
                        <TextInput
                            label={'Subject'}
                            name={'subject'}
                            placeholder={'Subject...'}
                            validationIcons
                            required
                        />

                        <InputContentEditor
                            name={'message'}
                            label={'Message'}
                        />

                        <Button submit text={'Open Ticket'} />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}

Tickets.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Tickets
