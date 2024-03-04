import { Button, Checkbox, Typography } from '@components'
import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'

const termsAndCondition = [
    {
        title: '1. Access to Student Information',
        description: `Industry partners will only access student information within the parameters set by the student's privacy settings. Unauthorized use or disclosure of this information is strictly prohibited.`,
    },
    {
        title: '2. Purpose of Access',
        description: `By joining the Talent Pool, students grant permission for industry partners to access specific information in their profiles. The extent of information shared will be determined by the student's privacy settings.`,
    },
    {
        title: '3. Non-Discrimination',
        description: `Industry partners agree not to discriminate against any student based on race, gender, religion, or any other protected characteristic during the recruitment process.`,
    },
    {
        title: '4. Confidentiality',
        description: `Industry partners must maintain the confidentiality of student information and use it exclusively for talent acquisition purposes. Sharing this information with third parties is strictly prohibited.`,
    },
    {
        title: '5. Professional Conduct',
        description: `Industry partners must conduct themselves professionally in all interactions with students through the SkilTrak portal.`,
    },
    {
        title: '6. Compliance with Laws',
        description: `Both students and industries agree to comply with all applicable laws and regulations related to talent acquisition and recruitment.`,
    },
    {
        title: '7. Data Security',
        description: `SkilTrak ensures the security of data stored on the platform. Industry partners are expected to take necessary precautions to protect the information they access and use through the portal.`,
    },
]
export const TermsAndConditionModal = ({
    onCancelClicked,
 
    handleClick,
}: any) => {
    const [agree, setAgree] = useState(false)
    const onClickAgree = () => {
        setAgree(!agree)
    }

    return (
        <>
            <div className="px-12 pt-7 pb-12">
                <div onClick={onCancelClicked} className="flex justify-end">
                    <MdOutlineClose className="cursor-pointer" size={30} />
                </div>
                <div className="text-center mb-8">
                    <Typography variant="subtitle">
                        Terms & Condition
                    </Typography>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-7">
                    {termsAndCondition.map((item) => (
                        <div className="">
                            <p className="text-sm font-medium text-black">
                                {item?.title}
                            </p>
                            <p className="text-xs leading-[14px] mt-1 text-black">
                                {item?.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-x-4 my-6">
                    <Checkbox name="agree" onChange={onClickAgree} />
                    <Typography variant="label">
                        I agree to be part of the talent pool and consent to
                        being contacted for relevant opportunities.Failure to
                        adhere to these terms and conditions may result in the
                        termination of access to the SkilTrak Talent Pool Portal
                        for both students and industry partners. SkilTrak
                        reserves the right to update these terms and conditions
                        as needed, and users will be notified of any changes.
                    </Typography>
                </div>
                <Button
                    text="submit"
                    onClick={handleClick}
                    disabled={!agree}
                />
            </div>
        </>
    )
}
