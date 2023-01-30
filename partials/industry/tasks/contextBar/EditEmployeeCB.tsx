import { ShowErrorNotifications } from '@components'
import { useContextBar, useNotification } from '@hooks'
import { useUpdateEmployeeMutation } from '@queries'
import React, { useEffect } from 'react'

// form
import { EditEmployeeDetailForm } from '../form'

export const EditEmployeeCB = ({ values }: { values: any }) => {
    const { setTitle, setContent, hide } = useContextBar()
    const { notification } = useNotification()

    const [updateEmployee, updateEmployeeResult] = useUpdateEmployeeMutation()

    useEffect(() => {
        setTitle('Edit Employee Detail')
    }, [])

    useEffect(() => {
        if (updateEmployeeResult.isSuccess) {
            notification.info({
                title: 'You have updated an Employee',
                description: 'Some description for notification',
            })
            setContent(null)
            hide()
        }
    }, [updateEmployeeResult.isSuccess])

    const onSubmit = (employeeValues: any) => {
        updateEmployee({ id: values?.id, body: employeeValues })
    }

    return (
        <div>
            <ShowErrorNotifications result={updateEmployeeResult} />
            <EditEmployeeDetailForm
                values={values}
                onSubmit={onSubmit}
                result={updateEmployeeResult}
            />
        </div>
    )
}
