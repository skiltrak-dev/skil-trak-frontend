import { useSaveJobMutation } from '@queries'
import { ReactNode, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { ApplyJobModal } from '../ApplyJobModal'

type Props = {
    onClick?: any
    savedJob?: boolean
    id: number
    job: any
}

export const ApplyNowButton = ({ job, onClick, savedJob, id }: Props) => {
    const [isSaved, setIsSaved] = useState('')
    const [modal, setModal] = useState<ReactNode | null>(null)

    const [saveJob, saveHobResult] = useSaveJobMutation()

    const onCancel = () => setModal(null)

    const onApplyJob = () => {
        setModal(<ApplyJobModal onCancel={onCancel} id={id} />)
    }
    return (
        <div>
            {modal}
            <div className="flex gap-x-2 items-center">
                <div
                    onClick={() => {
                        saveJob(id)
                        onClick()
                    }}
                    className={`py-[6px] px-2 ${
                        savedJob ? 'bg-red-600' : 'bg-white border'
                    } rounded cursor-pointer`}
                >
                    <AiFillHeart
                        className={`${
                            savedJob ? 'text-white' : 'text-red-600'
                        }`}
                    />
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
