export const getQueryParams = (industryId: string, status: string) => ({
    id: Number(industryId),
    params: {
        search: `status:${status}`,
        skip: 0,
        limit: 50,
    },
})
