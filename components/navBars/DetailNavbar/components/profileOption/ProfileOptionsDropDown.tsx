import { AuthUtils } from '@utils'
import { AiFillProfile } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import { MdLogout } from 'react-icons/md'
import { useRouter } from 'next/router'

export const ProfileOptionsDropDown = ({ expanded }: { expanded: boolean }) => {
    const router = useRouter()
    return (
        <div
            className={`absolute top-14 overflow-scroll right-0 z-40 bg-white w-48 transition-all rounded-lg remove-scrollbar ${
                !expanded ? 'max-h-0' : 'max-h-96 shadow-md border'
            } `}
        >
            <ul>
                <li>
                    <a
                        href=""
                        className="flex items-center gap-x-4 px-4 py-2 border-b"
                    >
                        <FaRegAddressCard />
                        <p className="text-sm">Profile</p>
                    </a>
                </li>
                <li
                    onClick={() => {
                        AuthUtils.logout()
                        router.push('/auth/login')
                    }}
                >
                    <MdLogout />
                    <p className="text-sm font-medium">Log Out</p>
                </li>
            </ul>
        </div>
    )
}
