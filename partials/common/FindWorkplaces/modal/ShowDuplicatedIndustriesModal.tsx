import { Modal, Typography } from '@components'
import React from 'react'

export const ShowDuplicatedIndustriesModal = ({
    onCancel,
    listResult,
}: {
    listResult: any
    onCancel: () => void
}) => {
    const duplicatedIndustries = (source: string) =>
        listResult?.errorMails?.filter(
            (ind: { source: string }) => ind?.source === source
        )
    return (
        <Modal
            showActions={false}
            title={'Duplicated Industries'}
            subtitle={'All Duplicated Industries!'}
        >
            <div className="mt-5">
                {listResult?.errorMails &&
                listResult?.errorMails?.length > 0 ? (
                    <div className="flex flex-col gap-y-1">
                        {duplicatedIndustries('listing') &&
                            duplicatedIndustries('listing')?.length > 0 && (
                                <div>
                                    <Typography
                                        variant={'label'}
                                        semibold
                                        color={'text-gray-800'}
                                    >
                                        Emails Already Being Used in Industries
                                        Listing
                                    </Typography>
                                    {duplicatedIndustries('listing')?.map(
                                        (ind: { email: string }) => (
                                            <div className="bg-gray-100 rounded-md px-3 py-1">
                                                <Typography
                                                    variant={'small'}
                                                    color={'text-red-500'}
                                                >
                                                    {ind?.email}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                        {duplicatedIndustries('signed-up') &&
                            duplicatedIndustries('signed-up')?.length > 0 && (
                                <div>
                                    <Typography
                                        variant={'label'}
                                        semibold
                                        color={'text-gray-800'}
                                    >
                                        Emails Already Being Used in Industries
                                    </Typography>
                                    {duplicatedIndustries('signed-up')?.map(
                                        (ind: { email: string }) => (
                                            <div className="bg-gray-100 rounded-md px-3 py-1">
                                                <Typography
                                                    variant={'small'}
                                                    color={'text-red-500'}
                                                >
                                                    {ind?.email}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                    </div>
                ) : null}
            </div>
        </Modal>
    )
}
