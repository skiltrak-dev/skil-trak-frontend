export type Paginate = {
    currentPage: number
    hasNext: boolean
    hasPrevious: boolean
    itemPerPage: number
    totalPage: number
    totalResult: number
}

export type PaginatedResponse<Type> = {
    data: Type[]
    pagination: Paginate
}

export type PaginationValues = {
    skip: number
    limit: number
}

export interface PaginationWithSearch extends PaginationValues {
    search: string
}
