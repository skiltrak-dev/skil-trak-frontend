// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { Typography } from '@components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'

export const UploadFile = ({ name, loading, title }: any) => {
    return (
        <Button
            loading={loading}
            disabled={loading}
            variant={'info'}
            Icon={MdCloudUpload}
        >
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                {title || 'Add File'}
            </label>
        </Button>
    )
}
