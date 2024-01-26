import { UserRoles } from '@constants'

enum Listing {
    All = 'all',
    RELEASED = 'released',
}

export const ListingEnum = { ...UserRoles, ...Listing }
