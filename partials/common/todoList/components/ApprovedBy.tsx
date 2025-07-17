import { InitialAvatar } from '@components'
import { SubAdmin, User } from '@types'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const ApprovedBy = ({ user }: { user: User }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full relative">
                {user?.name && (
                    <InitialAvatar name={user.name} imageUrl={user?.avatar} />
                )}
            </div>
            <div>
                <div className="flex items-center gap-x-2">
                    <p className="font-semibold">{user?.name}</p>
                </div>

                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {user?.email}
                    </p>
                    {/* <p className="flex items-center gap-x-1">
                        <span>
                            <MdPhoneIphone />
                        </span>
                        {phone}
                    </p> */}
                </div>
            </div>
        </div>
    )
}
