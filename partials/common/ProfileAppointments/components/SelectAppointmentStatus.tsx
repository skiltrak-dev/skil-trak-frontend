import { Button, TextArea, Typography } from '@components'
import classNames from 'classnames'
import { useState } from 'react'
import { GoDotFill } from 'react-icons/go'
import { IoMdCheckmarkCircle } from 'react-icons/io'

const message =
    'I confirm I have contacted both industry and student, and both have agreed to proceed.'

export const SelectAppointmentStatus = ({
    result,
    onSubmit,
}: {
    result: any
    onSubmit: ({ note, status }: { note: string; status: boolean }) => void
}) => {
    const [note, setNote] = useState(message)
    const [isSuccessfulSelected, setIsSuccessfulSelected] =
        useState<boolean>(true)

    const successfullClasses = classNames({
        'bg-teal-700 text-white': isSuccessfulSelected,
        'bg-gray-300 text-primaryNew': !isSuccessfulSelected,
    })
    const unSuccessfullClasses = classNames({
        'bg-teal-700 text-white': !isSuccessfulSelected,
        'bg-gray-300 text-primaryNew': isSuccessfulSelected,
    })

    const onSuccessfullSelect = () => {
        setIsSuccessfulSelected(true)
        setNote(message)
    }
    const onUnSuccessfullSelect = () => {
        setIsSuccessfulSelected(false)
        setNote('')
    }

    return (
        <>
            <div
                onClick={onSuccessfullSelect}
                className={`${successfullClasses} cursor-pointer flex items-center gap-x-5  p-4 rounded-lg shadow-lg`}
            >
                {/* Success Icon */}
                <div className="flex items-center gap-x-2">
                    {isSuccessfulSelected ? (
                        <IoMdCheckmarkCircle size={22} />
                    ) : (
                        <GoDotFill size={22} />
                    )}
                    <Typography
                        semibold
                        uppercase
                        color={
                            isSuccessfulSelected
                                ? 'text-white'
                                : 'text-primaryNew'
                        }
                    >
                        SUCCESSFUL
                    </Typography>
                </div>

                <Typography
                    color={
                        isSuccessfulSelected ? 'text-white' : 'text-primaryNew'
                    }
                    variant="small"
                >
                    {message}
                </Typography>
            </div>

            {/*  */}
            <div
                className={`${unSuccessfullClasses} flex flex-col gap-y-1 cursor-pointer w-full p-4 bg-gray-300 rounded-lg`}
                onClick={onUnSuccessfullSelect}
            >
                <div className="flex items-center gap-x-2">
                    {!isSuccessfulSelected ? (
                        <IoMdCheckmarkCircle size={22} />
                    ) : (
                        <GoDotFill size={22} />
                    )}
                    <Typography
                        semibold
                        uppercase
                        color={
                            !isSuccessfulSelected
                                ? 'text-white'
                                : 'text-primaryNew'
                        }
                    >
                        Not SUCCESSFUL
                    </Typography>
                </div>
                <TextArea
                    placeholder="Write a note"
                    name="note"
                    showError={false}
                    disabled={isSuccessfulSelected}
                    onChange={(e: any) => {
                        setNote(e?.target?.value)
                    }}
                />
            </div>
            <div className="mx-auto w-40">
                <Button
                    onClick={() => {
                        onSubmit({
                            note,
                            status: isSuccessfulSelected,
                        })
                    }}
                    loading={result?.isLoading}
                    disabled={result?.isLoading}
                    text="Save"
                    fullWidth
                />
            </div>
        </>
    )
}
