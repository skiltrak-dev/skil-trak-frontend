import { Button, Card, Typography } from '@components'
import React, { useCallback, useState } from 'react'
import {
    ComposeListingIndustryMail,
    IndustryListingNotes,
} from './CBListingProfile'
import { ListingIndustryAllCommunications } from './components'

export const ListingProfileDetails = ({ industry }: any) => {
    const [isComposeMail, setIsComposeMail] = useState<boolean>(false)

    const onCancelComposeMail = useCallback(() => {
        setIsComposeMail(false)
    }, [])
    // const mailListing = CommonApi.FindWorkplace.useListingIndustryMails(id, {
    //     skip: !id,
    // })

    return (
        <div>
            <div className="flex gap-x-5 w-full">
                <Card noPadding>
                    <div className="flex items-center justify-between border-b py-2">
                        <div className="px-5">
                            <Typography variant="label">
                                All Communications
                            </Typography>
                        </div>
                        <div className="px-5">
                            <Button
                                onClick={() => {
                                    setIsComposeMail(!isComposeMail)
                                    // contextBar.setTitle('Compose Mail')
                                    // contextBar.setContent(<SendMail />)
                                    // contextBar.show()
                                }}
                                text="Compose"
                            />
                        </div>
                    </div>
                    <div className="overflow-auto h-96 custom-scrollbar">
                        <ListingIndustryAllCommunications />
                    </div>
                </Card>

                <div
                    className={`fixed bottom-0 right-0 z-[333]  ${
                        isComposeMail ? 'block' : 'hidden'
                    }`}
                >
                    <ComposeListingIndustryMail
                        industry={industry}
                        onCancelComposeMail={onCancelComposeMail}
                    />
                </div>
                <div className="w-2/5">
                    <IndustryListingNotes />
                </div>
            </div>
        </div>
    )
}
