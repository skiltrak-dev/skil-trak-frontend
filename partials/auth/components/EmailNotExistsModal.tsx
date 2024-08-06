import React from 'react'
import { Button, Typography } from '@components'
import Image from 'next/image'

export const EmailNotExistsModal = ({ onCloseModal }: any) => {
    return (
        <>
            {' '}
            <div className="flex flex-col items-center justify-center px-36 py-12 w-[958px]">
                <Image
                    src={'/images/auth/block-icon.svg'}
                    alt="Block"
                    height={50}
                    width={50}
                />

                <div className="mt-6">
                    <Typography variant="h3" center color={'text-primaryNew'}>
                        User Not Found
                    </Typography>
                </div>

                <div className="mt-2.5">
                    <Typography
                        variant={'body'}
                        color={'text-primaryNew'}
                        italic
                        center
                    >
                        The email address you entered does not match any student
                        in our system. Please check your email address and try
                        again. If you need further assistance, please contact
                        our support team at{' '}
                        <strong>
                            <a href="mailto:tech@skiltrak.com.au">
                                tech@skiltrak.com.au
                            </a>
                        </strong>
                    </Typography>
                </div>

                <div className="mt-10">
                    <Button variant="error" onClick={onCloseModal}>
                        Close
                    </Button>
                </div>
            </div>
        </>
    )
}
