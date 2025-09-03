import React from 'react'

export const StatsCards = ({ counts }: any) => {
    const mergedCounts = [
        {
            key: 'industries',
            label: 'Industries',
            value: counts?.data?.industriesCount?.total,
            class: 'bg-orange-100 text-orange-400 border border-orange-300',
        },
        {
            key: 'listing',
            label: 'Listing',
            value: counts?.data?.listingCount?.total,
            class: 'bg-blue-100 text-blue-400 border border-blue-300',
        },
        {
            key: 'contacted',
            label: 'Contacted',
            value:
                counts?.data?.industriesCount?.contacted +
                counts?.data?.listingCount?.contacted,
            class: 'bg-green-100 text-green-400 border border-green-300', // example Tailwind class
        },
        {
            key: 'notContacted',
            label: 'Not Cont',
            value:
                counts?.data?.industriesCount?.notContacted +
                counts?.data?.listingCount?.notContacted,
            class: 'bg-red-100 text-red-400 border border-red-400 text-red-300', //
        },
    ]
    return (
        <div className="grid grid-cols-4 gap-4 my-2">
            {mergedCounts?.map((item) => (
                <div
                    key={item?.key}
                    className={`p-2 rounded-xl flex flex-col gap-y-2 items-center justify-center ${item?.class}`}
                >
                    <p className="text-sm">{item?.value ?? 0}</p>
                    <h3 className="text-xs">
                        {item?.label ?? 'NA'}
                    </h3>
                </div>
            ))}
        </div>
    )
}
