import {
    Button,
    EmptyData,
    PageSize,
    Pagination,
    TechnicalError,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { AdminLayout } from '@layouts'
import Modal from '@modals/Modal'
import {
    AddDepartmentCB,
    DepartmentCard,
    DepartmentListProvider,
    DepartmentListSkeleton,
    useDepartmentList,
} from '@partials/admin/departments'
import { SubAdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { getUserCredentials } from '@utils'
import { ReactElement } from 'react'

const Departments: NextPageWithLayout = () => {
    const {
        data,
        setItemPerPage,
        itemPerPage,
        setPage,
        isLoading,
        isError,
        addDepartment,
        setAddDepartment,
    } = useDepartmentList()
    const role = getUserCredentials()?.role
    const subAdmin = SubAdminApi.SubAdmin.useProfile(undefined, {
        skip: role !== UserRoles.SUBADMIN,
        refetchOnMountOrArgChange: true,
        // refetchOnFocus: true,
    })
    const checkIsHod =
        role === UserRoles.SUBADMIN && subAdmin?.data?.departmentMember?.isHod
    const hodDepartments = data?.data?.filter((department: any) => {
        return department?.departmentMembers?.some(
            (member: any) =>
                member?.isHod && member?.subadmin?.id == subAdmin?.data?.id
        )
    })

    return (
        <>
            {role === UserRoles.ADMIN && (
                <div className="flex justify-end mt-5 mr-5">
                    {/* {!addDepartment && ( */}
                    <>
                        {/* <Button
                                text="Add Department"
                                onClick={() => setAddDepartment(true)}
                            /> */}
                        <Modal>
                            <Modal.Open opens="addDepartment">
                                <Button
                                    text="Add Department"
                                    // onClick={() => setAddDepartment(true)}
                                />
                            </Modal.Open>
                            <Modal.Window name="addDepartment">
                                <AddDepartmentCB
                                    setAddDepartment={setAddDepartment}
                                    addDepartment={addDepartment}
                                />
                            </Modal.Window>
                        </Modal>
                    </>
                    {/* )} */}
                </div>
            )}

            {isError && <TechnicalError />}

            {isLoading ? (
                <DepartmentListSkeleton />
            ) : data?.data?.length ? (
                <div className="flex flex-col gap-y-5  my-5 mx-5 ">
                    {data?.data && data?.data?.length && (
                        <>
                            {checkIsHod ? (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Typography variant="h4">
                                                Departments List
                                            </Typography>
                                        </div>
                                    </div>
                                    {hodDepartments?.map((department: any) => (
                                        <DepartmentCard
                                            key={department.id}
                                            department={department}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <Typography variant="h4">
                                                Departments List
                                            </Typography>
                                        </div>
                                        <div className="flex items-center gap-x-4 justify-end">
                                            <PageSize
                                                itemPerPage={itemPerPage}
                                                setItemPerPage={setItemPerPage}
                                                records={data?.data?.length}
                                            />
                                            <Pagination
                                                pagination={data?.pagination}
                                                setPage={setPage}
                                            />
                                        </div>
                                    </div>
                                    {data?.data?.map((department: any) => (
                                        <DepartmentCard
                                            key={department.id}
                                            department={department}
                                        />
                                    ))}
                                </>
                            )}
                        </>
                    )}
                </div>
            ) : (
                !isError &&
                !data?.data?.length && (
                    <EmptyData
                        title="No Department(s)"
                        description="No department has been added yet"
                    />
                )
            )}
        </>
    )
}

Departments.getLayout = (page: ReactElement) => {
    return (
        <AdminLayout>
            <DepartmentListProvider>{page}</DepartmentListProvider>
        </AdminLayout>
    )
}

export default Departments
