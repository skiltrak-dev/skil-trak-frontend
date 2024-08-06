import { Badge } from '@components'
import { IndustryStatus } from '@types'

export const IndustryListingStatus = ({
    status,
}: {
    status: IndustryStatus
}) => {
    switch (status) {
        case IndustryStatus.FAVOURITE:
            return <Badge variant="success" text="Favorite" />
        case IndustryStatus.DO_NOT_DISTURB:
            return <Badge variant="error" text="Do Not Disturb" />
        case IndustryStatus.BLOCKED:
            return <Badge variant="error" text="Blocked" />

        default:
            return <p>---</p>
    }
}
