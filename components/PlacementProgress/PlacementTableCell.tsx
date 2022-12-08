export const PlacementTableCell = ({ request }: any) => {
    console.log('::: REQ', request)
    const classes =
        'border border-dashed px-2 py-1 text-xs font-medium rounded-sm bg-white'
    const getStatus = () => {
        if (request.length) {
            return (
                <div className={`${classes} border-blue-300`}>
                    <span className="text-blue-500">Requested</span>
                </div>
            )
        }
        return (
            <div className={`${classes} border-orange-300`}>
                <span className="text-orange-500">Not Requested</span>
            </div>
        )
    }
    return <div>{getStatus()}</div>
}
