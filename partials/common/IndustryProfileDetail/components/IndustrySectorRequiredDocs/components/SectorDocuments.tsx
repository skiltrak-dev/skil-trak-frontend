import React, { ReactElement, useState } from 'react'
import { IndustryApi } from '@queries'
import { Button, LoadingAnimation, NoData, Typography } from '@components'
import { SectorIndustryDocs } from './SectorIndustryDocs'
import { Industry } from '@types'
import { AddCustomSectorFolderModal } from '../modals'
import { CustomSectorDoc } from './CustomSectorDoc'

export const SectorDocuments = ({
    industry,
    selectedSector,
}: {
    industry: Industry
    selectedSector: number | null
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const docs = IndustryApi.Folders.getIndustryRequiredDocs(
        { sectorId: Number(selectedSector), industryId: industry?.id },
        {
            skip: !selectedSector,
        }
    )

    const onCancel = () => setModal(null)

    const onViewAddCustomSectorDocs = () => {
        setModal(
            <AddCustomSectorFolderModal
                onCancel={onCancel}
                industryId={industry?.id}
                selectedSector={selectedSector}
            />
        )
    }

    return (
        <div className="mt-3">
            {modal}
            <div className="flex flex-col md:flex-row gap-x-4 md:justify-between">
                <div>
                    <Typography variant="label" medium>
                        Please select documents you want to require from
                        students
                    </Typography>
                    <Typography variant={'small'}>
                        Only selected documents will be required
                    </Typography>
                </div>
                <div className="flex items-start gap-x-2">
                    <Button
                        variant="info"
                        onClick={() => {
                            onViewAddCustomSectorDocs()
                        }}
                    >
                        <span className="whitespace-pre">Add Custom</span>
                    </Button>
                </div>
            </div>
            {docs?.isError ? (
                <NoData text="There is some technical issue!" />
            ) : null}
            {docs?.isLoading || docs?.isFetching ? (
                <LoadingAnimation size={70} />
            ) : docs?.data && docs?.data?.length > 0 && docs?.isSuccess ? (
                <div className="grid  grid-cols-1 gap-x-7 gap-y-2 my-2 ">
                    {docs?.data
                        ?.filter((doc: any) => !doc?.isCustom)
                        ?.map((doc: any) => (
                            <SectorIndustryDocs
                                key={doc?.id}
                                doc={doc}
                                folder={{
                                    folderId: doc?.folder_id,
                                    documentId: doc?.documents_id,
                                    courseId: doc?.folder_courseId,
                                    isCustom: doc?.folder_isCustom,
                                }}
                                industry={industry}
                            />
                        ))}
                </div>
            ) : (
                docs?.isSuccess && <NoData text="" />
            )}

            {/*  */}
            {docs?.isLoading || docs?.isFetching ? (
                <LoadingAnimation size={70} />
            ) : docs?.data &&
              docs?.data?.filter((doc: any) => doc?.isCustom)?.length > 0 &&
              docs?.isSuccess ? (
                <>
                    <div className="mt-4 mb--2">
                        <Typography variant={'muted'} color={'gray'}>
                            Custom Requirements
                        </Typography>
                    </div>

                    <div className="grid grid-cols-1 gap-x-7 gap-y-2 my-2 ">
                        {docs?.data
                            ?.filter((doc: any) => doc?.isCustom)
                            ?.map((doc: any) => (
                                <div>
                                    <div className="text-xs font-semibold flex justify-between py-1 mt-1">
                                        <span className="w-2/5 flex-grow">
                                            Folder
                                        </span>
                                        <span className="w-2/5 text-center">
                                            Is Required
                                        </span>

                                        <span className="w-1/5 text-center">
                                            Actions
                                        </span>
                                    </div>
                                    <CustomSectorDoc
                                        key={doc?.id}
                                        doc={doc}
                                        folder={{
                                            folderId: doc?.folder_id,
                                            documentId: doc?.documents_id,
                                            courseId: doc?.folder_courseId,
                                            isCustom: doc?.folder_isCustom,
                                        }}
                                        industry={industry}
                                    />
                                </div>
                            ))}
                    </div>
                </>
            ) : null}
        </div>
    )
}
