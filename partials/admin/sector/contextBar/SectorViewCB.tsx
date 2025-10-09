import {
    ActionButton,
    ContextBarLoading,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Sector } from '@types'
import { useState } from 'react'
import { IndustryCheckFolder } from '../components'
import { AddSectoIndustryChecksForm } from '../form'

export const SectorViewCB = ({ sector }: { sector: Sector }) => {
    const { notification } = useNotification()

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false)

    const industryChecks = AdminApi.Sectors.getIndustryChecks(sector?.id)
    const [addIndustryChecks, addIndustryChecksResult] =
        AdminApi.Sectors.addIndustryChecks()

    const onSubmit = async (values: any) => {
        const res: any = await addIndustryChecks({
            sector: sector?.id,
            ...values,
        })

        if (res?.data) {
            notification.success({
                title: 'Industry Check Added',
                description: 'Industry Check Added Successfully',
            })
            setIsAddFolder(false)
        }
    }

    return (
        <div>
            <ShowErrorNotifications result={addIndustryChecksResult} />
            <div>
                <Typography variant={'muted'} color={'text-gray-400'}>
                    Title
                </Typography>
                <Typography variant={'label'}>{sector?.name}</Typography>
            </div>

            <div className="flex items-center justify-between border-b">
                <div>
                    <Typography variant="muted" color="text-gray-400">
                        Code
                    </Typography>
                    <Typography variant="label">{sector?.code}</Typography>
                </div>
            </div>

            {/*  */}

            {isAddFolder ? (
                <div className="mt-4">
                    <Typography variant={'muted'} color={'text-gray-400'}>
                        Add Industry Checks
                    </Typography>
                    <AddSectoIndustryChecksForm
                        onSubmit={onSubmit}
                        result={addIndustryChecksResult}
                        onCancel={() => setIsAddFolder(false)}
                        sectorId={sector?.id}
                    />
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant={'muted'} color={'text-gray-400'}>
                            Industry Checks
                        </Typography>

                        <ActionButton
                            variant="info"
                            simple
                            onClick={() => setIsAddFolder(true)}
                        >
                            + Add Folder
                        </ActionButton>
                    </div>

                    {industryChecks?.isLoading ? (
                        <ContextBarLoading />
                    ) : industryChecks?.isError ? (
                        <NoData text="There is some technical issue!" isError />
                    ) : industryChecks?.data?.data &&
                      industryChecks?.data?.data?.length > 0 ? (
                        <div>
                            {industryChecks?.data?.data?.map(
                                (industryCheck: any) => (
                                    <IndustryCheckFolder
                                        key={industryCheck}
                                        industryCheck={industryCheck}
                                        sectorId={sector?.id}
                                    />
                                )
                            )}
                        </div>
                    ) : (
                        <NoData text="There is no industry checks!" />
                    )}
                </div>
            )}
        </div>
    )
}
