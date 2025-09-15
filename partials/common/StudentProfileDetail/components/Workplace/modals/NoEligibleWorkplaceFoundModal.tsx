import { Button, GlobalModal, Typography } from '@components'
import React from 'react'
import { MdCancel } from 'react-icons/md'

export const NoEligibleWorkplaceFoundModal = ({
    onCancel,
    onWorkplaceFinderClicked,
}: {
    onCancel: () => void
    onWorkplaceFinderClicked: () => void
}) => {
    return (
        <GlobalModal>
            <div className="max-w-[480px] py-6 px-7 flex flex-col gap-y-10">
                <MdCancel
                    onClick={onCancel}
                    className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="space-y-4">
                    <Typography semibold center>
                        No eligible workplace found
                    </Typography>
                    <Typography variant="small" normal block center>
                        We couldn't find a workplace that meets the student and
                        RTO requirement (distance, course, workplace type and
                        compliance etc ).
                    </Typography>
                </div>

                {/*  */}
                <div className="flex flex-col gap-y-2">
                    <Button
                        text={'Open Workplace Finder'}
                        onClick={() => {
                            onWorkplaceFinderClicked()
                        }}
                    />
                    <Button
                        outline
                        onClick={onCancel}
                        variant="primaryNew"
                        text={'Fix Industries & Re-run'}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
