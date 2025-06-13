import {
    Typography,
    useAuthorizedUserComponent,
    useIsRestricted,
    useRestrictedData,
} from '@components'
import { UserRoles } from '@constants'
import { useNotification, useSubadminProfile } from '@hooks'
import { UserProfileDetailCard } from '@partials/common/Cards'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { getUserCredentials, maskText } from '@utils'

export const IndustryContactPerson = ({ industry }: { industry: Industry }) => {
    const [callLog, callLogResult] = SubAdminApi.Industry.useIndustryCallLog()

    const canAssessData = useIsRestricted(UserRoles.INDUSTRY)

    const { notification } = useNotification()
    const role = getUserCredentials()?.role
    const checkRto = role === UserRoles.RTO

    const subadmin = useSubadminProfile()
    const isPermission = useAuthorizedUserComponent({
        isHod: subadmin?.departmentMember?.isHod,
        roles: [UserRoles.ADMIN, UserRoles.INDUSTRY, UserRoles.RTO],
    })

    return (
        <div className="py-3.5 border-b border-secondary-dark flex flex-col gap-y-0.5">
            <Typography variant="small" medium>
                Contact Person
            </Typography>

            {/*  */}
            <div className="mt-1.5 flex flex-col gap-y-1.5">
                <div className="flex items-center gap-x-[5px]">
                    <UserProfileDetailCard
                        title="Name"
                        detail={industry?.contactPerson}
                    />
                    {/* <UserProfileDetailCard
                        title="Phone"
                        detail={useRestrictedData(
                            industry?.isSnoozed
                                ? '---'
                                : industry?.contactPersonNumber
                                ? maskText(industry?.contactPersonNumber)
                                : 'Phone No block for 24 hrs',
                            UserRoles.INDUSTRY
                        )}
                        onClick={
                            !checkRto
                                ? () => {
                                      if (
                                          !industry?.isSnoozed &&
                                          canAssessData
                                      ) {
                                          navigator.clipboard.writeText(
                                              industry?.contactPersonNumber
                                          )
                                          callLog({
                                              industry: industry?.id,
                                              receiver: UserRoles.INDUSTRY,
                                          }).then((res: any) => {
                                              if (res?.data) {
                                                  notification.success({
                                                      title: 'Called Industry',
                                                      description: `Called Industry with Name: ${industry?.user?.name}`,
                                                  })
                                              }
                                          })
                                          notification.success({
                                              title: 'Copied',
                                              description:
                                                  'Contact Person Number Copied',
                                          })
                                      }
                                  }
                                : undefined
                        }
                    /> */}
                </div>
            </div>
        </div>
    )
}
