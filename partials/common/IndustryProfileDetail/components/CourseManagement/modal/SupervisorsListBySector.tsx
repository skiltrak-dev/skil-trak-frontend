import { ActionButton, EmptyData, NoData, Typography } from '@components'
import { useContextBar } from '@hooks'
import { SupervisorQualification } from '@partials/common/IndustrySupervisor'
import { AddSupervisor } from '@partials/common/IndustrySupervisor/form'
import { IndustryApi } from '@queries'
import Image from 'next/image'

import { MdModeEdit } from 'react-icons/md'

export const SupervisorsListBySector = ({
    sector,
    industry,
    onCloseModal,
}: any) => {
    const contextBar = useContextBar()

    const getSupervisorBySector = IndustryApi.Supervisor.getSupervisorBySector({
        sectorId: sector?.id,
        indId: industry?.id,
    })

    const qualificationLevel = SupervisorQualification?.find(
        (level) => level.value === getSupervisorBySector?.data?.level
    )

    return (
        <>
            <div className="flex justify-center flex-col gap-y-2 px-8 py-4 w-96">
                <div className="flex flex-col gap-y-2 items-center">
                    <Image
                        src={'/images/industry/add-course-icon.svg'}
                        width={50}
                        height={50}
                        alt="course icon"
                    />
                    <Typography variant="subtitle" semibold>
                        Supervisor
                    </Typography>
                </div>
            </div>

            {getSupervisorBySector?.isError ? (
                <NoData isError text={'There is some technical issue!'} />
            ) : null}

            {getSupervisorBySector?.data && getSupervisorBySector?.isSuccess ? (
                <div className="h-auto bg-gradient-to-br from-blue-50 to-indigo-100 ">
                    <div className="container mx-auto px-4 py-8">
                        {/* Supervisor Grid */}
                        <div className="">
                            <div className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer transform hover:scale-105">
                                <div className="absolute top-1 right-1">
                                    <ActionButton
                                        variant="info"
                                        Icon={MdModeEdit}
                                        onClick={() => {
                                            contextBar.setTitle(
                                                'Edit Supervisor'
                                            )
                                            contextBar.show()
                                            contextBar.setContent(
                                                <AddSupervisor
                                                    edit
                                                    sector={sector}
                                                    industry={industry}
                                                    initialValues={
                                                        getSupervisorBySector?.data
                                                    }
                                                />
                                            )
                                            onCloseModal()
                                        }}
                                    />
                                </div>{' '}
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {getSupervisorBySector?.data?.name.charAt(
                                            0
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <Typography variant="subtitle">
                                            {getSupervisorBySector?.data?.name}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="border-t pt-4">
                                    <Typography variant="label">
                                        Qualification:
                                    </Typography>
                                    <Typography variant="subtitle">
                                        {qualificationLevel?.label}
                                    </Typography>
                                </div>
                                <div className="border-t mt-3">
                                    <Typography variant="label">
                                        Course Title:
                                    </Typography>
                                    <Typography variant="subtitle">
                                        {getSupervisorBySector?.data?.title}
                                    </Typography>
                                </div>
                                {/* <div className="mt-4 text-right">
                                    <span className="text-indigo-500 text-sm font-medium hover:text-indigo-700">
                                        View Details →
                                    </span>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* {selectedSupervisor && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Supervisor Details
                                </h2>
                                <button
                                    onClick={() => setSelectedSupervisor(null)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {selectedSupervisor.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-xl font-semibold text-gray-800">
                                            {selectedSupervisor.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 font-medium mb-2">
                                        Qualification:
                                    </p>
                                    <p className="text-gray-800 text-lg">
                                        {selectedSupervisor.qualification}
                                    </p>
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                        Contact
                                    </button>
                                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
                </div>
            ) : getSupervisorBySector?.isSuccess ? (
                <EmptyData />
            ) : null}
        </>
    )
}
