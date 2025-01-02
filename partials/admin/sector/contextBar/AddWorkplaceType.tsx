import React from 'react'
import { AddWorkplaceTypeForm } from '../form'
import { Course } from '@types'
import {
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { SelectedWpTypes } from '../components'
import { AdminApi } from '@queries'

export const AddWorkplaceType = ({ course }: { course: Course }) => {
    const wpSelectedTypes = AdminApi.Courses.selectedWpTypes(undefined)

    const [addWpType, addWpTypeResult] = AdminApi.Courses.addWpTypesToCourse()

    const onSubmit = (values: any) => {
        // addWpType({ courseId: course?.id, wpTypeId: values })
    }
    return (
        <div>
            <ShowErrorNotifications result={addWpTypeResult} />
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Course
                </Typography>
                <Typography variant={'label'}>{course?.title}</Typography>
            </div>
            <AddWorkplaceTypeForm
                onSubmit={onSubmit}
                result={addWpTypeResult}
            />

            {/*  */}
            <div className="mt-4">
                <div className="border-b border-gray-200 pb-2">
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Selected Wp Types
                    </Typography>
                </div>

                {/*  */}
                <div className="flex flex-col gap-y-3 mt-2">
                    {wpSelectedTypes?.isLoading ? (
                        <LoadingAnimation />
                    ) : wpSelectedTypes?.isError ? (
                        <NoData text={'There is some technical error'} />
                    ) : wpSelectedTypes?.data &&
                      wpSelectedTypes?.data?.data?.length > 0 ? (
                        wpSelectedTypes?.data?.data?.map((wpType, i) => (
                            <SelectedWpTypes key={i} wpType={wpType} />
                        ))
                    ) : (
                        <NoData text={'No Wp Types Selected'} />
                    )}
                </div>
            </div>
        </div>
    )
}
