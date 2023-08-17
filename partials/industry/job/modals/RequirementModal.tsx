import { Course } from '@types'
import { MdClose } from 'react-icons/md'

export const RequirementModal = ({
    coverLatter,
    onCancel,
}: {
    coverLatter: string
    onCancel: Function
}) => {
    return (
        <div className="fixed z-30 bg-black/25 backdrop-blur-sm w-full h-full top-0 left-0 flex items-center justify-center">
            <div className="w-3/4  bg-white  shadow-2xl rounded-2xl ">
                <div className="flex justify-between items-start p-6">
                    <div className="mb-4">
                        <p className="text-sm text-gray-400 font-medium">
                            Requirement File For
                        </p>
                        <p className="text-sm font-semibold">
                            {/* <span className="text-gray-500">{course.code}</span>{' '} */}
                            -{' '}
                            <span className="text-gray-700">Cover Latter</span>
                        </p>
                    </div>

                    <button
                        className="text-gray-400 text-2xl hover:text-gray-600"
                        onClick={() => onCancel()}
                    >
                        <MdClose />
                    </button>
                </div>
                <div className="h-[80vh] overflow-auto custom-scrollbar px-6 pb-2">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: coverLatter,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
