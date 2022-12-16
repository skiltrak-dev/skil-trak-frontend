import { ActionButton } from '@components/buttons'
import { Select } from '@components/inputs'
import { useState } from 'react'
import { FaCheck, FaQuestionCircle, FaTimes } from 'react-icons/fa'

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
            </div>

            <div className="flex justify-between items-center">
                {edit ? (
                    <div className="flex  gap-x-2 w-full">
                        <div className="flex-grow w-full">
                            <Select
                                name="status"
                                options={[
                                    { label: 'Completed', value: 'completed' },
                                    {
                                        label: 'Terminated',
                                        value: 'terminated',
                                    },
                                    { label: 'Cancelled', value: 'cancelled' },
                                ]}
                            />
                        </div>

                        <div className="flex items-center gap-x-1">
                            <ActionButton
                                variant="success"
                                mini
                                Icon={FaCheck}
                            ></ActionButton>
                            <ActionButton
                                variant="error"
                                mini
                                Icon={FaTimes}
                                onClick={onChangeClicked}
                            ></ActionButton>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-full">
                        <div className="text-indigo-500 text-sm font-semibold">
                            Current Status
                        </div>

                        {!edit ? (
                            <button
                                className="text-blue-500 text-xs font-medium"
                                onClick={() => onChangeClicked()}
                            >
                                Change
                            </button>
                        ) : (
                            <button
                                className="text-red-500 text-xs font-medium"
                                onClick={() => onChangeClicked()}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
