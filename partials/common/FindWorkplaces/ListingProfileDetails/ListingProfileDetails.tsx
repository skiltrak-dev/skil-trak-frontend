import { Card } from '@components'
import React from 'react'
import { IndustryListingNotes } from './CBListingProfile'

export const ListingProfileDetails = () => {
    return (
        <div>
            <div className="flex gap-x-5 w-full">
                <div className="w-2/3">
                    <Card>All Communications</Card>
                </div>
                <div className="w-1/3">
                    <IndustryListingNotes />
                </div>
            </div>
        </div>
    )
}
