import { EmptyData, TechnicalError } from '@components'
import { CurrentStudentCard } from './components'

// query
import { LoadingAnimation } from '@components/LoadingAnimation'
import { useGetIndustryWorkplaceQuery } from '@queries'

export const Cancelled = () => {
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
                        title={'There is no any Cancelled Student'}
                        description={'There is no any Cancelled Student'}
                    />
                )
            )}
        </>
    )
}
