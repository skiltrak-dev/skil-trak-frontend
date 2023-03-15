import React, { useEffect } from 'react'
import { Typography, Button, Card, InitialAvatar } from '@components'

// query
import { useApplyWorkplaceWithAbnIndustryMutation } from '@queries'

export const ExistingIndustryCard = ({
    industry,
    setActive,
    setWorkplaceData,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyWorkplaceWithAbnIndustryMutation()

    useEffect(() => {
        if (applyForWorkplaceResult.isSuccess) {
            // setWorkplaceData(applyForWorkplaceResult?.data?.workplaceRequest)
            setActive((active: number) => active + 1)
        }
    }, [applyForWorkplaceResult])

    return (
        <div>
            <Card>
                <div className="mb-4">
                    <Typography variant={'subtitle'}>
                        We found following industry
                    </Typography>
                    <Typography variant={'small'} color={'text-gray-400'}>
                        This is result of ABN number you have provided{' '}
                        <i>{industry.abn}</i>
                    </Typography>
                </div>

                <Typography variant={'small'} color={'text-gray-500'}>
                    You can carry on by clicking &apos;Apply Here&apos; button
                </Typography>
                <div className="mt-1 bg-gray-100 py-2 px-4 rounded-lg flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={industry?.user?.name}
                            imageUrl={industry?.user?.avatar}
                            large
                        />
                        <div>
                            {/* <Typography variant={'muted'} color={'gray'}>
                        5km away
                    </Typography> */}
                            <Typography variant={'label'}>
                                {industry?.user?.name}
                            </Typography>
                            <Typography variant={'muted'} color={'gray'}>
                                {industry?.addressLine1},{' '}
                                {industry?.addressLine2}
                            </Typography>
                        </div>
                    </div>
                    <Button
                        variant={'primary'}
                        text={'Apply Here'}
                        onClick={async () => {
                            await applyForWorkplace(industry?.id)
                        }}
                        loading={applyForWorkplaceResult.isLoading}
                        disabled={applyForWorkplaceResult.isLoading}
                    />
                </div>
            </Card>
        </div>
    )
}
