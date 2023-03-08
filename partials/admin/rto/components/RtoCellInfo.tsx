import { InitialAvatar } from '@components'
import { Rto } from '@types'
import { queryToUrl } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RtoCellInfo = ({ rto, short }: { rto: Rto; short?: boolean }) => {
    const router = useRouter()
    const query = queryToUrl(router.query)
    return (
        <Link legacyBehavior href={`rto/${rto?.id}?tab=sectors`}>
            <a
                onClick={() => {
                    sessionStorage.setItem('rto', `${router.pathname}?${query}`)
                }}
                className="flex items-center gap-x-2"
            >
                <div className="shadow-inner-image rounded-full">
                    <InitialAvatar
                        name={rto?.user?.name}
                        imageUrl={rto?.user?.avatar}
                    />
                </div>
                <div>
                    <p className={`${short ? 'font-medium' : 'font-semibold'}`}>
                        {rto?.user?.name}
                    </p>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            <span>
                                <MdEmail />
                            </span>
                            {rto?.user?.email}
                        </p>
                        {!short && (
                            <p className="flex items-center gap-x-1">
                                <span>
                                    <MdPhoneIphone />
                                </span>
                                {rto?.phone}
                            </p>
                        )}
                    </div>
                </div>
            </a>
        </Link>
    )
}
