import { TextInput, Typography } from '@components'
import React from 'react'
import { workplaceQuestions } from '../questionListData'

export const TextTypeQuestions = ({
    ques,
    index,
    textTypeLength,
}: {
    ques: any
    index: number
    textTypeLength: number
}) => {
    return (
        <>
            <div
                className={`${
                    ques?.fullWidth ? 'col-span-2' : ''
                } flex flex-col gap-y-1`}
            >
                <div>
                    <Typography variant="label" semibold block>
                        {ques?.index}. {ques?.title}
                    </Typography>

                    <Typography variant="label" block>
                        {
                            workplaceQuestions[
                                ques?.name as keyof typeof workplaceQuestions
                            ]
                        }
                    </Typography>
                </div>
                {ques?.inputValues && ques?.inputValues?.length > 0 ? (
                    <div
                        className={`grid grid-cols-1 ${
                            ques?.inputValues?.length > 1
                                ? 'lg:grid-cols-2'
                                : 'lg:grid-cols-1'
                        }  gap-3`}
                    >
                        {ques?.inputValues?.map((inp: any) => (
                            <TextInput
                                name={inp?.name}
                                label={inp?.label}
                                placeholder={inp?.placeholder}
                                required
                                type={inp?.type as any}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
            {textTypeLength % 2 === 1 && index === textTypeLength - 1 ? (
                <div />
            ) : null}
        </>
    )
}
