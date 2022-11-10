import { Rto } from '@types'
import Link from 'next/link'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RtoCellInfo = ({ rto }: { rto: Rto }) => {
    return (
        <Link href={`rto/${rto.id}`}>
            <a className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full">
                    <img
                        src={`https://picsum.photos/64/${64 + rto.id}`}
                        className="w-8 h-8 rounded-full"
                    />
                </div>
                <div>
                    <p className="font-semibold">{rto.user.name}</p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {rto.user.email}
                        </p>
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdPhoneIphone />
                            </span>
                            {rto.phone}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
