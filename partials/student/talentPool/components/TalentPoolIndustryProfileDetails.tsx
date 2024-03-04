import {
    Avatar,
    Button,
    GlobalModal,
    InitialAvatar,
    ShowErrorNotifications,
    StudentAvatar,
    Typography,
} from '@components'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { IoMdEyeOff } from 'react-icons/io'
// import { TermsAndConditionModal } from './TermsAndConditionModal'
// import { DocumentRequiredModal } from './DocumentRequiredModal'
import { useNotification } from '@hooks'
//  Queries
import { IndustryApi } from '@queries'
import { getGender } from '@utils'

export const TalentPoolIndustryProfileDetails = ({ profile }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { notification } = useNotification()
    const [sentConnectionReq, sentConnectionReqResult] =
        IndustryApi.TalentPool.useSentRequestConnection()
    const getSectors = useMemo(() => {
        return profile?.student?.courses?.map((course: any) => course?.sector)
    }, [profile])

    const onCancelClicked = () => {
        setModal(null)
    }

    useEffect(() => {
        if (sentConnectionReqResult.isSuccess) {
            notification.success({
                title: 'Request Connection Sent',
                description: 'Request Connection Successfully Sent',
            })
            onCancelClicked()
        } else if (sentConnectionReqResult.isError) {
            notification.error({
                title: 'Connection Request Failed',
                description: 'Connection Request Failed. Please try again',
            })
        }
    }, [sentConnectionReqResult])
    

    return (
        <>
            {modal && modal}
            <ShowErrorNotifications result={sentConnectionReqResult} />
            <div className=" bg-[#24556D] rounded-l-lg px-8 py-5">
                <div className="flex items-center gap-x-5 mb-5">
                    <div className="">
                        <StudentAvatar
                            // imageUrl={``}
                            name={`${profile?.industry?.user?.name}`}
                            // gender={`${profile?.industry?.gender}`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2.5">
                        <Typography variant="title" color="text-white">
                            {profile?.industry?.user?.name}
                        </Typography>

                        <div className="flex items-center gap-x-1.5 whitespace-nowrap">
                            <Button
                                text="Request Accepted"
                                variant="info"
                                // onClick={onSentRequest}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-[#286788]  rounded-md p-2.5 mb-5">
                    <Typography variant="small" color="text-white">
                        Sector
                    </Typography>
                    <Typography variant="muted" color="text-white">
                        {getSectors && getSectors.length > 0 ? (
                            <Typography variant="muted" color="text-white">
                                {getSectors[0]?.name}
                            </Typography>
                        ) : (
                            <Typography variant="small" color="text-white">
                                No sectors found
                            </Typography>
                        )}
                    </Typography>
                </div>
                <Typography variant="subtitle" color="text-white">
                    Personal Information
                </Typography>
                <div className="flex flex-col gap-y-1.5 mt-3">
                    {/* Name */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Name
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.industry?.user?.name}
                        </Typography>
                    </div>
                    {/* Email */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Email
                        </Typography>
                       
                            <Typography variant="small" color="text-white">
                                {profile?.industry?.user?.email}
                            </Typography>
                           
                    </div>
                    {/* Phone Number */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Phone Number
                        </Typography>
                        <Typography variant="small" color="text-white">
                            {profile?.industry?.phoneNumber}
                        </Typography>
                    </div>

                    {/* Suburb */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Suburbs
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.industry?.suburb}
                        </Typography>
                    </div>
                </div>
                {/* Academic Information */}
                <div className="mt-5">
                    <Typography variant="subtitle" color="text-white">
                        Business Information
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5 mt-3">
                    {/* College/Institute */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Contact Person Name
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.industry?.contactPerson}
                        </Typography>
                    </div>
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Contact Person Number
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.industry?.contactPersonNumber}
                        </Typography>
                    </div>

                    {/* Expected Graduation Date */}
                    {/* <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Expected Graduation Date
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.industry?.expiryDate
                                .toString()
                                .slice(0, 10)}
                        </Typography>
                    </div> */}
                </div>
            </div>
        </>
    )
}
