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
import { TermsAndConditionModal } from './TermsAndConditionModal'
import { DocumentRequiredModal } from './DocumentRequiredModal'
import { useNotification } from '@hooks'
//  Queries
import { IndustryApi } from '@queries'
import { getGender, isBrowser } from '@utils'
import { TalentPoolNotification } from '@partials/common/TalentPool'

type TalentPoolStudentProfileDetailProps = {
    profile: any
    setView: any
}
export const TalentPoolStudentProfileDetail = ({
    profile,
    setView,
}: TalentPoolStudentProfileDetailProps) => {
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

    const onSubmit = (data: any) => {
        const values = data?.requiredDocs?.map((n: any) => n?.label)

        sentConnectionReq({
            talentPoolProfile: profile?.id,
            talentPoolRequiredDocuments: values.map((name: string) => ({
                name,
            })),
        })
        if (sentConnectionReqResult.isSuccess) {
            onCancelClicked()
        }
    }
    const handleClick = () => {
        setModal(
            <GlobalModal>
                <DocumentRequiredModal
                    onCancelClicked={onCancelClicked}
                    onSubmit={onSubmit}
                    sentConnectionReqResult={sentConnectionReqResult}
                />
            </GlobalModal>
        )
    }
    const onSentRequest = () => {
        setModal(
            <GlobalModal>
                <TermsAndConditionModal
                    onCancelClicked={onCancelClicked}
                    handleClick={handleClick}
                />
            </GlobalModal>
        )
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

    const connectionStatus =
        profile?.connectionRequests &&
        profile.connectionRequests?.length > 0 &&
        profile?.connectionRequests?.[0]?.status
    return (
        <>
            {modal && modal}
            <ShowErrorNotifications result={sentConnectionReqResult} />
            <div className=" bg-[#24556D] rounded-l-lg px-8 py-5">
                <div className="flex items-center gap-x-5 mb-5">
                    <div className="">
                        <StudentAvatar
                            imageUrl={``}
                            name={`${profile?.student?.user?.name}`}
                            gender={`${profile?.student?.gender}`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2.5">
                        <Typography variant="title" color="text-white">
                            {profile?.student?.user?.name}
                        </Typography>
                        {connectionStatus === 'requested' ? (
                            <div className="flex items-center gap-x-1.5">
                                <Button text="Request Pending" />
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-1.5">
                                <Button
                                    text="Send Request"
                                    onClick={onSentRequest}
                                />
                            </div>
                        )}
                        {/* <div className="flex items-center gap-x-1.5">
                            <Button
                                text="Send Request"
                                onClick={onSentRequest}
                            />
                        </div> */}
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
                            {profile?.student?.user?.name}
                        </Typography>
                    </div>
                    {/* Email */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Email
                        </Typography>
                        {connectionStatus === 'connected' ? (
                            <Typography variant="small">
                                {profile?.student?.user?.email}
                            </Typography>
                        ) : (
                            <div className="relative">
                                nothing to show here
                                <div
                                    className={`absolute top-0 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
                                ></div>
                                <div
                                    onClick={() => setView(true)}
                                    className={`cursor-pointer absolute top-0 left-1/2 z-20 bg-[#24556D] px-1 rounded-md flex items-center justify-center`}
                                    style={{ height: '100%' }}
                                >
                                    <IoMdEyeOff
                                        size={15}
                                        className="text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Phone Number */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Phone Number
                        </Typography>
                        {connectionStatus === 'connected' ? (
                            <Typography variant="small">
                                {profile?.student?.phone}
                            </Typography>
                        ) : (
                            <div className="relative">
                                nothing to show here
                                <div
                                    className={`absolute top-0.5 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
                                ></div>
                                <div
                                    onClick={() => setView(true)}
                                    className={`cursor-pointer absolute top-0.5 left-1/2 z-20 bg-[#24556D] px-1 rounded-md flex items-center justify-center`}
                                    style={{ height: '100%' }}
                                >
                                    <IoMdEyeOff
                                        size={15}
                                        className="text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Age and Gender */}
                    <div className="flex flex-col md:flex-row md:gap-x-1">
                        {/* Age */}
                        <div className="bg-[#286788]  rounded-md py-1.5 px-2.5 w-full">
                            <Typography variant="xs" color="text-white">
                                Age Range
                            </Typography>
                            <Typography variant="muted" color="text-white">
                                {profile?.student?.age}
                            </Typography>
                        </div>
                        {/* Gender */}
                        <div className="bg-[#286788]  rounded-md py-1.5 px-2.5 w-full">
                            <Typography variant="xs" color="text-white">
                                Gender
                            </Typography>
                            <Typography variant="muted" color="text-white">
                                {getGender(profile?.student?.gender)}
                            </Typography>
                        </div>
                    </div>
                    {/* Suburb */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Suburbs
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.student?.suburb}
                        </Typography>
                    </div>
                    {/* Student Type */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Student Type
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {!profile?.student?.isInternational
                                ? 'Domestic'
                                : 'International'}
                        </Typography>
                    </div>
                </div>
                {/* Academic Information */}
                <div className="mt-5">
                    <Typography variant="subtitle" color="text-white">
                        Academic Information
                    </Typography>
                </div>
                <div className="flex flex-col gap-y-1.5 mt-3">
                    {/* College/Institute */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Institution/College Name
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.student?.rto?.user?.name}
                        </Typography>
                    </div>
                    {/* Field of study */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Field of Study
                        </Typography>
                        {getSectors && getSectors.length > 0 ? (
                            <Typography variant="muted" color="text-white">
                                {getSectors[0]?.name}
                            </Typography>
                        ) : (
                            <Typography variant="muted">
                                No sectors found
                            </Typography>
                        )}
                    </div>
                    {/* Expected Graduation Date */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Expected Graduation Date
                        </Typography>
                        <Typography variant="muted" color="text-white">
                            {profile?.student?.expiryDate
                                .toString()
                                .slice(0, 10)}
                        </Typography>
                    </div>
                </div>
            </div>
        </>
    )
}
