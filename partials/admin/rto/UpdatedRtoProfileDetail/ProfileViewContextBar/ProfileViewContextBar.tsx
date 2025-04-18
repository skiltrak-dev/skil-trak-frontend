import { RtoAvatar, Typography } from '@components'
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

export const ProfileViewContextBar = ({ rto }: { rto: Rto }) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    {/* <Avatar
                        avatar={profile?.user?.avatar}
                        name={profile?.user?.name}
                    /> */}
                    <RtoAvatar
                        user={rto?.user?.id}
                        imageUrl={rto?.user?.avatar}
                        canEdit
                    />
                </div>
                <ProfileLinks rto={rto} />
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
