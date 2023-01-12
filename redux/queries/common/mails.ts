import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'

const PREFIX = 'messaging'
export const mailsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getMessages: builder.query<any, number>({
        query: (id) => `${PREFIX}/mail/list/${id}`,
        async onCacheEntryAdded(id, { cacheDataLoaded, cacheEntryRemoved }) {
            console.log(
                `The application requests the photo with the id ${id} for the first time in a while`
            )
            try {
                const photoResponse = await cacheDataLoaded
                console.log(
                    `The /photos/${id} endpoint answered`,
                    photoResponse
                )
            } catch {
                // if cacheEntryRemoved resolves before cacheDataLoaded,
                // cacheDataLoaded throws an error
            }
            await cacheEntryRemoved
            console.log(
                `No component subscribed to the data from /photos/${id} for the last 60 seconds`
            )
        },
        providesTags: ['Mails'],
    }),
    sendMessage: builder.mutation({
        query: (body) => ({
            url: `${PREFIX}/email`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Mails'],
    }),
})
