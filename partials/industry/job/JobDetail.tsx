import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

// Icons
import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'

// components
import { BackButton, Card, LoadingAnimation, TableAction } from '@components'
import { JobDetailData } from './components'
import { DeleteModal } from './modals'

// redux
import { EmptyData } from '@components'
import { useGetJobDetailQuery } from '@queries'
import { getThemeColors } from '@theme'

const Colors = getThemeColors()

export const JobDetailContainer = () => {
    //  param
    const router = useRouter()
    const { id } = router.query

    const [modal, setModal] = useState<ReactElement | null>(null)

    const { data, isLoading, isError } = useGetJobDetailQuery(id, {
        skip: !id,
    })

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onDeleteClicked = (job: any) => {
        setModal(
            <DeleteModal job={job} onCancel={() => onModalCancelClicked()} />
        )
    }

    const TableActionOption = [
        {
            text: 'Edit',
            Icon: MdEdit,
            onClick: () => {
                router.push(`/portals/industry/jobs/form/${id}`)
            },
        },
        {
            text: 'Delete',
            style: 'error',
            Icon: AiFillDelete,
            onClick: (job: any) => onDeleteClicked(job),
        },
    ]

    return (
        <div>
            {modal}
            <div className="flex justify-between items-center mb-2">
                <>
                    <BackButton
                        link={'/portals/industry/jobs/advertised-jobs'}
                        text={'Back To Jobs'}
                    />
                    {data && (
                        <TableAction
                            options={TableActionOption}
                            rowItem={data}
                        />
                    )}
                </>
            </div>

            {/* Alert */}
            {/* {showAlerts && showAlerts} */}

            {/*  */}
            <Card>
                {!isLoading ? (
                    data ? (
                        <JobDetailData data={data} />
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Job Detail'}
                                description={
                                    'No job detail were found on your request'
                                }
                            />
                        )
                    )
                ) : (
                    <LoadingAnimation />
                )}
            </Card>
        </div>
    )
}
