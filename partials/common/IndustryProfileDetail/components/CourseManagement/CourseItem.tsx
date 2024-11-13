import { Typography } from '@components'
import { ellipsisText } from '@utils'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

export const CourseItem = ({
    course,
    requestList,
}: {
    course?: any
    requestList: any
}) => {
    const isValidUrl = (url: any) => {
        const urlPattern =
            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
        return urlPattern.test(url)
    }

    return (
        <div className="p-4 border rounded-md bg-[#95C6FB26] bg-opacity-15 max-h-[200px] overflow-hidden">
            <div className="flex justify-between gap-x-12 w-full items-center mb-4">
                <div className="">
                    <Typography variant="small" color="text-gray-600">
                        COURSE
                    </Typography>
                    {requestList?.courses && requestList?.courses.length > 1 ? (
                        <div className="relative w-full flex items-center gap-x-1 gap-y-2 mt-2">
                            {requestList?.courses?.map((course: any) => (
                                <div key={course.id} className="relative group">
                                    {/* Dot for course */}
                                    <div className="size-2 bg-gray-500 rounded-full cursor-pointer"></div>

                                    {/* Tooltip on hover */}
                                    <div className="invisible group-hover:visible absolute left-0 top-2 z-10">
                                        <div className="bg-white border rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                                            <Typography
                                                variant="small"
                                                semibold
                                            >
                                                {course?.title} - {course?.code}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <Typography variant="muted">
                            {requestList?.courses?.[0]?.code} -{' '}
                            {requestList?.courses?.[0]?.title}
                        </Typography>
                    )}
                </div>

                <div className="text-right">
                    <Typography variant="small" color="text-gray-600">
                        Course Hours
                    </Typography>

                    <Typography variant="muted">30 Hours</Typography>
                </div>

                <div className="">
                    <IoCheckmarkDoneOutline
                        size={25}
                        className="text-emerald-500"
                    />
                </div>
            </div>

            <div className="bg-emerald-700 text-white p-4 rounded-md mb-4 flex gap-x-5 items-start">
                <div className="mb-2 whitespace-nowrap flex flex-col">
                    <Typography variant="small" color="white">
                        Action Perform
                    </Typography>
                    <Typography variant="label" color="white">
                        Course Added
                    </Typography>
                </div>
                <div className="">
                    <Typography variant="label" color="white">
                        Description
                    </Typography>
                    <div className="" title={requestList?.description}>
                        <Typography variant="xs" color="text-white">
                            {ellipsisText(requestList?.description, 160) ??
                                'N/A'}
                            {/* {requestList.description || 'N/A'} */}
                        </Typography>
                    </div>
                </div>
            </div>

            <div className="flex justify-between text-[10px]">
                <div>
                    <span className="text-gray-600">Coordinator Name: </span>
                    <span>{requestList?.addedBy?.name ?? 'N/A'}</span>
                </div>
                <div>
                    <span className="text-gray-600">Reference URL: </span>
                    {isValidUrl(requestList?.reference?.[0]) ? (
                        <a
                            href={requestList.reference[0]}
                            className="text-blue-500 hover:underline"
                        >
                            {requestList.reference[0]}
                        </a>
                    ) : (
                        <span>{requestList?.reference?.[0] ?? 'N/A'}</span>
                    )}
                </div>
                <div>
                    <span className="text-gray-600">DATE: </span>
                    <span>{requestList?.updatedAt?.slice(0, 10) || 'N/A'}</span>
                </div>
            </div>
        </div>
    )
}
