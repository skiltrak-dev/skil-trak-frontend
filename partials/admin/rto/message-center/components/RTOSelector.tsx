import { Badge, LoadingAnimation, NoData, TextInput } from '@components'
import { InputErrorMessage } from '@components/inputs/components'
import { AdminApi } from '@queries'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { RtoCard, TypeCard } from '../cards'

type RecipientType = 'all' | 'multiple'

export interface RecipientOption {
    type: RecipientType
    title: string
    description: string
}

export const RTOSelector = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const formMethod = useFormContext()

    const [typee, rtoIds] = formMethod.watch(['type', 'rtoIds'])

    const rtosList = AdminApi.RtoMessageCenter.getRtosList(
        { name: searchQuery },
        {
            skip: typee === 'all',
        }
    )

    const handleTypeChange = (type: 'multiple' | 'all') => {
        formMethod.setValue('type', type)
    }

    const handleRTOToggle = (rtoId: number) => {
        const isSelected = rtoIds?.includes(rtoId)

        const rtos = isSelected
            ? rtoIds.filter((id: number) => id !== rtoId)
            : [...rtoIds, rtoId]

        formMethod.setValue('rtoIds', rtos)
    }

    const recipientOptions: RecipientOption[] = [
        {
            type: 'all',
            title: 'Send to all RTOs',
            description: `Broadcast to all ${rtosList?.data?.length} registered RTOs`,
        },
        {
            type: 'multiple',
            title: 'Send to selected RTOs',
            description: 'Choose specific RTOs from the list below',
        },
    ]

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {recipientOptions?.map((recipient) => (
                    <TypeCard
                        key={recipient?.type}
                        recipient={recipient}
                        onClick={() => handleTypeChange(recipient?.type)}
                    />
                ))}
            </div>

            {typee !== 'all' && (
                <div className="space-y-3 pt-4 border-t-2 border-gray-100">
                    <div className="relative">
                        {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /> */}
                        <TextInput
                            name={'search'}
                            placeholder="Search by name, code, or region..."
                            value={searchQuery}
                            onChange={(e: any) =>
                                setSearchQuery(e.target.value)
                            }
                            showError={false}
                            className="pl-9 border-gray-300 focus:border-blue-500"
                        />
                    </div>

                    {rtoIds?.length > 0 && (
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-blue-900">
                                    Selected RTOs: {rtoIds?.length}
                                </span>
                                <button
                                    onClick={() => {
                                        formMethod.setValue('rtoIds', [])
                                    }}
                                    className="text-xs text-blue-700 hover:text-blue-900 underline cursor-pointer"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {rtoIds?.map((id: number) => {
                                    const rto = rtosList?.data?.find(
                                        (r) => r.id === Number(id)
                                    )
                                    return rto ? (
                                        <Badge
                                            key={id}
                                            variant="secondary"
                                            text={rto?.rtoCode}
                                            className="bg-white text-blue-900 border border-blue-300 px-2 py-1"
                                        />
                                    ) : null
                                })}
                            </div>
                        </div>
                    )}

                    <div className="border-2 border-gray-200 rounded-xl max-h-96 overflow-y-auto">
                        {rtosList?.isError ? (
                            <NoData
                                isError
                                text="There is some technical issue!"
                            />
                        ) : null}

                        {
                            <div className="divide-y divide-gray-100">
                                {rtosList?.isLoading || rtosList?.isFetching ? (
                                    <LoadingAnimation />
                                ) : rtosList?.data &&
                                  rtosList?.data?.length > 0 &&
                                  rtosList?.isSuccess ? (
                                    rtosList?.data?.map((rto) => (
                                        <RtoCard
                                            rto={rto}
                                            key={rto?.id}
                                            onClick={() =>
                                                handleRTOToggle(rto.id)
                                            }
                                            isSelected={rtoIds?.includes(
                                                rto.id
                                            )}
                                        />
                                    ))
                                ) : rtosList?.isSuccess ? (
                                    <div className="p-12 text-center">
                                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <p className="text-gray-500">
                                            No RTOs found matching your search
                                        </p>
                                    </div>
                                ) : null}
                            </div>
                        }
                    </div>
                </div>
            )}

            {/*  */}
            <InputErrorMessage name={'rtoIds'} />
        </div>
    )
}
