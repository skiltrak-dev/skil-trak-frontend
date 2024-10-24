import { RtoContactPersonLayout } from '@layouts'
import { RtoContactPerson } from '@partials/rtoContactPerson/RtoContactPerson'
import React, { ReactElement } from 'react'

const RTOContactPerson = () => {
    return (
        <div className="p-5">
            <RtoContactPerson />
        </div>
    )
}

RTOContactPerson.getLayout = (page: ReactElement) => {
    return <RtoContactPersonLayout>{page}</RtoContactPersonLayout>
}
export default RTOContactPerson
