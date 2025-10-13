import { Badge, Button, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import { RunAutomationEnum } from '@partials/common/FindWorkplaces/enum'
import {
    BlacklistWarningModal,
    ChangeIndustrySectorModal,
    CompanyProfileModal,
} from '@partials/common/FindWorkplaces/modal'
import { CommonApi } from '@queries'
import { getPostalCode } from '@utils'
import { ReactElement, useEffect, useState } from 'react'
import {
    MdClose,
    MdLocationOn,
    MdStorage,
    MdVisibility,
    MdVpnKey,
    MdWarning,
} from 'react-icons/md'
import { THEME_COLORS } from '../utils/theme'
import { CgArrowsExchange } from 'react-icons/cg'

export const ResultDisplayCard = ({
    setRemovedItems,
    removedItems,
    groupIndex,
    companyIndex,
    company,
    selectedLocationId,
    companyAnalyses,
}: {
    removedItems: any
    setRemovedItems: (ids: any) => void
    company: any
    groupIndex: number
    companyIndex: number
    companyAnalyses: any
    selectedLocationId: string
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [postCode, setPostCode] = useState<string | null>(null)

    const { notification } = useNotification()

    const [removeDuplicate, removeDuplicateResult] =
        CommonApi.FindWorkplace.updateEligibilityListing()

    const isDuplicate = company?.duplicated
    const analysis = companyAnalyses.get(company.id)

    useEffect(() => {
        const getPostCode = async () => {
            const postalCode = await getPostalCode(company?.location)
            setPostCode(postalCode)
        }
        getPostCode()
    }, [company?.location])

    const onCancel = () => setModal(null)

    const handleViewProfile = (company: any) => {
        // setSelectedCompany(company)
        setModal(
            <CompanyProfileModal
                onCancel={onCancel}
                selectedCompany={company}
            />
        )
    }

    const onConfirmClicked = async (reason: RunAutomationEnum) => {
        const res: any = await removeDuplicate({
            id: company?.placeId,
            reason,
        })

        if (res?.data) {
            notification.success({
                title: `Industry Removed`,
                description: `Industry has been removed.`,
            })
            setRemovedItems(
                (prev: string[]) => new Set([...prev, company?.placeId])
            )

            onCancel()
        }
    }

    const onRemoveDuplicate = () => {
        setModal(
            <BlacklistWarningModal
                company={company}
                onConfirmClicked={() =>
                    onConfirmClicked(RunAutomationEnum.DUPLICATED)
                }
                onCancel={onCancel}
                removalReason={RunAutomationEnum.DUPLICATED}
            />
        )
    }

    const onEligibilityUpdate = () => {
        setModal(
            <BlacklistWarningModal
                company={company}
                onCancel={onCancel}
                onConfirmClicked={() =>
                    onConfirmClicked(RunAutomationEnum.NOT_ELIGIBLE)
                }
                removalReason={RunAutomationEnum.NOT_ELIGIBLE}
            />
        )
    }

    const onUpdateIndustrySector = () => {
        setModal(
            <ChangeIndustrySectorModal
                company={company}
                onCancel={onCancel}
                setRemovedItems={setRemovedItems}
            />
        )
    }

    return (
        <>
            <div className="relative z-10">
                {!removeDuplicateResult?.isLoading && modal}
            </div>
            <ShowErrorNotifications result={removeDuplicateResult} />
            {removeDuplicateResult?.isLoading && (
                <div className="w-full h-screen absolute top-0 left-0 inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="flex flex-col items-center">
                        {/* Spinner */}
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-3"></div>
                        <Typography color="text-gray-600">
                            Loading...
                        </Typography>
                    </div>
                </div>
            )}
            <div
                key={`${groupIndex}-${companyIndex}`}
                className="relative animate-slide-up-fade"
                style={{
                    animationDelay: `${
                        groupIndex * 0.1 + companyIndex * 0.05
                    }s`,
                }}
            >
                <div
                    className={`hover:shadow-md transition-all relative border rounded-lg bg-white shadow-sm cursor-pointer ${
                        selectedLocationId === company.id
                            ? 'ring-2 ring-opacity-50'
                            : ''
                    }`}
                    style={
                        isDuplicate
                            ? {
                                  borderColor: 'rgba(247, 166, 25, 0.3)',
                                  backgroundColor: 'rgba(247, 166, 25, 0.05)',
                              }
                            : selectedLocationId === company.id
                            ? {
                                  borderColor: THEME_COLORS.accent,
                                  backgroundColor: 'rgba(247, 166, 25, 0.05)',
                                  //   ringColor:
                                  //       THEME_COLORS.accent,
                              }
                            : {}
                    }
                >
                    <div className="py-3 pb-1 px-4">
                        <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-sm truncate font-medium">
                                        {company.name}
                                    </h3>

                                    {/* Icons for different match types */}
                                    <div className="flex items-center gap-1">
                                        {analysis?.hasKeywordMatch && (
                                            <div className="flex items-center gap-1">
                                                <MdVpnKey
                                                    className="w-3 h-3"
                                                    style={{
                                                        color: THEME_COLORS.accent,
                                                    }}
                                                />
                                                <Typography variant="xxs">
                                                    Keyword match
                                                </Typography>
                                            </div>
                                        )}

                                        {analysis?.hasSkilTrakMatch && (
                                            <div className="flex items-center gap-1">
                                                <MdStorage
                                                    className="w-3 h-3"
                                                    style={{
                                                        color: '#ef4444',
                                                    }}
                                                />
                                                <Typography
                                                    variant="xxs"
                                                    color="text-[#ef4444]"
                                                >
                                                    Maybe not eligible
                                                </Typography>
                                            </div>
                                        )}

                                        {isDuplicate && (
                                            <div className="flex items-center gap-1">
                                                <MdWarning
                                                    className="w-3 h-3"
                                                    style={{
                                                        color: THEME_COLORS.accent,
                                                    }}
                                                />
                                                <Typography
                                                    variant="xxs"
                                                    color="text-primaryNew"
                                                >
                                                    Possible duplicate
                                                </Typography>
                                            </div>
                                        )}
                                        {company?.NOT_ELIGIBLE && (
                                            <div className="flex items-center gap-1">
                                                <MdWarning
                                                    className="w-3 h-3"
                                                    style={{
                                                        color: THEME_COLORS.accent,
                                                    }}
                                                />
                                                <Typography
                                                    variant="xxs"
                                                    color="text-primaryNew"
                                                >
                                                    Possible Not Eligible
                                                </Typography>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <MdLocationOn className="w-3 h-3 flex-shrink-0" />
                                    <Typography
                                        variant="xs"
                                        color="text-gray-600"
                                    >
                                        <span className="truncate">
                                            {analysis?.addressCode ||
                                                company.address}
                                        </span>
                                    </Typography>
                                    <Badge
                                        variant="primaryNew"
                                        text={postCode + ''}
                                    />
                                </div>

                                {/* Keyword matches display */}
                                {company?.types &&
                                    company?.types?.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {company?.types.map(
                                                (type: any, idx: number) => (
                                                    <Badge
                                                        outline
                                                        key={idx}
                                                        text={type}
                                                        variant="primaryNew"
                                                    />
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <div className="flex flex-col gap-1">
                                    {company?.duplicated && (
                                        <Badge
                                            outline
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                onRemoveDuplicate()
                                            }}
                                            variant="primary"
                                            text={'Remove Duplicate'}
                                            Icon={MdClose}
                                        />
                                    )}

                                    <Badge
                                        outline
                                        onClick={(e: any) => {
                                            onEligibilityUpdate()
                                        }}
                                        variant="error"
                                        text={'Remove Not Eligible'}
                                        Icon={MdClose}
                                    />
                                    <Badge
                                        outline
                                        onClick={() => {
                                            onUpdateIndustrySector()
                                        }}
                                        variant="success"
                                        text={'Update Industry Sector'}
                                        Icon={CgArrowsExchange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-0 pb-2 space-y-2 px-4">
                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-1">
                            <Button
                                outline
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewProfile(company)
                                }}
                                fullWidth
                                variant="primaryNew"
                                text=" View Profile"
                                Icon={MdVisibility}
                            />

                            {/* <Button
                            fullWidth
                            outline
                            onClick={(e) => {
                                e.stopPropagation()
                                handleVisitWebsite(company)
                            }}
                            variant="primary"
                            Icon={MdOpenInNew}
                            text="Website"
                        /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
