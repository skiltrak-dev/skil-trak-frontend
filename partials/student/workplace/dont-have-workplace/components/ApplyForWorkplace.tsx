import React from 'react'
import {
    Typography,
    Button,
    ActionButton,
    ShowErrorNotifications,
    InitialAvatar,
} from '@components'

// query
import { StudentApi, useApplyForWorkplaceMutation } from '@queries'
import { BsFileEarmarkMedical, BsExclamation } from 'react-icons/bs'

const BACKGROUNDS = [
    'bg-[#F7F1E3]',
    'bg-[#F7F1E3]/75',
    'bg-[#F7F1E3]/50',
    'bg-[#F7F1E3]/25',
]
export const ApplyForWorkplace = ({
    index,
    industry,
    appliedIndustry,
}: any) => {
    const [applyForWorkplace, applyForWorkplaceResult] =
        useApplyForWorkplaceMutation()
    const { data } = StudentApi.Workplace.useGetIndustryFoldersQuery({
        id: industry?.industry?.id,
        course: industry?.industry?.courses[0]?.id,
    })

    return (
        <>
            <ShowErrorNotifications result={applyForWorkplaceResult} />
            <div className={`${BACKGROUNDS[index]} p-2 px-4 rounded-lg `}>
                <div
                    className={` flex flex-col md:flex-row justify-between items-start md:items-center gap-y-2`}
                >
                    <div className="flex items-center gap-x-2">
                        <InitialAvatar
                            name={industry?.industry?.user?.name}
                            imageUrl={industry?.industry?.user?.avatar}
                            large
                        />
                        <div>
                            <Typography
                                variant={'muted'}
                                color={'text-gray-500'}
                            >
                                {Number(industry?.distance)?.toFixed(2)} Km Away
                            </Typography>
                            <p className="font-semibold text-sm">
                                {industry?.industry?.user?.name}
                            </p>
                            <p className="font-medium text-xs text-gray-500">
                                {industry?.industry?.addressLine1},{' '}
                                {industry?.industry?.addressLine2}
                            </p>
                        </div>
                    </div>

                    <ActionButton
                        variant="success"
                        disabled={
                            applyForWorkplaceResult.isLoading || appliedIndustry
                        }
                        onClick={async () => {
                            await applyForWorkplace(industry?.id)
                        }}
                        loading={applyForWorkplaceResult.isLoading}
                    >
                        Apply Here
                    </ActionButton>
                </div>
                {data?.length ? (
                    <div className="mt-2 bg-white rounded-md px-2 py-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="border border-orange-500 block w-fit rounded-full text-orange-500 text-xs">
                                <BsExclamation />
                            </span>
                            <p className="text-xs text-slate-600">
                                This industry will be requiring following
                                documents:
                            </p>
                        </div>
                        <div className="flex items-center flex-wrap gap-x-2 ">
                            {data?.map(
                                (folder: any) => {
                                    return (
                                        <div key={folder?.id} className="group">
                                            <div className="flex gap-2">
                                                <BsFileEarmarkMedical />
                                                <p className="text-black text-xs font-medium">
                                                    {folder?.folder?.name}{' '}
                                                </p>
                                                <div className="w-[1px] h-4 bg-gray-400 flex-shrink-0 group-last:hidden"></div>
                                            </div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}
