import moment from 'moment'
import React from 'react'
import { RiBook2Fill } from 'react-icons/ri'
import {
    Button,
    TechnicalError,
    EmptyData,
    Card,
    Typography,
} from '@components'
import {
    CurrentStudentCard,
    Notes,
    StudentAvailability,
    StudentDetail,
} from './components'

// query
import { useGetIndustryWorkplaceQuery } from '@queries'
import { LoadingAnimation } from '@components/LoadingAnimation'

export const Rejected = () => {
    // query
    const industryWorkplace = useGetIndustryWorkplaceQuery({})

    return (
        <>
            {industryWorkplace.isError && <TechnicalError />}
            {industryWorkplace.isLoading && industryWorkplace.isFetching ? (
                <LoadingAnimation />
            ) : industryWorkplace.data && industryWorkplace.data.length > 0 ? (
                <div className="flex flex-col gap-y-2">
                    {industryWorkplace?.data?.map((workplace: any) => (
                        <CurrentStudentCard
                            key={workplace.id}
                            workplace={workplace}
                        />
                    ))}
                </div>
            ) : (
                !industryWorkplace.isError && (
                    <EmptyData
                        title={'There is no any Rejected Student'}
                        description={'There is no any Rejected Student'}
                    />
                )
            )}
        </>
    )
}
