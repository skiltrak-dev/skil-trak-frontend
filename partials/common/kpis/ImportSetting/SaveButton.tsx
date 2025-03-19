import { Button } from '@components'

export const SaveButton = ({
    hasChanges,
    onSave,
    result,
}: {
    result: any
    hasChanges: boolean
    onSave: () => void
}) => (
    <Button
        onClick={onSave}
        disabled={!hasChanges || result?.isLoading}
        loading={result?.isLoading}
    >
        Save
    </Button>
)
