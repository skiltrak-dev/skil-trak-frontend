import { Button, Select, ShowErrorNotifications, Typography } from '@components'
import { useNotification } from '@hooks'
import React, { useEffect, useState } from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'
import { AdminApi } from '@queries'

export const MarkAsHodModalVII = ({ data, onCancel }: any) => {
    const [selectedHod, setSelectedHod] = useState(null)
    const hodOptions = data?.map((hod: any) => ({
        value: hod?.id,
        label: hod?.subadmin?.user?.name,
    }))

    const { notification } = useNotification()
    const [toggleHod, toggleHodResult] = AdminApi.Department.useChangeHod()

    const onConfirmClicked = async () => {
        await toggleHod(selectedHod)
    }
    useEffect(() => {
        if (toggleHodResult.isSuccess) {
            notification.success({
                title: `Request Mark As HOD`,
                description: `Coordinator is successfully Mark As HOD`,
            })
            onCancel()
        }
        if (toggleHodResult.isError) {
            notification.error({
                title: 'Request Mark As HOD',
                description: `Your request for marking coordinator as hod was failed`,
            })
        }
    }, [toggleHodResult])

    return (
        <>
            <ShowErrorNotifications result={toggleHodResult} />
            <div className="px-5 py-3">
                <div
                    onClick={onCancel}
                    className="cursor-pointer flex justify-end"
                >
                    <IoCloseCircleSharp
                        size={25}
                        className="text-red-400 hover:text-red-500"
                    />
                </div>
                <Typography
                    variant="title"
                    color="text-primaryNew"
                    semibold
                    center
                >
                    Mark As HOD
                </Typography>
                <Select
                    name="hod"
                    options={hodOptions}
                    label="HOD"
                    onlyValue
                    onChange={(e: any) => {
                        setSelectedHod(e)
                    }}
                />
                <div className="flex justify-center items-center">
                    <Button
                        variant="primaryNew"
                        text="Submit"
                        onClick={onConfirmClicked}
                        loading={toggleHodResult?.isLoading}
                        disabled={toggleHodResult?.isLoading}
                    />
                </div>
            </div>
        </>
    )
}
