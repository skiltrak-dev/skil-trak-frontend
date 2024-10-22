import React, { useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'
import { Button, Checkbox, GlobalModal, Typography } from '@components'

export const OTPVerificationModal = ({
    onCancel,
}: {
    onCancel: () => void
}) => {
    const [selectedUser, setSelectedUser] = useState<string>('')
    const apiUsers = ['Yaseen Khan', 'Asif Khan', 'Tech Team']

    return (
        <GlobalModal>
            <div className="rounded-lg overflow-hidden">
                <div className="flex justify-center py-3 px-4 border-b border-[#E6E6E6]">
                    <Typography center semibold>
                        OTP Verification
                    </Typography>
                </div>

                {/*  */}
                <div className="px-4 py-2.5">
                    <div>
                        <Typography color="text-[#606268]">
                            Enter the code from Phone we sent to{' '}
                            <span className="font-medium">+691291221 </span>
                            Access APIs
                        </Typography>
                    </div>

                    {/*  */}
                    <div>
                        <Typography color="text-[#F58229]">02:32</Typography>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
