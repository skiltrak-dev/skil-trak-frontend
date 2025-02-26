import {
    ActionButton,
    LoadingAnimation,
    Typography,
    useAuthorizedUserComponent,
} from '@components'
import { useSubadminProfile } from '@hooks'
import {
    IndustryContactPerson,
    IndustryDetail,
    IndustryProfileAvatar,
} from '@partials/common/IndustryProfileDetail'
import { UpdatedCourseList } from '@partials/common/UpdatedCourseList'
import { useGetSubAdminIndustriesProfileQuery } from '@queries'
import { getSectors, maskText } from '@utils'
import { ReactElement, useState } from 'react'
import { ProfileLinks } from './components'
import { AddNoteModal, ViewNoteModal } from './modal'
import { UserRoles } from '@constants'

export const IndustryDetailCB = ({
    id,
    industryUserId,
}: {
    id: number
    industryUserId: number
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const industry = useGetSubAdminIndustriesProfileQuery(Number(id), {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })

    const sectorsWithCourses = getSectors(industry?.data?.courses)

    const onCancelClicked = () => setModal(null)

    const onCreateNoteClicked = () => {
        setModal(
            <AddNoteModal
                userId={industryUserId}
                onCancel={onCancelClicked}
                viewNote={onViewNoteClicked}
            />
        )
    }
    const onViewNoteClicked = () => {
        setModal(
            <ViewNoteModal
                userId={industryUserId}
                onCancel={onCancelClicked}
                creatNote={onCreateNoteClicked}
            />
        )
    }

    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
        isHod: subadmin?.departmentMember?.isHod,
    })

    return (
        <div>
            {industry?.isLoading ? (
                <LoadingAnimation size={70} />
            ) : (
                <div>
                    {modal}
                    <div className="flex justify-between items-center">
                        <div>
                            <IndustryProfileAvatar
                                avatar={industry?.data?.user?.avatar as string}
                            />
                        </div>
                        <ProfileLinks industry={industry?.data} />
                    </div>
                    {/*  */}
                    <div className="flex justify-between items-center gap-x-3">
                        <div className="mt-2">
                            <Typography semibold>
                                <span className="text-[15px]">
                                    {industry?.data?.user?.name}
                                </span>
                            </Typography>

                            <Typography variant="xs" color="text-[#6B7280]">
                                {industry?.data?.isSnoozed
                                    ? '---'
                                    : maskText(
                                          industry?.data?.user?.email,
                                          isPermission
                                              ? industry?.data?.user?.email
                                                    ?.length || 0
                                              : 4
                                      )}
                            </Typography>

                            {/* <Typography variant="xs" color="text-[#6B7280]">
                        {industry?.data?.isSnoozed
                            ? '---'
                            : industry?.data?.user?.email}
                    </Typography>

                    <Typography variant="xs" color="text-[#6B7280]">
                        {industry?.data?.isSnoozed
                            ? '---'
                            : maskText(industry?.data?.user?.email)}
                    </Typography> */}
                        </div>
                    </div>
                    {/*  */}
                    <IndustryDetail industry={industry?.data} />
                    <IndustryContactPerson industry={industry?.data} />
                    {/*  */}
                    {/*  */}
                    {!subadmin?.isAssociatedWithRto ? (
                        <div className="flex items-center gap-x-2 py-3">
                            <Typography variant="label">Note: </Typography>
                            <div className="flex items-center">
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => {
                                        onViewNoteClicked()
                                    }}
                                >
                                    View
                                </ActionButton>
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => {
                                        onCreateNoteClicked()
                                    }}
                                >
                                    Add
                                </ActionButton>
                            </div>
                        </div>
                    ) : null}
                    {/*  */}{' '}
                    <UpdatedCourseList
                        sectorsWithCourses={sectorsWithCourses}
                    />
                    {/* <IndustrySectors courses={industry?.data?.courses} /> */}
                </div>
            )}
        </div>
    )
}
