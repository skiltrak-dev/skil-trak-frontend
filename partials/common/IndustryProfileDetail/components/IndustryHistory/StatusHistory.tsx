import {
    EmptyData,
    LoadingAnimation,
    PageTitle,
    TechnicalError,
    Typography,
} from '@components'
export const StatusHistory = ({ industry }: { industry: any }) => {
    return (
        <div className="h-full overflow-auto custom-scrollbar">
            {industry?.isError && <TechnicalError />}
            {industry?.isLoading || industry?.isFetching ? (
                <LoadingAnimation />
            ) : industry?.user.statusChangeHistory &&
              industry?.user?.statusChangeHistory.length > 0 ? (
                <div className="bg-white rounded-md  mt-4 flex flex-col justify-center items-center gap-y-3 gap-x-4">
                    {industry?.user?.statusChangeHistory.map(
                        (history: any, i: number) => (
                            <div className="w-full relative flex items-center gap-x-4">
                                <div className="min-w-4 min-h-4 bg-[#6C6C6C] rounded-full" />
                                <div className="w-full flex justify-between items-center gap-x-2.5 shadow bg-[#F8FAFC] px-6 py-4 rounded-[10px]">
                                    {/* <div className="w-6 h-[1px] bg-slate-600"></div> */}
                                    <div>
                                        <Typography variant="small">
                                            Previous Status
                                        </Typography>
                                        <Typography
                                            semibold
                                            variant="label"
                                            color={'text-primary'}
                                            capitalize
                                        >
                                            {history?.previous}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center">
                                        {'<'}
                                        {[...Array(8)].map((_) => '-')}
                                        {'>'}
                                    </div>

                                    <div>
                                        <Typography variant="small">
                                            Current Status
                                        </Typography>
                                        <Typography
                                            semibold
                                            variant="label"
                                            color={'text-primary'}
                                            capitalize
                                        >
                                            {history?.current}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center">
                                        {'<'}
                                        {[...Array(8)].map((_) => '-')}
                                        {'>'}
                                    </div>

                                    <div>
                                        <Typography variant="small">
                                            Updated At
                                        </Typography>
                                        <Typography
                                            semibold
                                            variant="label"
                                            color={'text-[#6A798C]'}
                                            capitalize
                                        >
                                            {history.updateAt.slice(0, 10)}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center">
                                        {'<'}
                                        {[...Array(8)].map((_) => '-')}
                                        {'>'}
                                    </div>

                                    <div>
                                        <Typography variant="small">
                                            Updated By{' '}
                                        </Typography>
                                        <Typography
                                            semibold
                                            variant="label"
                                            color={'text-[#BF0000]'}
                                            capitalize
                                        >
                                            {history?.updateBy}
                                        </Typography>
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
