import { Badge } from '@components'
import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { BranchLocationsDialog } from '../modals'

export function BranchLocationsButton() {
    const [showBranchLocationsDialog, setShowBranchLocationsDialog] =
        useState(false)

    return (
        <>
            <Badge
                onClick={() => setShowBranchLocationsDialog(true)}
                Icon={MapPin}
                variant={"primaryNew"}
                title="Branch Locations"
            >
                Branch Locations
            </Badge>

            <BranchLocationsDialog
                open={showBranchLocationsDialog}
                onOpenChange={setShowBranchLocationsDialog}
            />
        </>
    )
}
