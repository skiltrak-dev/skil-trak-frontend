import { Button, Card, Typography } from '@components'
import React, { useState } from 'react'
import { WorkplaceProgress } from '../../components'
import { UpdatedFindWPByForm } from './UpdatedFindWPByForm'

export const UpdatedPersonalInfo = ({
    onSubmit,
    result,
}: {
    result: any
    onSubmit: any
}) => {
    const [submitValue, setSubmitValue] = useState<{
        type: 'name' | 'abn'
        value: string
    }>({ type: 'name', value: '' })
    return (
        <div className="flex flex-col gap-y-7">
            <Card noPadding>
                <div className="w-full ">
                    <div className="w-full py-7 border-b border-[#D9DBE9]">
                        <WorkplaceProgress
                            progressNumber={3}
                            activeNumber={1}
                        />
                    </div>

                    {/*  */}
                    <div className="w-full px-10 pt-5 pb-9">
                        <Typography
                            color="text-[#6F6C90]"
                            variant="h4"
                            bold
                            center
                        >
                            You can find industry by Name or by ABN
                        </Typography>

                        {/*  */}
                        <div className="flex gap-x-10 mt-9">
                            <UpdatedFindWPByForm
                                type="name"
                                submitValue={submitValue}
                                onSubmit={onSubmit}
                                onSubmitValue={({ type, value }) => {
                                    setSubmitValue({ type, value })
                                }}
                            />
                            <div className="mt-14 ">
                                <Typography color="!text-[#6F6C90]">
                                    OR
                                </Typography>
                            </div>
                            <UpdatedFindWPByForm
                                type="abn"
                                onSubmit={onSubmit}
                                submitValue={submitValue}
                                onSubmitValue={({ type, value }) => {
                                    setSubmitValue({ type, value })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            <div className="w-40 mx-auto">
                <Button
                    text={'Find'}
                    fullWidth
                    onClick={() => {
                        onSubmit(submitValue)
                    }}
                    loading={result.isLoading}
                    disabled={result.isLoading}
                />
            </div>
        </div>
    )
}
