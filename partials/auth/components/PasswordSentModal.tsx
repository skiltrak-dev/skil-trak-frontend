import React from 'react'
import { Animations } from '@animations'
import { Button, LottieAnimation, Typography } from '@components'
import Image from 'next/image'

export const PasswordSentModal = ({ email, onBackToLogin }: any) => {
    return (
        <>
            {' '}
            <div className="flex flex-col items-center justify-center px-36 py-12 w-[958px]">
                <Image
                    src={'/images/auth/check-mark-icon.svg'}
                    alt="Checked"
                    height={50}
                    width={50}
                />
                <div className="mt-6">
                    <Typography variant="h3" color={'text-primaryNew'} center>
                        Password Reset Link Sent
                    </Typography>
                </div>

                <div className="mt-2.5">
                    <Typography center color="text-primaryNew">
                        We have sent your login credentials to the provided
                        email address: <b>{email}</b>. Please check your email
                        for further instructions. If you have any further
                        queries, please do not hesitate to reach out to us at{' '}
                        <strong>
                            <a href="mailto:tech@skiltrak.com.au">
                                tech@skiltrak.com.au
                            </a>
                        </strong>
                        .
                    </Typography>
                </div>

                <div className="mt-8">
                    <Button onClick={onBackToLogin}>Back To Login</Button>
                </div>
            </div>
        </>
    )
}
