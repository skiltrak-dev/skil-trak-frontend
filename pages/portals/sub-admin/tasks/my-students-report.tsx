import { ReactElement, useEffect, useState } from 'react'
// Layouts
import { SubAdminLayout } from '@layouts'
// Types
import {
    Card,
    Select,
    workplaceProgressOptions,
    Typography,
    Button,
} from '@components'
import { CalendarStyles } from '@components/Calendar/style'
import Calendar from 'react-calendar'

import { CommonApi } from '@queries'
import { NextPageWithLayout } from '@types'
import OutsideClickHandler from 'react-outside-click-handler'
import { RiTimerLine } from 'react-icons/ri'
import {
    QueryType,
    WorkplaceCurrentStatus,
    getUserCredentials,
    queryToUrl,
    removeEmptyValues,
} from '@utils'
import moment from 'moment'

const MyStudentsReport: NextPageWithLayout = () => {
    const weekEnd = new Date()
    weekEnd.setDate(weekEnd.getDate() - 6)
    const [startDate, setStartDate] = useState<any>(weekEnd)
    const [endDate, setEndDate] = useState<any>(new Date())
    const [showCalendars, setShowCalendars] = useState<boolean>(false)
    const [dateRange, setDateRange] = useState<any>('')
    const [formValues, setFormValues] = useState<{
        rtoId: number | null
        courseId: number | null
        currentStatus: WorkplaceCurrentStatus
    }>({
        rtoId: null,
        courseId: null,
        currentStatus: '' as WorkplaceCurrentStatus,
    })

    useEffect(() => {
        const date = new Date()
        setDateRange(
            `${date.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
        )
    }, [])

    const getRtos = CommonApi.Filter.useSubAdminRtos()
    const getCourses = CommonApi.Filter.useCourses()

    const rtoOptions = getRtos?.data?.map((rto: any) => ({
        value: rto?.id,
        label: rto?.user?.name,
    }))

    const coursesOptions = getCourses?.data?.map((course: any) => ({
        value: course?.id,
        label: course?.title,
    }))

    const handleFormChange = (e: any, name: string) => {
        setFormValues({
            ...formValues,
            [name]: e?.value,
        })
    }

    return (
        <Card>
            <div className="grid grid-cols-3 gap-x-3">
                <Select
                    label={'Rto'}
                    name={'rtoId'}
                    options={rtoOptions}
                    placeholder={'Select Search By Rto...'}
                    onChange={(e: any) => {
                        handleFormChange(e, 'rtoId')
                    }}
                    loading={getRtos.isLoading}
                    disabled={getRtos.isLoading}
                />

                <Select
                    label={'Courses'}
                    name={'courseId'}
                    options={coursesOptions}
                    placeholder={'Select Courses...'}
                    onChange={(e: any) => {
                        handleFormChange(e, 'courseId')
                    }}
                    loading={getCourses.isLoading}
                    disabled={getCourses.isLoading}
                />
                <div>
                    <Typography variant={'label'}>Enter Range</Typography>
                    <OutsideClickHandler
                        onOutsideClick={() => setShowCalendars(false)}
                    >
                        <div className="relative mt-auto">
                            <div
                                onClick={() => setShowCalendars(!showCalendars)}
                                className="flex cursor-pointer items-center gap-x-2 bg-gray-100 px-4 py-2 rounded"
                            >
                                <RiTimerLine className="text-gray-400 " />
                                <button>{dateRange ? dateRange : null}</button>
                            </div>
                            {showCalendars && (
                                <div className="absolute top-10 right-0 min-w-[500px] calendars-container z-20">
                                    <Card>
                                        <div className="flex justify-between w-full">
                                            <CalendarStyles>
                                                <Calendar
                                                    onChange={(date: Date) => {
                                                        setStartDate(date)
                                                        setDateRange(
                                                            `${date.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
                                                        )
                                                    }}
                                                    value={startDate}
                                                />
                                            </CalendarStyles>
                                            <CalendarStyles>
                                                <Calendar
                                                    onChange={(date: Date) => {
                                                        const monthEnd =
                                                            new Date(date)
                                                        monthEnd.setDate(
                                                            monthEnd.getDate() +
                                                                30
                                                        )
                                                        setEndDate(date)
                                                        setDateRange(
                                                            `${startDate.toLocaleDateString()} - ${date.toLocaleDateString()}`
                                                        )
                                                    }}
                                                    value={endDate}
                                                />
                                            </CalendarStyles>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </OutsideClickHandler>
                </div>

                <Select
                    label={'Workplace Progress'}
                    name={'currentStatus'}
                    options={workplaceProgressOptions}
                    placeholder={'Select Progress...'}
                    onChange={(e: any) => {
                        handleFormChange(e, 'currentStatus')
                    }}
                />
                <div></div>
                <div className="flex justify-end items-center">
                    <a
                        href={`${
                            process.env.NEXT_PUBLIC_END_POINT
                        }/subadmin/students/download/csv/${
                            getUserCredentials()?.id
                        }?${queryToUrl(
                            removeEmptyValues({
                                ...formValues,
                                startDate:
                                    moment(startDate).format('YYYY-MM-DD'),
                                endDate: moment(endDate)
                                    .add(1, 'days')
                                    .format('YYYY-MM-DD'),
                            })
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {' '}
                        <Button text={'Download'} variant={'dark'} />
                    </a>
                </div>
            </div>
        </Card>
    )
}

MyStudentsReport.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'My Students Report' }}>
            {page}
        </SubAdminLayout>
    )
}

export default MyStudentsReport
