import { ActionButton, AuthorizedUserComponent } from '@components'
import { UserRoles } from '@constants'
import { Industry } from '@types'
import React from 'react'
import Modal from '@modals/Modal'
import { TbEyeUp } from 'react-icons/tb'
import { SupervisorsListBySector } from '../modal'
import { MdSupervisorAccount } from 'react-icons/md'
import { useContextBar } from '@hooks'
import { AddSupervisor } from '@partials/common/IndustrySupervisor/form'
import { IndustryApi } from '@queries'
import PuffLoader from 'react-spinners/PuffLoader'
import { getUserCredentials } from '@utils'

export const IndustryCourseSupervisors = ({
    industry,
    sectorData,
}: {
    sectorData: any
    industry: Industry
}) => {
    const contextBar = useContextBar()

    const getSupervisorBySector = IndustryApi.Supervisor.getSupervisorBySector({
        sectorId: sectorData?.sector?.id,
        indId: industry?.id,
    })
    const userRole = getUserCredentials()?.role
    return (
        <div>
            <AuthorizedUserComponent
                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN, UserRoles.RTO]}
            >
                {industry ? (
                    <div className="flex items-center justify-end gap-x-2">
                        {getSupervisorBySector?.isLoading ? (
                            <PuffLoader size={24} />
                        ) : getSupervisorBySector?.isSuccess &&
                          getSupervisorBySector?.data ? (
                            <div>
                                <Modal>
                                    <Modal.Open opens="addDepartmentCourse">
                                        <div className="relative group">
                                            <ActionButton
                                                Icon={TbEyeUp}
                                                disabled={
                                                    getSupervisorBySector?.isError
                                                }
                                                variant="warning"
                                            >
                                                View Supervisor
                                            </ActionButton>
                                        </div>
                                    </Modal.Open>
                                    <Modal.Window name="addDepartmentCourse">
                                        <SupervisorsListBySector
                                            industry={industry}
                                            getSupervisorBySector={
                                                getSupervisorBySector
                                            }
                                            sector={sectorData?.sector}
                                        />
                                    </Modal.Window>
                                </Modal>
                            </div>
                        ) : getSupervisorBySector?.isSuccess &&
                          !getSupervisorBySector?.data &&
                          userRole !== UserRoles.RTO ? (
                            <div className="relative group flex ">
                                <ActionButton
                                    Icon={MdSupervisorAccount}
                                    disabled={getSupervisorBySector?.isError}
                                    variant="dark"
                                    onClick={() => {
                                        contextBar.setTitle('Add Supervisor')
                                        contextBar.show()
                                        contextBar.setContent(
                                            <AddSupervisor
                                                industry={industry}
                                                sector={sectorData?.sector}
                                            />
                                        )
                                    }}
                                >
                                    Add Supervisor
                                </ActionButton>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </AuthorizedUserComponent>
        </div>
    )
}
