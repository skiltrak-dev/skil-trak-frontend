import { Button, Checkbox, GlobalModal, Typography } from '@components'
import React, { useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia'

export const ApiAccessModal = ({ onCancel }: { onCancel: () => void }) => {
    const [selectedUser, setSelectedUser] = useState<string>('')
    const apiUsers = ['Yaseen Khan', 'Asif Khan', 'Tech Team']

    return (
        <GlobalModal>
            <div className="rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 py-3 px-4 border-b border-[#E6E6E6]">
                    <div className="col-start-2">
                        <Typography center semibold>
                            API Access
                        </Typography>
                    </div>
                    <LiaTimesSolid
                        size={20}
                        onClick={onCancel}
                        className="ml-auto transition-all duration-500 text-gray-700 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                {/*  */}
                <div className="px-4 py-2.5">
                    <div className="flex flex-col gap-y-2.5">
                        {apiUsers?.map((user) => (
                            <div
                                onClick={() => {
                                    setSelectedUser(
                                        selectedUser === user ? '' : user
                                    )
                                }}
                                className="py-2.5 px-5 bg-[#6B72800D] rounded-lg flex justify-between items-center"
                            >
                                <Typography variant="small" medium>
                                    {user}
                                </Typography>
                                <Checkbox
                                    name={user}
                                    defaultChecked={selectedUser === user}
                                    showError={false}
                                />
                            </div>
                        ))}
                        <div className="flex justify-center mt-0.5 mb-1">
                            <Button text="Send OTP" />
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
