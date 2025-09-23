import { TableAction } from '@components'
import { UserRoles } from '@constants'
import { useActionModal } from '@hooks'
import { MailPasswordModal } from '@partials/common/StudentProfileDetail/modals'
import { ViewProfileVisitorsModal } from '@partials/common/modal'
import { SubAdminApi } from '@queries'
import { Industry, User } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { BsThreeDotsVertical, BsUnlockFill } from 'react-icons/bs'
import { CiUnlock } from 'react-icons/ci'
import { IoMdEyeOff } from 'react-icons/io'
import { RiEditFill, RiFootprintFill } from 'react-icons/ri'
import {
    AcceptingStudentModal,
    AddIndustryQuestionsModal,
    AddRplModal,
    ViewIndustryAnswersModal,
} from '../../modal'

export const ProfileLinks = ({
    isHod,
    industry,
}: {
    isHod?: boolean
    industry: Industry
}) => {
    const router = useRouter()
    const { passwordModal, onViewPassword, onUpdatePassword } = useActionModal()
    const [modal, setModal] = useState<ReactNode | null>(null)

    const role = getUserCredentials()?.role

    const subadmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        // refetchOnFocus: true,
    })

    const onCancelModal = () => setModal(null)

    const onMailPasswordToStudent = (user: User) => {
        setModal(<MailPasswordModal user={user} onCancel={onCancelModal} />)
    }

    const onViewProfileVisitorsClicked = () => {
        setModal(
            <ViewProfileVisitorsModal
                onCancel={onCancelModal}
                userId={industry?.user.id}
            />
        )
    }

    const onViewIndustryAnswersClicked = () =>
        setModal(
            <ViewIndustryAnswersModal
                industryId={industry?.id}
                onCancel={onCancelModal}
            />
        )

    const onAddIndustryAnswersClicked = () =>
        setModal(
            <AddIndustryQuestionsModal
                industry={industry}
                onCancel={onCancelModal}
            />
        )

    const onAddRpl = () =>
        setModal(<AddRplModal industry={industry} onCancel={onCancelModal} />)

    const profileLinks = [
        {
            ...(role === UserRoles.ADMIN || isHod
                ? {
                      text: 'Edit Profile',
                      Icon: RiEditFill,
                      onClick: () => {
                          if (
                              role === UserRoles.ADMIN ||
                              subadmin?.data?.isAdmin
                          ) {
                              router.push(
                                  `/portals/admin/industry/edit-industry/${industry?.id}`
                              )
                          } else if (role === UserRoles.SUBADMIN) {
                              router.push(
                                  `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                              )
                          }
                      },
                  }
                : {}),
        },

        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'Edit Password',
                      Icon: BsUnlockFill,
                      onClick: () => {
                          onUpdatePassword({ user: industry?.user })
                      },
                  }
                : {}),
        },
        {
            text: 'Send Password',
            Icon: CiUnlock,
            onClick: () => {
                onMailPasswordToStudent(industry?.user)
            },
        },
        {
            ...(role === UserRoles.ADMIN
                ? {
                      text: 'View Password',
                      Icon: IoMdEyeOff,
                      onClick: () => {
                          onViewPassword(industry)
                      },
                  }
                : {}),
        },
        {
            text: 'Placement Status',
            Icon: RiEditFill,
            onClick: () => {
                setModal(
                    <AcceptingStudentModal
                        industry={industry}
                        onCancel={onCancelModal}
                    />
                )
            },
        },
        // {
        //     text: 'Eligibility Criteria',
        //     Icon: RiEditFill,
        //     onClick: () => {
        //         setModal(
        //             <PlacementEligibilityCriteriaModal
        //                 industry={industry}
        //                 onCancel={onCancelModal}
        //             />
        //         )
        //     },
        // },
        {
            ...(role === UserRoles.ADMIN || role === UserRoles.SUBADMIN
                ? {
                      text: 'View Visitors',
                      Icon: RiFootprintFill,
                      onClick: () => onViewProfileVisitorsClicked(),
                  }
                : {}),
        },
        {
            text:
                industry?.approvalReviewQuestionCount &&
                industry?.approvalReviewQuestionCount > 0
                    ? 'View Industry Answers'
                    : 'ADD INDUSTRY ANSWERS',
            Icon: RiEditFill,
            onClick: () => {
                industry?.approvalReviewQuestionCount &&
                industry?.approvalReviewQuestionCount > 0
                    ? onViewIndustryAnswersClicked()
                    : onAddIndustryAnswersClicked()
            },
        },
        {
            text: 'Add Rpl',
            Icon: RiEditFill,
            onClick: () => {
                onAddRpl()
            },
        },
    ]

    return (
        <div className="flex flex-col items-end gap-y-2.5">
            {modal}
            {passwordModal}

            <div className="flex gap-x-1 items-center">
                <TableAction options={profileLinks} rowItem={industry}>
                    <button className="text-xs rounded px-4 py-2 uppercase font-medium text-gray-800 flex gap-x-2 items-center">
                        <BsThreeDotsVertical size={19} />
                    </button>
                </TableAction>
            </div>
        </div>
    )
}
