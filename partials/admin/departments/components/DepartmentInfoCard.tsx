import { Button, GlobalModal, Typography } from '@components'
import React, { ReactElement, useState } from 'react'
import { MarkAsHodModalVII } from '../modal/MarkAsHodModalVII'

export const DepartmentInfoCard = ({
    subHeading,
    bgColors,
    heading,
    noHod,
}: {
    subHeading?: any
    bgColors: string
    heading?: string
    noHod?: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const onModalCancelClicked = () => {
        setModal(null)
    }
    // const bgColors = [
    //     'bg-[#F7910F0F] bg-opacity-[0.6]',
    //     'bg-[#6B72800D] bg-opacity-[0.5]',
    //     'bg-[#6971DD12] bg-opacity-[0.7]',
    // ]
    // const heading = ['Head of Department', 'Total Coordinators', 'Courses']
    const onClickMarkAsHod = () => {
        setModal(
            <GlobalModal>
                <MarkAsHodModalVII
                    data={noHod}
                    onCancel={onModalCancelClicked}
                />
            </GlobalModal>
        )
    }
    return (
        <>
            {modal && modal}
            <div
                className={`${bgColors} py-4 px-14 min-w-[266px] w-full text-center rounded-xl border-2 border-dashed border-[#1C1D22]/20  whitespace-nowrap`}
            >
                <div className="flex flex-col gap-y-1.5 justify-center items-center">
                    <Typography variant="xs" uppercase color="text-primaryNew">
                        {heading || 'Head of Department'}
                    </Typography>
                    {noHod ? (
                        <Button
                            text={'Mark as HOD'}
                            outline
                            variant="success"
                            onClick={onClickMarkAsHod}
                        />
                    ) : (
                        <Typography
                            variant="label"
                            capitalize
                            color="text-primaryNew"
                            bold
                        >
                            {subHeading ?? 0}
                        </Typography>
                    )}
                </div>
            </div>
        </>
    )
}
