import {
    ActionButton,
    CustomDropdown,
    CustomDropdownPositionEnum,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { UserProfileDetailCard } from '@partials/common/Cards'
import {
    IndustryListingCallModal,
    ViewNoteModal,
} from '@partials/common/FindWorkplaces'
import { useIndustryListingActions } from '@partials/common/FindWorkplaces/hooks/useIndustryListingActions'
import { CommonApi } from '@queries'
import { IndustryStatus, Sector } from '@types'
import moment from 'moment'
import { ReactElement, useState } from 'react'

export const IndustryListingCB = ({ id }: { id: number }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const detail = CommonApi.FindWorkplace.useGetFutureIndustryDetail(id, {
        skip: !id,
    })

    const onModalCancelClicked = () => setModal(null)

    const onViewNote = (industry: any) => {
        setModal(
            <ViewNoteModal
                onCancel={onModalCancelClicked}
                industry={industry}
            />
        )
    }

    const onCopyInfo = (text: string, type: string) => {
        navigator.clipboard.writeText(text)
        notification.success({
            title: 'Copies',
            description: `${type} Copied`,
        })
    }

    const onPhoneClicked = (id: number, note: string) => {
        setModal(
            <IndustryListingCallModal
                note={note}
                id={id}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const { actionsModal, tableActionOptions } = useIndustryListingActions()

    const actions = tableActionOptions(detail?.data)

    const filteredActions = actions?.map((a: any) => {
        let detail = { ...a }
        delete detail.Icon

        return detail
    })

    const listingStatus = (status: string) => {
        switch (status) {
            case IndustryStatus.FAVOURITE:
                return '<p class="bg-green-100 text-green-500 rounded-sm px-2 py-0.5 text-[10px]">Favorite</p>'
            case IndustryStatus.DO_NOT_DISTURB:
                return '<p class="bg-red-100 text-red-500 rounded-sm px-2 py-0.5 text-[10px]">Do Not Disturb</p>'
            case IndustryStatus.BLOCKED:
                return '<p class="bg-red-100 text-red-500 rounded-sm px-2 py-0.5 text-[10px]">Blocked</p>'

            default:
                return '<p>---</p>'
        }
    }
    console.log({ createdBy: detail?.data })

    return (
        <>
            {modal}
            {actionsModal}
            <div className="bg-[#f5f5f5] rounded-md shadow-profiles p-2">
                {detail?.isLoading ? (
                    <LoadingAnimation />
                ) : detail?.data ? (
                    <div className=" flex flex-col gap-y-2">
                        <UserProfileDetailCard
                            title="Name"
                            detail={detail?.data?.businessName}
                            onClick={() => {
                                onCopyInfo(detail?.data?.businessName, 'Name')
                            }}
                        />
                        <UserProfileDetailCard
                            title="Email"
                            detail={detail?.data?.email}
                            onClick={() => {
                                onCopyInfo(detail?.data?.email, 'Email')
                            }}
                        />

                        {/*  */}
                        <div className="grid grid-cols-2 gap-2">
                            <UserProfileDetailCard
                                title="Phone"
                                detail={detail?.data?.phone}
                                onClick={() => {
                                    onPhoneClicked(id, detail?.data?.note)
                                    onCopyInfo(detail?.data?.phone, 'Phone')
                                }}
                            />
                            <UserProfileDetailCard
                                title="Department"
                                detail={detail?.data?.department}
                            />
                            <UserProfileDetailCard
                                title="Country"
                                detail={detail?.data?.country?.name}
                            />

                            <UserProfileDetailCard
                                title="State"
                                detail={detail?.data?.region?.name}
                            />
                            <UserProfileDetailCard
                                title="Status"
                                detail={listingStatus(detail?.data?.status)}
                            />
                            <UserProfileDetailCard
                                title="Created By"
                                detail={detail?.data?.createdBy?.name}
                            />
                            <UserProfileDetailCard
                                title="Created At"
                                detail={moment(detail?.data?.createdAt).format(
                                    'MMM DD, YYYY'
                                )}
                            />
                        </div>
                        <UserProfileDetailCard
                            title="Address"
                            detail={detail?.data?.address}
                            onClick={() => {
                                onCopyInfo(detail?.data?.address, 'Address')
                            }}
                        />
                        <UserProfileDetailCard
                            title="Sector"
                            detail={detail?.data?.sector
                                ?.map(
                                    (sec: Sector) =>
                                        `<span class="bg-green-100 text-green-500 rounded-sm px-2 py-0.5 text-[10px]">
                                        ${sec?.name}
                                    </span>`
                                )
                                ?.join(' , ')}
                        />

                        {/*  */}
                        <div className="flex items-center gap-x-2">
                            <Typography variant="label">Note: </Typography>
                            <div className="flex items-center">
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => {
                                        onViewNote(detail?.data)
                                    }}
                                >
                                    View
                                </ActionButton>
                                <ActionButton
                                    variant="info"
                                    simple
                                    onClick={() => {
                                        onPhoneClicked(id, detail?.data?.note)
                                    }}
                                >
                                    Add
                                </ActionButton>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-white">
                            <CustomDropdown
                                position={CustomDropdownPositionEnum.bottom}
                                text="Actions"
                                options={filteredActions}
                                data={detail?.data}
                            />
                        </div>
                    </div>
                ) : (
                    <NoData text="No Listing Detail were found!" />
                )}
            </div>
        </>
    )
}
