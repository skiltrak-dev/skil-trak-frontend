import { memo } from 'react'
import { Badge } from '@components'
import { WorkplaceType } from '@types'

export const WorkplaceTypeBadge = memo<{
    type: WorkplaceType
    isSelected: boolean
    onToggle: (type: number) => void
}>(({ type, isSelected, onToggle }) => (
    <Badge
        text={type?.name}
        variant={isSelected ? 'primaryNew' : 'secondary'}
        size="sm"
        shape="pill"
        outline={!isSelected}
        onClick={() => onToggle(type?.id)}
    />
))
