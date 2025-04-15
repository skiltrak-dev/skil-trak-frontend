import {
    HideRestrictedData,
    InitialAvatar,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { useSubadminProfile } from '@hooks'
import { Rto } from '@types'
import { QueryType, maskText, queryToUrl } from '@utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'

export const RtoCellInfo = ({ rto, short }: { rto: Rto; short?: boolean }) => {
    const router = useRouter()
    const query = queryToUrl(router.query as QueryType)

    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN, UserRoles.RTO],
        isHod: subadmin?.departmentMember?.isHod,
    })
    return (
        <Link legacyBehavior href={`/portals/admin/rto/${rto?.id}?tab=sectors`}>
            <a
                onClick={() => {
                    sessionStorage.setItem('rto', `${router.pathname}?${query}`)
                }}
                className="flex items-center gap-x-2 relative z-10"
            >
                <div className="shadow-inner-image rounded-full">
                    {rto?.user?.name && (
                        <InitialAvatar
                            name={rto?.user?.name}
                            imageUrl={rto?.user?.avatar}
                        />
                    )}
                </div>
                <div>
                    <p className={`${short ? 'font-medium' : 'font-semibold'}`}>
                        {rto?.user?.name}
                    </p>
                    <div className="font-medium text-xs text-gray-500">
                        <HideRestrictedData type={'canViewRtoList'}>
                            <p className="flex items-center gap-x-1">
                                <span>
                                    <MdEmail />
                                </span>
                                {maskText(rto?.user?.email)}
                            </p>
                        </HideRestrictedData>

                        <HideRestrictedData type={UserRoles.RTO}>
                            {!short && (
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdPhoneIphone />
                                    </span>
                                    {maskText(rto?.phone)}
                                </p>
                            )}
                        </HideRestrictedData>
                    </div>
                </div>
            </a>
        </Link>
    )
}
