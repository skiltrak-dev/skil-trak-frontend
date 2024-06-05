import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
} from '@components'
import { BsArrowRight } from 'react-icons/bs'
export const StatusHistory = ({ industry }: { industry: any }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageTitle title={'Status History'} />
            </div>
            {industry?.isError && <TechnicalError />}
            {industry?.isLoading || industry?.isFetching ? (
                <LoadingAnimation />
            ) : industry?.user.statusChangeHistory &&
              industry?.user?.statusChangeHistory.length > 0 ? (
                <div className="bg-white rounded-md  mt-4 flex flex-col justify-center items-center gap-y-3 gap-x-4">
                    {industry?.user?.statusChangeHistory.map(
                        (history: any, i: number) => (
                            <div className="flex justify-center items-center gap-x-2.5 shadow-md  p-3">
                                {/* <div className="w-6 h-[1px] bg-slate-600"></div> */}
                                <span className="text-xs">Previous Status</span>
                                <BsArrowRight className="" size={20} />

                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-orange-500 bg-orange-100">
                                        <span className="text-xs capitalize font-semibold text-orange-500">
                                            {history.previous}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs ">Current Status</span>
                                <BsArrowRight className="" size={20} />

                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-green-500 bg-green-100">
                                        <span className="text-xs capitalize font-semibold text-green-500">
                                            {history.current}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs">Updated At</span>
                                <BsArrowRight className="" size={20} />
                                <div>
                                    <div className="text-sm p-3 flex items-center justify-center rounded-full text-gray-500 bg-gray-100">
                                        <span className="text-xs font-semibold text-gray-500 whitespace-pre">
                                            {history.updateAt.slice(0, 10)}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-6 h-[1px] bg-slate-600"></div>
                                <span className="text-xs">Updated By</span>
                                <BsArrowRight className="" size={20} />
                                <div>
                                    <div className="text-sm p-3 flex items-center gap-x-1 justify-center rounded-full text-red-500 bg-red-100">
                                        {/* <CiUser size={18} /> */}
                                        <span className="text-xs font-semibold capitalize text-red-500">
                                            {history.updateBy}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            ) : (
                !industry?.isError && (
                    <EmptyData
                        title={'No Title were found'}
                        description={
                            'It may be due to you have perform any action yet'
                        }
                    />
                )
            )}
        </div>
    )
}
