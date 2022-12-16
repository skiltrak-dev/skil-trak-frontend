import { useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'

export const StudentStatus = () => {
    const [edit, setEdit] = useState(false)

    const onChangeClicked = () => setEdit(!edit)

    return (
        <div className="mt-4">
            <div className="flex justify-between items-end">
                <div className="flex gap-x-2 items-center">
                    <p className="text-gray-500 text-xs">Student Status</p>
                    <div className="group">
                        <span className="text-gray-400 group-hover:text-gray-700">
                            <FaQuestionCircle size={12} />
                        </span>
                    </div>
                </div>

                {!edit ? (
                    <button className="text-blue-500 text-xs font-medium">
                        Change
                    </button>
                ) : (
                    <button className="text-red-500 text-xs font-medium">
                        Cancel
                    </button>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div className="text-indigo-500 text-sm font-semibold">
                    Current Status
                </div>
            </div>
        </div>
    )
}
