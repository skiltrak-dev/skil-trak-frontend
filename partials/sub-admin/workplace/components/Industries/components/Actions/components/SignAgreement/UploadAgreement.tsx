// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { LoadingAnimation, Typography } from '@components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'

export const UploadAgreement = ({
    name,
    loading,
}: {
    name: string
    loading?: boolean
}) => {
    return (
        <Button variant={'info'} loading={loading} disabled={loading}>
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                SIGN AGREEMENT
            </label>
        </Button>
    )
}
