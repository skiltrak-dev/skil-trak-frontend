import { useNotification } from '@hooks'
import { AiFillHeart } from 'react-icons/ai'
import { useSaveJobMutation } from '@queries'
import { ApplyJobModal } from '../ApplyJobModal'
import { ReactNode, useEffect, useState } from 'react'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { PulseLoader } from 'react-spinners'

type Props = {
    onClick?: any
    savedJob?: boolean
    id: number
    job: any
}

export const ApplyNowButton = ({ job, onClick, savedJob, id }: Props) => {
    const [isSaved, setIsSaved] = useState('')
    const [modal, setModal] = useState<ReactNode | null>(null)

    const { notification } = useNotification()

    const [saveJob, saveHobResult] = useSaveJobMutation()

    useEffect(() => {
        if (saveHobResult.isSuccess) {
            if (job?.students?.length > 0) {
                notification.success({
                    title: 'Job Un-Saved',
                    description: 'Job Un-Saved Successfully',
                })
            } else {
                notification.success({
                    title: 'Job Saved',
                    description: 'Job Saved Successfully',
                })
            }
        }
    }, [saveHobResult])

    const onSaveJob = (id: number) => {
        saveJob(id)
    }

    const onCancel = () => setModal(null)

    const onApplyJob = () => {
        setModal(<ApplyJobModal onCancel={onCancel} id={id} />)
    }
    return (
        <div>
            {modal}
            <ShowErrorNotifications result={saveHobResult} />
            <div className="flex gap-x-2 items-center">
                <div
                    onClick={() => {
                        onSaveJob(id)
                        onClick()
                    }}
                    className={`py-[6px] px-2 ${
                        job?.students?.length > 0
                            ? 'bg-red-600'
                            : 'bg-white border'
                    } rounded cursor-pointer`}
                >
                    {saveHobResult.isLoading ? (
                        <PulseLoader size={3} />
                    ) : (
                        <AiFillHeart
                            className={`${
                                job?.students?.length > 0
                                    ? 'text-white'
                                    : 'text-red-600'
                            }`}
                        />
                    )}
                </div>
                <div
                    className={`${
                        job?.applications && job?.applications?.length > 0
                            ? 'bg-info-light cursor-not-allowed'
                            : 'bg-[#D3F3C6] cursor-pointer'
                    }  rounded py-1.5 px-4 `}
                    onClick={() => {
                        if (!job?.applications?.length) {
                            onApplyJob()
                        }
                    }}
                >
                    {/*  */}
                    <p
                        className={`${
                            job?.applications && job?.applications?.length > 0
                                ? 'text-white'
                                : 'text-[#30AF22]'
                        }  font-medium text-xs text-center whitespace-nowrap`}
                    >
                        {job?.applications && job?.applications?.length > 0
                            ? 'Applied'
                            : 'Apply Now'}
                    </p>
                </div>
            </div>
        </div>
    )
}
