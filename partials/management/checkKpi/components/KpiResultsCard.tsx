import { Button, GlobalModal, Select, Typography, TextArea } from '@components'
import { InfoTabCard } from './InfoTabCard'
import { LuDownload } from 'react-icons/lu'
import { ReactElement, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { ManagementApi } from '@queries'
import { ViewFeedbackModal } from '@partials/management/team'

const infoTabCardData = [
    {
        title: 'Sub-Admin',
        description: 'Haroon Aziz',
    },
    {
        title: 'Result Date',
        description: 'Nov 20, 2022  -  Nov 27, 2022',
    },
    {
        title: 'First Time Student',
        description: '124 Student',
    },
    {
        title: 'Student Duplication',
        description: '20 Student',
    },
]

const filterOptions = [
    {
        label: 'Appointments',
        value: 'appointment',
    },
    {
        label: 'Student Provided',
        value: 'studentProvided',
    },
    {
        label: 'Placement Started',
        value: 'placementStarted',
    },
    {
        label: 'Agreements uploaded',
        value: 'agreementUploaded',
    },
]
export const KpiResultsCard = ({
    handleTabChange,
    activeTab,
    setFilter,
}: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const reportId = router.query.reportId
    const memberId = router.query.memberId

    const { data, isLoading, isError } =
        ManagementApi.CheckKpi.useKpiReportOverview(reportId, {
            skip: !reportId,
        })
    const [addFeedback, addFeedbackResult] =
        ManagementApi.CheckKpi.useAddFeedbackOnKpiReport()
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        // defaultValues: initialValues,
        mode: 'all',
    })
    const onCancel = () => {
        setModal(null)
    }

    const onAddFeedback = () => {
        // if (applyForTalentPoolResult.isSuccess) {
        setModal(
            <GlobalModal>
                <div className="px-12 py-10 overflow-auto remove-scrollbar">
                    <FormProvider {...methods}>
                        <form
                            className="w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div className="flex justify-center">
                                <Typography
                                    variant={'title'}
                                    color={'text-primaryNew'}
                                    semibold
                                >
                                    FEEDBACK
                                </Typography>
                            </div>
                            <TextArea
                                placeholder="Feedback..."
                                name="feedback"
                                rows={10}
                            />
                            <div className="flex items-center justify-center gap-x-3">
                                <Button
                                    variant="primaryNew"
                                    text="Add feedback"
                                    submit
                                />
                                <Button
                                    variant="error"
                                    text="cancel"
                                    onClick={onCancel}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </GlobalModal>
        )
        // }
    }

    const onViewFeedback = () => {
        setModal(
            <GlobalModal>
                <ViewFeedbackModal onCancel={onCancel} />
            </GlobalModal>
        )
    }

    const onSubmit = async (values: any) => {
        const data = {
            id: reportId,
            body: { member: Number(memberId), comment: values.feedback },
        }
        console.log('data::::feedback', data)
        addFeedback(data)
        // onCancel()
        // methods.reset()
    }
    return (
        <>
            {modal && modal}
            <div className="bg-white/80 rounded-md w-full">
                <div className="px-6 py-4 flex justify-between items-center">
                    <Typography variant="label" bold color="text-primaryNew">
                        Results
                    </Typography>
                    {/* <a href="#" className="flex items-center gap-x-1.5">
                        <LuDownload className="text-primaryNew" />
                        <div className="underline text-primaryNew">
                            <Typography variant="body" color="text-primaryNew">
                                Download Result
                            </Typography>
                        </div>
                    </a> */}
                </div>
                <div className="flex justify-between items-center border-t border-b px-6 py-2.5 ">
                    <div className="flex items-center gap-x-4">
                        <InfoTabCard
                            title={'Sub-Admin'}
                            description={data?.member?.subadmin?.user?.name}
                        />
                        <InfoTabCard
                            title={'First Time Student'}
                            description={data?.kpiReportData}
                        />
                        <InfoTabCard
                            title={'Student Duplication'}
                            description={data?.kpiDuplications}
                        />
                        {/* First Time Student */}
                    </div>
                    <div className="flex items-center gap-x-6">
                        <div
                            onClick={onViewFeedback}
                            className="underline text-primaryNew cursor-pointer"
                        >
                            <Typography variant="body" color="text-primaryNew">
                                View Feedback
                            </Typography>
                        </div>

                        <Button
                            onClick={onAddFeedback}
                            variant="primaryNew"
                            text="Feedback"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between p-5">
                    {/* Tabs */}
                    <div className="flex gap-x-10 ">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleTabChange('firstTimeStudent')
                                setFilter('')
                            }}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'firstTimeStudent'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'firstTimeStudent'}
                            >
                                First Time Student
                            </Typography>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleTabChange('studentDuplication')
                                setFilter('')
                            }}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'studentDuplication'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'studentDuplication'}
                            >
                                Student Duplication
                            </Typography>
                        </div>
                    </div>
                    {/* Download Link */}
                    <div className={`flex items-center gap-x-2`}>
                        <div className="mb-4">
                            <Typography variant="small">
                                Showing Results:
                            </Typography>
                        </div>
                        <div className="min-w-[280px]">
                            <Select
                                name="filter"
                                options={filterOptions}
                                placeholder="Select Status..."
                                onlyValue
                                onChange={(e: any) => setFilter(e || undefined)}
                                shadow="shadow-md"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between p-5">
                    {/* Tabs */}
                    <div className="flex gap-x-10 ">
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleTabChange('firstTimeStudent')
                                setFilter('')
                            }}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'firstTimeStudent'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'firstTimeStudent'}
                            >
                                First Time Student
                            </Typography>
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                handleTabChange('studentDuplication')
                                setFilter('')
                            }}
                        >
                            <Typography
                                variant="small"
                                color={
                                    activeTab === 'studentDuplication'
                                        ? 'text-primaryNew'
                                        : 'text-gray-400'
                                }
                                bold={activeTab === 'studentDuplication'}
                            >
                                Student Duplication
                            </Typography>
                        </div>
                    </div>
                    {/* Download Link */}
                    <div className={`flex items-center gap-x-2`}>
                        <div className="mb-4">
                            <Typography variant="small">
                                Showing Results:
                            </Typography>
                        </div>
                        <div className="min-w-[280px]">
                            <Select
                                name="filter"
                                options={filterOptions}
                                placeholder="Select Status..."
                                onlyValue
                                onChange={(e: any) => setFilter(e || undefined)}
                                shadow="shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
