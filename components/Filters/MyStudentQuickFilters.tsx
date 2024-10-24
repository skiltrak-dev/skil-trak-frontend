import { Checkbox } from '@components/inputs'

export const MyStudentQuickFilters = ({
    setSnoozed,
    setFlagged,
    setNonContactable,
    snoozed,
    flagged,
    nonContactable,
}: any) => {
    return (
        <div className="flex items-center gap-4">
            <Checkbox
                label="Flagged"
                name="flagged"
                value={flagged}
                onChange={(e: any) => setFlagged(e.target.checked)}
                showError={false}
            />
            <Checkbox
                label="Snoozed"
                name="snoozed"
                value={snoozed}
                onChange={(e: any) => setSnoozed(e.target.checked)}
                showError={false}
            />
            <Checkbox
                label="Non Contactable"
                name="nonContactable"
                value={nonContactable}
                onChange={(e: any) => setNonContactable(e.target.checked)}
                showError={false}
            />
        </div>
    )
}
