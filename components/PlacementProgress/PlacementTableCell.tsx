export const PlacementTableCell = ({ request }: any) => {
    const classes =
        'border border-dashed px-2 py-1 text-xs font-medium rounded-sm bg-white'
    const getStatus = () => {
        if (request?.length) {
            const workplaceRequest = request[0]
            switch (workplaceRequest.currentStatus) {
                case 'applied':
                    return (
                        <div className={`${classes} border-orange-300`}>
                            <div className="text-orange-500">
                                Upload Documents
                            </div>
                        </div>
                    )

                case 'caseOfficerAssigned':
                    return (
                        <div className={`${classes} border-sky-300`}>
                            <span className="text-sky-500">
                                Case Officer Assigned
                            </span>
                        </div>
                    )

                case 'interview':
                    return (
                        <div className={`${classes} border-blue-300`}>
                            <span className="text-blue-500">
                                Interview With Case Officer
                            </span>
                        </div>
                    )

                case 'awaitingWorkplaceResponse':
                    return (
                        <div className={`${classes} border-yellow-300`}>
                            <span className="text-yellow-500">
                                Awaiting Response
                            </span>
                        </div>
                    )

                case 'appointmentBooked':
                    return (
                        <div className={`${classes} border-blue-300`}>
                            <span className="text-blue-500">
                                Appointment Booked
                            </span>
                        </div>
                    )
                case 'awaitingAgreementSigned':
                    return (
                        <div className={`${classes} border-orange-300`}>
                            <span className="text-orange-500">
                                Awaiting Agreement Sign
                            </span>
                        </div>
                    )
                case 'AgreementSigned':
                    return (
                        <div className={`${classes} border-green-300`}>
                            <span className="text-green-500">
                                Agreement Signed
                            </span>
                        </div>
                    )
                case 'placementStarted':
                    return (
                        <div
                            className={`${classes} bg-green-500 border-green-300`}
                        >
                            <span className="text-white">
                                Placement Started
                            </span>
                        </div>
                    )
            }

            return (
                <div className={`${classes} border-blue-300`}>
                    <span className="text-blue-500">Requested</span>
                </div>
            )
        }
        return (
            <div className={`${classes} border-gray-300`}>
                <span className="text-gray-400">Not Requested</span>
            </div>
        )
    }
    return <div>{getStatus()}</div>
}
