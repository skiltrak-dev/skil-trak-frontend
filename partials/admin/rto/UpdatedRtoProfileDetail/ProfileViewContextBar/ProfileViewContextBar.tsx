import { AuthorizedUserComponent, RtoAvatar, Typography } from '@components'
import { Rto } from '@types'
import {
    ContactPersons,
    ProfileLinks,
    RtoDetails,
    RtoDocuments,
    RtoPackage,
    RtoProfileActions,
    Subadmins,
} from '../components'
import { UserRoles } from '@constants'

export const ProfileViewContextBar = ({ rto }: { rto: Rto }) => {
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <RtoAvatar
                        user={rto?.user?.id}
                        imageUrl={rto?.user?.avatar}
                        canEdit
                    />
                </div>
                <AuthorizedUserComponent excludeRoles={[UserRoles.SUBADMIN]}>
                    <ProfileLinks rto={rto} />
                </AuthorizedUserComponent>
            </div>

            {/* User */}
            <div className="mt-2">
                <div className="flex items-center gap-x-2">
                    <Typography semibold>
                        <span className="text-[15px]">{rto?.user?.name}</span>
                    </Typography>
                </div>
                <Typography variant="xs" color="text-[#6B7280]">
                    {rto?.user?.email}
                </Typography>
            </div>

            {/* RtoDetails */}
            <div className="py-5 border-b border-secondary-dark">
                <RtoDetails rto={rto} />
            </div>
            {/* RtoPackage */}
            <div className="py-5 border-b border-secondary-dark">
                <RtoPackage rto={rto} />
            </div>

            {/*  */}
            <RtoProfileActions rto={rto} />
            <div className="flex flex-col gap-y-4">
                <ContactPersons userId={rto?.user?.id} />
                <Subadmins userId={rto?.user?.id} />
                <RtoDocuments userId={rto?.user?.id} />
            </div>
        </div>
    )
}
