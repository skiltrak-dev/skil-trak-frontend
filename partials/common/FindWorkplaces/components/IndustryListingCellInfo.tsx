import {
    InitialAvatar,
    Tooltip,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'
import Image from 'next/image'
import { PiPhoneCallDuotone } from 'react-icons/pi'
import { CopyData } from './CopyData'

export const IndustryListingCellInfo = ({
    industryListing,
    isDuplicated,
}: {
    isDuplicated: boolean
    industryListing: any
}) => {
    return (
        <div className={`flex items-center gap-x-1.5`}>
            {industryListing?.businessName && (
                <InitialAvatar name={industryListing?.businessName} />
            )}
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <div className="group flex items-center gap-x-1">
                        <Typography variant={'label'}>
                            {industryListing?.businessName}
                        </Typography>
                        <CopyData
                            text={industryListing?.businessName}
                            type={'Industry Name'}
                        />
                    </div>
                    {industryListing?.signedUp && (
                        <div className="relative group">
                            <Image
                                src={'/images/signup.png'}
                                alt={''}
                                width={30}
                                height={30}
                            />
                            <Tooltip>Signed Up</Tooltip>
                        </div>
                    )}
                    {industryListing?.isContacted && (
                        <div className="relative group">
                            <PiPhoneCallDuotone
                                size={20}
                                className="text-success-dark"
                            />
                            <Tooltip>Called</Tooltip>
                        </div>
                    )}
                </div>
                {/* <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={
                                    isDuplicated
                                        ? [info?.row?.original?.email]
                                        : ['']
                                }
                                autoEscape={true}
                                textToHighlight={info?.row?.original?.email}
                            /> */}
                <div
                    className={` relative group ${
                        isDuplicated ? 'bg-gray-300' : ''
                    } px-1.5 rounded-md`}
                >
                    <TruncatedTextWithTooltip
                        text={industryListing?.email}
                        maxLength={20}
                    />

                    {isDuplicated ? <Tooltip>Duplicated Found</Tooltip> : null}
                </div>
            </div>
        </div>
    )
}
