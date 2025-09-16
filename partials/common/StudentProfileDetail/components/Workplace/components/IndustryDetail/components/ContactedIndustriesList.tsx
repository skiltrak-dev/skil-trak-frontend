import { Typography } from '@components'
import React, { ReactElement, useEffect, useState } from 'react'
import { ContactHistory } from './onViewMapIndustriesInRadius'
import { ViewContactedIndustryModal } from '../../../modals'

type TabType = {
    id: number
    tab: string
    component: ReactElement
}

export const ContactedIndustriesList = ({ workplace }: { workplace: any }) => {
    const [selected, setSelected] = useState<TabType | null>(null)

    const tabs: TabType[] = [
        {
            id: 1,
            tab: 'Contacted Industries',
            component: <ContactHistory wpId={workplace?.id} />,
        },
        {
            id: 2,
            tab: 'Old Industries Contacted List',
            component: (
                <ViewContactedIndustryModal
                    workpaceId={Number(workplace?.id)}
                    onCancel={() => {}}
                />
            ),
        },
    ]

    useEffect(() => {
        setSelected(tabs?.[0])
    }, [])

    return (
        <div className="p-4 w-full">
            <div className="flex items-center gap-x-2">
                {tabs?.map((data) => (
                    <div
                        onClick={() => {
                            setSelected(data)
                        }}
                        className={`cursor-pointer py-2 px-3 border-b-2  text-sm transition-colors duration-200 ${
                            selected?.id === data?.id
                                ? 'border-blue-500  bg-blue-500 rounded-lg '
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <Typography
                            variant="small"
                            bold
                            color={
                                selected?.id === data?.id
                                    ? 'text-white'
                                    : 'text-blue-600'
                            }
                        >
                            {data?.tab}
                        </Typography>
                    </div>
                ))}
            </div>

            {/*  */}
            <div className="w-full">
                {selected ? selected?.component : null}
            </div>
        </div>
    )
}
