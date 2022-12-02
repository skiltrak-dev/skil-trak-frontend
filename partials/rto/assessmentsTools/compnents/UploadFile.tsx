// Icons
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AiFillExclamationCircle, AiFillCheckCircle } from 'react-icons/ai'
import { HiExclamationTriangle } from 'react-icons/hi2'
import { TfiReload } from 'react-icons/tfi'

// components
import { Typography } from 'components'
import { Button } from '@components/buttons'
import { MdCloudUpload } from 'react-icons/md'
import { BiUpArrowCircle } from 'react-icons/bi'

export const UploadFile = ({
    file,
    name,
    dragging,
    fileList,
    fileObject,
    handleRemove,
    invalidSelection,
}: any) => {
    // console.log(name, Array.isArray(file), file)

    return (
        <div>
            <Typography variant={'small'} color={'text-gray-500'}>
                Assessment File
            </Typography>
            <div className="flex items-center justify-between">
                <Typography variant={'small'} color={'text-gray-800'}>
                    {file ? file.name : 'No Selected File'}
                </Typography>

                <label
                    htmlFor={`file_id_${name}`}
                    className="flex items-center gap-x-1"
                >
                    <BiUpArrowCircle />
                    <Typography variant={'small'} color={'text-info'}>
                        Upload
                    </Typography>
                </label>
            </div>
        </div>
    )
}
