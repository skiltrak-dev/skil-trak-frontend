import React, { ReactElement } from 'react'
import { Appointments } from '@partials/rto-v2/appointments'
import { RtoLayoutV2 } from '@layouts'
import { BiEnvelope } from 'react-icons/bi'

const AppointmentPage = () => {
    return <Appointments />
}

AppointmentPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: BiEnvelope,
                title: 'Appointmens Detail',
                description: 'Manage all your Appointmens',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default AppointmentPage
