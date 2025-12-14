import { TableAction } from '@components'
import { BsThreeDotsVertical, BsUnlockFill } from 'react-icons/bs'
import { CiUnlock } from 'react-icons/ci'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill, RiFootprintFill } from 'react-icons/ri'

export const ProfileLinks = () => {
    const profileLinks = [
        {
            text: 'Edit Profile',
            Icon: RiEditFill,
        },
        {
            text: 'Edit Password',
            Icon: BsUnlockFill,
        },
        {
            text: 'Send Password',
            Icon: CiUnlock,
        },
        {
            text: 'View Password',
            Icon: IoMdEyeOff,
        },
        {
            text: 'Placement Status',
            Icon: RiEditFill,
        },
        {
            text: 'View Visitors',
            Icon: RiFootprintFill,
        },
        {
            text: 'View Industry Answers',
            Icon: RiEditFill,
        },
        {
            text: 'Add Rpl',
            Icon: RiEditFill,
        },
        {
            text: 'Industry Gallery',
            Icon: RiEditFill,
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            <div className="flex gap-x-1 items-center">
                <TableAction options={profileLinks} rowItem={{}}>
                    <button className="text-xs rounded px-4 py-2 uppercase font-medium text-gray-800 flex gap-x-2 items-center">
                        <BsThreeDotsVertical size={19} />
                    </button>
                </TableAction>
            </div>
        </div>
    )
}
