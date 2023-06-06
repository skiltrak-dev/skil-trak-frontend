import { Typography } from '@components'
import React from 'react'
import { TicketUser } from './TicketUser'

export const TicketMessageCard = ({ i }: { i: number }) => {
    return (
        <div
            className={`${
                i % 2 == 1 ? 'bg-gray-100' : ''
            } border border-gray-300 rounded-md px-4 py-5`}
        >
            <div className="flex justify-between items-center">
                <TicketUser
                    ticket={{
                        phone: 1234567,
                        user: { name: 'Saad', email: 'saad.h' },
                    }}
                />
                <Typography variant={'label'} color={'text-gray-500'}>
                    Monday 05 June, 2023 - 11:30 am
                </Typography>
            </div>
            <div className="text-sm text-gray-500 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                tincidunt nisl at fermentum tempor. Cras fringilla a eros ac
                sagittis. Nullam venenatis vel mi quis convallis. Donec mollis
                vitae nunc sed maximus. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Morbi eu
                fringilla nisi. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Curabitur a lacus
                pretium, lobortis lorem sed, tristique justo. Phasellus maximus
                rhoncus sapien vel ornare. Vivamus facilisis ligula at molestie
                auctor. Vestibulum odio lacus, luctus a mollis non, egestas ac
                libero.
            </div>
        </div>
    )
}
