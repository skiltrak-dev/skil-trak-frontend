import { TextArea, Typography } from '@components'
import React from 'react'
import { workplaceQuestions } from '../questionListData'

export const TextAreaQuestions = ({ ques }: { ques: any }) => {
    return (
        <div className="flex flex-col gap-y-1">
            <Typography variant="label" semibold block>
                {ques?.index}. {ques?.title}
            </Typography>
            <Typography variant="label">
                {
                    workplaceQuestions[
                        ques?.name as keyof typeof workplaceQuestions
                    ]
                }
            </Typography>
            <div className="mt-1">
                <TextArea
                    rows={4}
                    name={ques?.name}
                    required
                    placeholder={
                        workplaceQuestions[
                            ques?.name as keyof typeof workplaceQuestions
                        ]
                    }
                />
            </div>
        </div>
    )
}
