// Icons
import { BsDot } from 'react-icons/bs'

// components
import { Button, TextInput, Typography } from '@components'

export const Notes = () => {
    return (
        <div>
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Recent Notes:
                </Typography>
                <Typography variant={'small'} color={'text-info'}>
                    <span className="font-semibold">View All Notes</span>
                </Typography>
            </div>

            {/* Notes List */}
            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col justify-between gap-y-3">
                <div className="flex flex-col gap-y-1">
                    {[...Array(2)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-secondary py-1 px-2 rounded-lg"
                        >
                            <Typography variant={'label'}>
                                Some dummy placeholde note here to see how it
                                will look here{' '}
                            </Typography>
                            <div className="flex items-center gap-x-1">
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    25 Oct, 2022 09:00 am
                                </Typography>
                                <BsDot className="text-gray-400" />
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    5km away
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-start">
                    <TextInput name={'note'} placeholder={'Leave Quick Note'} />
                    <div className="flex-shrink-0">
                        <Button text={'Leave Note'} />
                    </div>
                </div>
            </div>
        </div>
    )
}
