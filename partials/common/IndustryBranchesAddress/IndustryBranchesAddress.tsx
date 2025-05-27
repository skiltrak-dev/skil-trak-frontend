import {
    AuthorizedUserComponent,
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    NoData,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaEye, FaFileExport } from 'react-icons/fa'

import { CommonApi } from '@queries'
import { Industry, IndustryBranchesAddressType } from '@types'
import { ReactElement, useState } from 'react'

// hooks
import { useContextBar } from '@hooks'
import {
    MdDelete,
    MdEmail,
    MdKeyboardArrowDown,
    MdPhoneIphone,
} from 'react-icons/md'
import { AddBranchesAddresses, EditBranchesAddresses } from './contextBar'
import { DeleteBranchesModal } from './modal'
import { Waypoint } from 'react-waypoint'
import { InfoCard } from '../IndustrySupervisor'
import { PulseLoader } from 'react-spinners'
import { LuPlus } from 'react-icons/lu'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BranchContactPersonInfoCard } from './BranchContactPersonInfoCard'
import { UserRoles } from '@constants'

export const IndustryBranchesAddress = ({
    industry,
}: {
    industry: Industry
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isViewd, setIsViewd] = useState<boolean>(false)
    const [showIndustryList, setShowIndustryList] = useState<boolean>(false)

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const contextBar = useContextBar()

    const industries = CommonApi.Industries.useList(
        {
            id: industry?.id,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            skip: !isViewd,
        }
    )

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onRemoveBranch = (branch: IndustryBranchesAddressType) => {
        setModal(
            <DeleteBranchesModal
                branch={branch}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onAddLocations = () => {
        contextBar.show(false)
        contextBar.setTitle('Add Secondary Address')
        contextBar.setContent(
            <AddBranchesAddresses industryId={industry?.id} />
        )
    }

    const onEditBranch = (branch: IndustryBranchesAddressType) => {
        contextBar.show(false)
        contextBar.setTitle('Edit Secondary Address')
        contextBar.setContent(
            <EditBranchesAddresses branch={branch} industryId={industry?.id} />
        )
    }

    const tableActionOptions: TableActionOption<any>[] = [
        {
            text: 'Edit',
            onClick: (branch: any) => {
                onEditBranch(branch)
            },
            Icon: FaEye,
        },
        {
            text: 'Delete',
            onClick: (branch: IndustryBranchesAddressType) =>
                onRemoveBranch(branch),
            Icon: MdDelete,
        },
    ]

    const onClickShowIndustryList = () => {
        setShowIndustryList(!showIndustryList)
    }
    return (
        <>
            {modal && modal}
            <Waypoint
                onEnter={() => {
                    setIsViewd(true)
                }}
            >
                <div className="flex gap-x-2 border rounded-md p-2.5 items-center justify-between shadow-lg relative w-full">
                    <Typography variant={'label'}>Branches</Typography>

                    <div className="flex items-center gap-x-1 ">
                        <AuthorizedUserComponent
                            roles={[
                                UserRoles.SUBADMIN,
                                UserRoles.ADMIN,
                                UserRoles.INDUSTRY,
                            ]}
                        >
                            <div
                                onClick={onAddLocations}
                                className="border rounded-md p-1 cursor-pointer"
                            >
                                <LuPlus />
                            </div>
                        </AuthorizedUserComponent>
                        <div
                            onClick={onClickShowIndustryList}
                            className="border rounded-md p-1 cursor-pointer"
                        >
                            <MdKeyboardArrowDown
                                className={`transition-all duration-300 ${
                                    showIndustryList ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                        </div>
                    </div>
                    <div
                        className={`${
                            showIndustryList ? 'block' : 'hidden'
                        } absolute top-11 z-40 left-0 transition-all max-h-60 overflow-auto custom-scrollbar duration-300 bg-white border rounded-md px-4 py-2 w-full`}
                    >
                        <div className="">
                            {industries.isError && (
                                <NoData
                                    simple
                                    text="There is technical issue!"
                                    isError
                                />
                            )}
                            {industries.isLoading ? (
                                <PulseLoader size={6} />
                            ) : industries?.data &&
                              industries?.data?.data?.length ? (
                                //
                                <div className="flex flex-col gap-y-3">
                                    {industries?.data?.data?.map(
                                        (industry: any) => (
                                            <div
                                                key={industry?.id}
                                                className="p-2 flex flex-col gap-y-2 bg-[#24556D1A] bg-opacity-10 border border-[#A5A3A9] rounded-md"
                                            >
                                                <BranchContactPersonInfoCard
                                                    name={
                                                        industry?.contactPerson
                                                    }
                                                    email={
                                                        industry?.contactPersonEmail
                                                    }
                                                    phone={
                                                        industry?.contactPersonPhone
                                                    }
                                                />
                                                <InfoCard
                                                    title={'Address'}
                                                    data={industry?.address}
                                                />
                                                <div className="flex items-center gap-x-2 w-full">
                                                    <InfoCard
                                                        title={'Capacity'}
                                                        data={
                                                            industry?.studentCapacity
                                                        }
                                                    />
                                                    <InfoCard
                                                        title={'Enrolled'}
                                                        data={
                                                            industry?.enrolledStudents
                                                        }
                                                    />
                                                </div>
                                                <div className="flex items-center gap-x-2 justify-center">
                                                    <div
                                                        onClick={() => {
                                                            onRemoveBranch(
                                                                industry
                                                            )
                                                        }}
                                                        className="bg-primaryNew p-2 rounded-md cursor-pointer"
                                                    >
                                                        <RiDeleteBin6Line className="text-white" />
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            onEditBranch(
                                                                industry
                                                            )
                                                        }}
                                                        className="bg-primaryNew p-2 rounded-md cursor-pointer"
                                                    >
                                                        <CiEdit className="text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                !industries.isError && (
                                    <div className="text-center p-3 text-[10px] whitespace-nowrap text-gray-400 border-2 border-dashed border-gray-200 rounded-md">
                                        No branches found
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </Waypoint>
        </>
    )
}
