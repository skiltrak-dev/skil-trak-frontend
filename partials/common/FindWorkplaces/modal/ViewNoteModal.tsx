import { Typography } from '@components'
import moment from 'moment'
import { CiStickyNote } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'

export const ViewNoteModal = ({
    industry,
    onCancel,
}: {
    onCancel: () => void
    industry: any
}) => {
    const noteDetailData = [
        {
            text: 'Industry Name',
            data: industry?.businessName,
        },
        {
            text: 'Contact By',
            data: industry?.contactedBy?.name || '---',
        },
        {
            text: 'Contact At',
            data: moment(industry?.contactedAt).format('MMM DD, YYYY'),
        },
    ]
    return (
        <div className="fixed z-30 bg-black/25 backdrop-blur-sm w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="relative w-full md:w-3/4 lg:w-[500px]  bg-white p-6 shadow-2xl rounded-2xl">
                <MdCancel
                    onClick={onCancel}
                    className="absolute top-3 right-3 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="flex flex-col gap-y-4">
                    <div className="flex justify-center">
                        <CiStickyNote className="text-[#24556D]" size={40} />
                    </div>

                    {/*  */}
                    <div className="flex justify-between items-center gap-x-1.5">
                        {noteDetailData?.map((noteData) => (
                            <div
                                className={
                                    'w-full border border-[#6B7280] rounded-md px-2.5 py-1.5'
                                }
                            >
                                <span className="text-[9px] text-[#979797] m-0 p-0">
                                    {noteData?.text}
                                </span>
                                <Typography
                                    variant={'xxs'}
                                    color={'text-[#374151]'}
                                >
                                    {noteData?.data}
                                </Typography>
                            </div>
                        ))}
                    </div>

                    {/*  */}
                    <div
                        className="rounded-md p-4 h-full lg:min-h-[20vh] lg:max-h-[70vh] font-light text-[13px] overflow-auto custom-scrollbar bg-[#FEF6E6] text-gray-500"
                        dangerouslySetInnerHTML={{
                            __html: industry?.note,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
