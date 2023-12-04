import { InitialAvatar, Typography } from '@components'
import { TiArrowForwardOutline } from 'react-icons/ti'
import moment from 'moment'
export const ActionCard = ({ action }: any) => {
    

    return (
        <>
            <div className="flex gap-x-3">
                <div className="flex items-center justify-center flex-col">
                    <div className="w-[1px] h-8 bg-gray-400"></div>
                    <div className="bg-gray-400 rounded-full w-8 h-8 flex items-center justify-center">
                        <TiArrowForwardOutline className="text-white text-xs" />
                    </div>
                    <div className="w-[1px] h-8 bg-gray-400"></div>
                </div>
                <div className="flex items-center gap-x-3">
                    <InitialAvatar
                        name={action?.actionBy?.name}
                        imageUrl={action?.actionBy?.avatar}
                    />
                    <div className="text-xs text-gray-400">
                        <div className="inline relative group ">
                            <p className="font-bold text-xs text-gray-600 inline">
                                {action?.actionBy?.name}
                            </p>
                            <div className="hidden rounded-lg absolute group-hover:flex flex-col left-0 top-5 bg-gray-800 px-2 py-1">
                                <p className="text-[10px] font-medium text-gray-200 inline">
                                    {action?.actionBy?.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-200 inline">
                                    {action?.actionBy?.email}
                                </p>
                            </div>
                        </div>{' '}
                        forwarded this ticket to{' '}
                        <div className="inline relative group ">
                            <p className="font-bold text-xs text-gray-600 inline">
                                {action?.actionOn?.name}
                            </p>
                            <div className="hidden  rounded-lg absolute group-hover:flex flex-col left-0 top-5 bg-gray-800 px-2 py-1">
                                <p className="text-[10px] font-medium text-gray-200 inline">
                                    {action?.actionOn?.name}
                                </p>
                                <p className="text-[10px] font-medium text-gray-200 inline">
                                    {action?.actionOn?.email}
                                </p>
                            </div>
                        </div>{' '}
                        on{' '}
                        {moment(action?.actionDate).format(
                            'dddd DD MMMM, YYYY - hh:mm a'
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
