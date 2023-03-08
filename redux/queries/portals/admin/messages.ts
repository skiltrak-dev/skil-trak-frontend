import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

const PREFIX = 'admin'
export const messagesEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getAdminMessages: builder.query<any, any>({
        // query: (id) => `${PREFIX}/mail/list/${id}`,
        query: (params: any) => {
            return {
                url: `${PREFIX}/mail/list/${params.id}`,
                params,
            }
        },
        async onCacheEntryAdded(
            arg,
            { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
            // create a websocket connection when the cache subscription starts
            const ws = new WebSocket('ws://192.168.1.13:8000')
            try {
                // wait for the initial query to resolve before proceeding
                await cacheDataLoaded

                // when data is received from the socket connection to the server,
                // if it is a message and for the appropriate channel,
                // update our query result with the received message
                const listener = (event: MessageEvent) => {
                    const data = JSON.parse(event.data)
                    if (data.channel !== arg) return

                    updateCachedData((draft) => {
                        draft.push(data)
                    })
                }
                console.log('testing deep')
                ws.addEventListener('message', listener)
            } catch {
                // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
                // in which case `cacheDataLoaded` will throw
            }
            // cacheEntryRemoved will resolve when the cache subscription is no longer active
            await cacheEntryRemoved
            // perform cleanup steps once the `cacheEntryRemoved` promise resolves
            ws.close()
        },
        providesTags: ['Message'],
    }),
    sendAdminMessage: builder.mutation({
        query: (body) => ({
            url: `messaging/email`,
            method: 'POST',
            body: body,
        }),
        invalidatesTags: ['Message'],
    }),
})
