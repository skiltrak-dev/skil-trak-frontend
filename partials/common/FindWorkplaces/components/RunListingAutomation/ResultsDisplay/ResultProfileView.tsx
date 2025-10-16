import {
    Badge,
    Button,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { getPostalCode } from '@utils'
import React, { useEffect, useState } from 'react'
import {
    MdLanguage,
    MdLocationOn,
    MdOpenInNew,
    MdWarningAmber,
} from 'react-icons/md'
import { THEME_COLORS } from '../utils/theme'

interface CompanyProfileProps {
    selectedCompany: any
}

export const ResultProfileView: React.FC<CompanyProfileProps> = ({
    selectedCompany,
}) => {
    const [postCode, setPostCode] = useState<string | null>(null)

    const companyDetail = CommonApi.FindWorkplace.listingAutomationDetails(
        selectedCompany?.placeId,
        {
            skip: !selectedCompany?.placeId,
        }
    )

    useEffect(() => {
        const getPostCode = async () => {
            const postalCode = await getPostalCode(selectedCompany?.location)
            setPostCode(postalCode)
        }
        getPostCode()
    }, [selectedCompany?.location])

    const getBadgeStyle = (type: string) => {
        switch (type) {
            case 'Private':
                return 'primaryNew'
            case 'Public':
                return 'primary'
            case 'Government':
                return 'secondary'
            case 'Not-for-profit':
                return 'primaryNew'
            default:
                return 'muted'
        }
    }

    const handleVisitWebsite = () => {
        // Open company website
        window.open(companyDetail?.data?.result?.website, '_blank')

        // toast.success(`Opening website for ${company.name}`, {
        //     duration: 2000,
        // })
    }

    return (
        <div className="max-w-3xl">
            {companyDetail?.isError ? (
                <NoData isError text="There is some technical issue!" />
            ) : null}
            {companyDetail?.isLoading ? (
                <LoadingAnimation />
            ) : companyDetail?.data && companyDetail?.isSuccess ? (
                <div
                    className="animate-slide-up-fade"
                    style={{
                        animationDelay: `0.5s`,
                    }}
                >
                    <div
                        className={`hover:shadow-md transition-all relative border rounded-lg bg-white shadow-sm cursor-pointer ring-2 ring-opacity-50`}
                        style={
                            companyDetail?.data?.result?.isduplicated
                                ? {
                                      borderColor: 'rgba(247, 166, 25, 0.3)',
                                      backgroundColor:
                                          'rgba(247, 166, 25, 0.05)',
                                  }
                                : true
                                ? {
                                      borderColor: THEME_COLORS.accent,
                                      backgroundColor:
                                          'rgba(247, 166, 25, 0.05)',
                                      //   ringColor:
                                      //       THEME_COLORS.accent,
                                  }
                                : {}
                        }
                        // onClick={() => handleLocationSelect(company.id)}
                    >
                        <div className="py-3 pb-1 px-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-sm truncate font-medium">
                                            {companyDetail?.data?.result?.name}
                                        </h3>

                                        {/* Icons for different match types */}
                                        <div className="flex items-center gap-1">
                                            {companyDetail?.data?.result
                                                ?.isduplicated && (
                                                <div className="flex items-center gap-1">
                                                    <MdWarningAmber
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
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <MdLocationOn className="w-3 h-3 flex-shrink-0" />
                                        <Typography
                                            variant="xs"
                                            color="text-gray-600"
                                        >
                                            <span className="truncate">
                                                {
                                                    companyDetail?.data?.result
                                                        ?.formatted_address
                                                }
                                            </span>
                                        </Typography>
                                        {postCode && (
                                            <Badge
                                                variant="primaryNew"
                                                text={postCode + ''}
                                            />
                                        )}
                                    </div>

                                    {companyDetail?.data?.result?.website && (
                                        <div className="flex gap-2">
                                            <MdLanguage className="w-3 h-3 flex-shrink-0" />
                                            <Typography
                                                variant="xs"
                                                color="text-gray-500"
                                            >
                                                <span className="break-all">
                                                    {
                                                        companyDetail?.data
                                                            ?.result?.website
                                                    }
                                                </span>
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="pt-0 pb-2 space-y-2 px-4">
                            <div className="flex items-center">
                                <Badge
                                    variant="primary"
                                    text={companyDetail?.data?.result?.type}
                                />
                            </div>

                            {/* Action Buttons */}
                            {companyDetail?.data?.result?.website && (
                                <div className="flex items-center gap-2 pt-1">
                                    <Button
                                        fullWidth
                                        outline
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleVisitWebsite()
                                        }}
                                        variant="primary"
                                        Icon={MdOpenInNew}
                                        text="Website"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : companyDetail?.isSuccess ? (
                <NoData text="Company detail not found!" />
            ) : null}
            {/* {selectedCompany && (
                    <div className="space-y-4">
                        <Typography variant="h4">
                            {selectedCompany.name}
                        </Typography>
                        <Typography variant="body" color="text-gray-600">
                            {selectedCompany.address}
                        </Typography>
                        <div className="flex items-center gap-2">
                            <Badge
                                variant={getBadgeStyle(selectedCompany.type)}
                                text={selectedCompany.type}
                            />
                        </div>
                    </div>
                )} */}
        </div>
    )
}
