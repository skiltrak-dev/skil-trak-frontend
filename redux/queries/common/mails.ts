import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { Note } from '@types'
import { io } from 'socket.io-client'

enum ChatEvent {
    SendMessage = 'send_message',
    RequestAllMessages = 'mailNotification',
    SendAllMessages = 'mailNotification',
    ReceiveMessage = 'mailNotification',
}

let socket: any
function getSocket() {
    if (!socket) {
        socket = io('ws://192.168.1.13:8000', {
            withCredentials: true,
        })
    }
    console.log('adding')
    return socket
}

const PREFIX = 'messaging'
export const mailsEndpoints = (
    builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
    getMessages: builder.query<any, number>({
        query: (id) => `${PREFIX}/mail/list/${id}`,
        async onCacheEntryAdded(
            photoId,
            { cacheDataLoaded, cacheEntryRemoved, updateCachedData }
        ) {
            try {
                await cacheDataLoaded

                const socket = io('ws://192.168.1.13:8000', {
                    withCredentials: true,
                })

                socket.on('join', () => {
                    socket.emit(ChatEvent.RequestAllMessages)
                })

                socket.on(ChatEvent.SendAllMessages, (messages: any) => {
                    updateCachedData((draft) => {
                        draft.splice(0, draft.length, ...messages)
                    })
                })

                socket.on(ChatEvent.ReceiveMessage, (message: any) => {
                    updateCachedData((draft) => {
                        draft.push(message)
                    })
                })

                await cacheEntryRemoved

                socket.off('join')
                socket.off(ChatEvent.SendAllMessages)
                socket.off(ChatEvent.ReceiveMessage)
            } catch {
                // if cacheEntryRemoved resolved before cacheDataLoaded,
                // cacheDataLoaded throws
                console.log('failed')
            }
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

    // sendMessage: builder.mutation<any, any>({
    //     queryFn: (chatMessageContent: string) => {
    //         const socket = getSocket()
    //         return new Promise((resolve) => {
    //             socket.emit(
    //                 ChatEvent.SendMessage,
    //                 `${PREFIX}/email`,
    //                 (message: any) => {
    //                     resolve({ data: message })
    //                 }
    //             )
    //         })
    //     },
    // }),
})
