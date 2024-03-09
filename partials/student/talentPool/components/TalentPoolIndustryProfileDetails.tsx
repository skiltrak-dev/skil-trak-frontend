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
import { TalentPoolStatusEnum, getGender } from '@utils'
import { TalentPoolNotification } from '@partials/common/TalentPool'

export const TalentPoolIndustryProfileDetails = ({ profile, setView }: any) => {
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

                        {profile?.status === TalentPoolStatusEnum.REQUESTED ? (
                            <div className="flex items-center gap-x-1.5 whitespace-nowrap">
                                <Button
                                    text="Pending"
                                    // variant="info"
                                    // onClick={onSentRequest}
                                />
                            </div>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.CONNECTED ? (
                            <div className="flex items-center gap-x-1.5 whitespace-nowrap">
                                <Button
                                    text="Connected"
                                    variant="info"
                                    // onClick={onSentRequest}
                                />
                            </div>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <div className="flex items-center gap-x-1.5 whitespace-nowrap">
                                <Button
                                    text="Rejected"
                                    variant="error"
                                    // onClick={onSentRequest}
                                />
                            </div>
                        ) : profile?.status === TalentPoolStatusEnum.HIRED ? (
                            <div className="flex items-center gap-x-1.5 whitespace-nowrap">
                                <Button
                                    text="Hired"
                                    variant="success"
                                    // onClick={onSentRequest}
                                />
                            </div>
                        ) : null}
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

                        {profile?.status === TalentPoolStatusEnum.REQUESTED ? (
                            <div className="relative text-white">
                                nothing to show here
                                <div
                                    className={`absolute top-1 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
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
                        ) : profile?.status ===
                          TalentPoolStatusEnum.CONNECTED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.user?.email}
                            </Typography>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <div className="relative text-white">
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
                        ) : profile?.status === TalentPoolStatusEnum.HIRED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.user?.email}
                            </Typography>
                        ) : null}
                    </div>
                    {/* Phone Number */}
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Phone Number
                        </Typography>
                        {profile?.status === TalentPoolStatusEnum.REQUESTED ? (
                            <div className="relative text-white">
                                nothing to show here
                                <div
                                    className={`absolute top-1 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
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
                        ) : profile?.status ===
                          TalentPoolStatusEnum.CONNECTED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.phoneNumber}
                            </Typography>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <div className="relative text-white">
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
                        ) : profile?.status === TalentPoolStatusEnum.HIRED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.phoneNumber}
                            </Typography>
                        ) : null}
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
                        {profile?.status === TalentPoolStatusEnum.REQUESTED ? (
                            <div className="relative text-white">
                                nothing to show here
                                <div
                                    className={`absolute top-1 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
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
                        ) : profile?.status ===
                          TalentPoolStatusEnum.CONNECTED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.contactPerson}
                            </Typography>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <div className="relative text-white">
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
                        ) : profile?.status === TalentPoolStatusEnum.HIRED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.contactPerson}
                            </Typography>
                        ) : null}
                    </div>
                    <div className="bg-[#286788]  rounded-md py-1.5 px-2.5">
                        <Typography variant="xs" color="text-white">
                            Contact Person Number
                        </Typography>
                        {profile?.status === TalentPoolStatusEnum.REQUESTED ? (
                            <div className="relative text-white">
                                nothing to show here
                                <div
                                    className={`absolute top-1 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
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
                        ) : profile?.status ===
                          TalentPoolStatusEnum.CONNECTED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.contactPersonNumber}
                            </Typography>
                        ) : profile?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <div className="relative text-white">
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
                        ) : profile?.status === TalentPoolStatusEnum.HIRED ? (
                            <Typography variant="muted" color="text-white">
                                {profile?.industry?.contactPersonNumber}
                            </Typography>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    )
}
