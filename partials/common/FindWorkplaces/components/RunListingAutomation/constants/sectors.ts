export const WORKPLACE_TYPES = [
    'Public',
    'Private',
    'SME',
    'Enterprise',
    'Government',
    'Not-for-profit',
] as const

export const RADIUS_BUCKETS = [
    '≤ 2 km',
    '≤ 5 km',
    '≤ 10 km',
    '≤ 15 km',
    '≤ 25 km',
    '≤ 50 km',
] as const

export type WorkplaceType = (typeof WORKPLACE_TYPES)[number]
export type RadiusBucket = (typeof RADIUS_BUCKETS)[number]
