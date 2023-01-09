import { useState, useEffect } from 'react'

// components
import { Select, Typography } from '@components'

// queries
import { AdminApi } from '@queries'

// utils
import { ellipsisText } from '@utils'

export const AssignWorkplace = ({ workplace }: { workplace: any }) => {
    const [subAdminOptions, setSubAdminOptions] = useState([])

    const { isLoading, data } = AdminApi.Workplace.useListQuery({
        createdBy: 'admin',
    })
    const [assignSubAdmin] = AdminApi.Workplace.useWorkplaceMutation()

    useEffect(() => {
        if (data?.data.length) {
            const options = data?.data?.map((subAdmin: any) => ({
                label: subAdmin?.user?.name,
                value: subAdmin?.id,
            }))
            setSubAdminOptions(options)
        }
    }, [data?.data])

    const onAssignSubAdmin = (e: any) => {
        assignSubAdmin({ subadmin: e?.value, workplace: workplace?.id })
    }
    return (
        <div>
            {workplace?.assignedTo ? (
                <>
                    <Typography variant={'small'} color={'text-gray-500'}>
                        <span className="font-semibold">Assigned To:</span>
                    </Typography>
                    <Typography variant={'small'} capitalize>
                        <span
                            className="font-semibold"
                            title={workplace?.assignedTo?.user?.name}
                        >
                            {ellipsisText(
                                workplace?.assignedTo?.user?.name,
                                15
                            )}
                        </span>
                    </Typography>{' '}
                </>
            ) : (
                <Select
                    label={'Sub Admin'}
                    name={'subAdmin'}
                    placeholder={'Select Sub Admin'}
                    options={subAdminOptions}
                    loading={data?.isLoading}
                    onChange={(e: any) => {
                        onAssignSubAdmin(e)
                    }}
                />
            )}
        </div>
    )
}
