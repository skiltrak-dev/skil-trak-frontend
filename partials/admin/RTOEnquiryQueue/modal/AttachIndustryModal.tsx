import {
    Badge,
    GlobalModal,
    LoadingAnimation,
    NoData,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { Button } from '@components/buttons/Button/Button'
import { TextInput } from '@components/inputs/TextInput'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { Industry } from '@types'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import {
    Building2,
    CheckCircle,
    Link as LinkIcon,
    Mail,
    Search,
} from 'lucide-react'
import moment from 'moment'
import { ChangeEvent, useState } from 'react'
import { MdCancel } from 'react-icons/md'

interface AttachIndustryModalProps {
    enquiryId: number
    onClose: () => void
    premiumFeatureId: number
}

export const AttachIndustryModal = ({
    onClose,
    enquiryId,
    premiumFeatureId,
}: AttachIndustryModalProps) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedIndustryId, setSelectedIndustryId] = useState<number | null>(
        null
    )

    const { notification } = useNotification()

    const premiumIndustriesList = AdminApi.RtoEnquiry.premiumIndustriesList(
        premiumFeatureId,
        {
            skip: !premiumFeatureId,
        }
    )
    const [attachIndustry, attachIndustryResult] =
        AdminApi.RtoEnquiry.attachIndustry()

    const bgClasses = classNames({
        'relative px-6 pt-6 pb-4 bg-primaryNew overflow-hidden': true,
    })

    const handleAttach = async () => {
        if (!selectedIndustryId) {
            notification.warning({
                title: 'Industry Not Selected',
                description: 'Industry Required',
            })
            return
        }

        const res: any = await attachIndustry({
            id: enquiryId,
            indId: selectedIndustryId,
        })

        if (res?.data) {
            notification.success({
                title: 'Industry Attached',
                description: 'Industry Attached Successfully',
            })
            onClose()
        }
    }

    const handleClose = () => {
        setSelectedIndustryId(null)
        setSearchQuery('')
        onClose()
    }

    return (
        <GlobalModal className="!overflow-hidden !max-w-3xl">
            <ShowErrorNotifications result={attachIndustryResult} />
            <MdCancel
                onClick={handleClose}
                className="z-30 transition-all duration-500 text-gray-200 hover:text-gray-100 text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
            />
            <div className={bgClasses}>
                <div className="relative">
                    <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-premium border border-white/30 shrink-0">
                            <LinkIcon
                                className="h-7 w-7 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                            <Typography className="text-white text-xl">
                                Attach Industry Partner
                            </Typography>
                            <Typography className="text-white/90 text-sm leading-relaxed">
                                Search and select an active premium industry
                                account to match with this enquiry. Both parties
                                will be notified via email.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            {premiumIndustriesList?.isError ? (
                <NoData isError text="There is some technical issue" />
            ) : null}
            {premiumIndustriesList?.isLoading ||
            premiumIndustriesList?.isFetching ? (
                <LoadingAnimation />
            ) : premiumIndustriesList?.data?.data &&
              premiumIndustriesList?.data?.data?.length > 0 &&
              premiumIndustriesList?.isSuccess ? (
                <div className="h-[70vh] overflow-auto custom-scrollbar p-4">
                    <div className="space-y-3">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c8c8c]" />
                            <TextInput
                                name="industrySearch"
                                placeholder="Search industries by name or email..."
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSearchQuery(e.target.value)
                                }
                                className="pl-9"
                                showError={false}
                            />
                        </div>

                        {/* Industry List */}
                        <div className="border rounded-lg -y-auto">
                            {premiumIndustriesList?.data?.data?.map(
                                (industry: Industry) => (
                                    <motion.div
                                        key={industry.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        onClick={() =>
                                            setSelectedIndustryId(industry?.id)
                                        }
                                        className={`p-4 border-b last:border-0 cursor-pointer transition-all duration-200 ${
                                            selectedIndustryId === industry.id
                                                ? 'bg-[#0D5468]/10 border-l-4 border-l-[#0D5468]'
                                                : 'hover:bg-[#f0f2f5]'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex gap-3 flex-1">
                                                <div className="p-2.5 h-fit rounded-lg bg-[#044866]/10 flex-shrink-0">
                                                    <Building2 className="h-5 w-5 text-[#044866]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-[#262626]">
                                                            {
                                                                industry?.user
                                                                    ?.name
                                                            }
                                                        </h4>
                                                        {industry?.isPartner && (
                                                            <Badge
                                                                text="Industry Partner"
                                                                variant="primaryNew"
                                                                className="bg-[#044866] text-xs"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-[#8c8c8c] mb-1">
                                                        <Mail className="h-3.5 w-3.5" />
                                                        {industry?.user?.email}
                                                    </div>
                                                    <p className="text-xs text-[#8c8c8c]">
                                                        Member since{' '}
                                                        {moment(
                                                            industry?.createdAt
                                                        ).format(
                                                            'MMM, DD YYYY'
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            {selectedIndustryId ===
                                                industry.id && (
                                                <CheckCircle className="h-5 w-5 text-[#0D5468] flex-shrink-0" />
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                text="Cancel"
                                fullWidth
                                onClick={handleClose}
                            />
                            <Button
                                text="Attach Selected Industry"
                                variant="primaryNew"
                                fullWidth
                                onClick={handleAttach}
                                loading={attachIndustryResult?.isLoading}
                                disabled={
                                    !selectedIndustryId ||
                                    attachIndustryResult?.isLoading
                                }
                            />
                        </div>
                    </div>
                </div>
            ) : premiumIndustriesList?.isSuccess ? (
                <NoData text="There is no Inustries" />
            ) : null}
        </GlobalModal>
    )
}
