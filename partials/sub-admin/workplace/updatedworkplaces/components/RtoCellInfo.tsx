import { Rto } from '@types'
import { maskText } from '@utils'
import { Typography } from '@components'

export const RtoCellInfo = ({ rto }: { rto: Rto }) => {
    return (
        <div>
            <Typography variant="small" semibold>
                {rto?.user?.name ?? 'N/A'}
            </Typography>
            <Typography variant="small" color="text-gray-500">
                {maskText(rto?.user?.email)}
            </Typography>
        </div>
    )
}
