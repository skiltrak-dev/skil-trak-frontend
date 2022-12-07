import { Industry } from '@types'
import Link from 'next/link'
import { FaHandshake } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const IndustryCell = ({ industry }: { industry: Industry }) => {
    return (
        <Link href={`industry/${industry.id}`}>
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full relative">
                    <img
                        src={
                            industry.user.avatar ||
                            `https://picsum.photos/64/${64 + industry.id}`
                        }
                        className="w-10 h-10 rounded-full"
                    />
                    {industry.studentCapacity ? (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center bg-green-500 rounded-full text-white">
                            <FaHandshake size={14} />
                        </div>
                    ) : null}
                </div>
                <div>
                    <p className="font-semibold">{industry.user.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {industry.user.email}
                        </p>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {industry.phoneNumber}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
