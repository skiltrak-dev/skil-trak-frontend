import { Typography } from '@components'
import React from 'react'

export const MailTitle = ({ mailFrom }: { mailFrom: string }) => {
    return (
        <div
            className={`flex flex-col lg:flex-row lg:items-center gap-2 py-1.5 px-3 bg-white border-b border-secondary-dark hover:bg-[#C2DBFF] cursor-pointer`}
        >
            <div className="flex items-center gap-x-0.5 w-full lg:w-56">
                <Typography variant="small" bold>
                    Subject
                </Typography>
            </div>
            <div className="w-full flex items-center gap-x-1 relative">
                <div className={'w-full flex justify-between items-center'}>
                    <div className={'flex items-center gap-x-1'}>
                        {' '}
                        <Typography variant="small" bold>
                            {mailFrom}
                        </Typography>
                    </div>
                    <div>
                        {' '}
                        <Typography variant="small" bold>
                            Date
                        </Typography>
                    </div>
                </div>

                {/*  */}
            </div>
        </div>
    )
}
