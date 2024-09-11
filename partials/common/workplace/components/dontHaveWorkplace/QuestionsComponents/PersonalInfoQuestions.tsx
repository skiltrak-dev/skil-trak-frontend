import React from 'react'
import { questionList } from '../questionListData'
import { TextTypeQuestions } from './TextTypeQuestions'
import { TextAreaQuestions } from './TextAreaQuestions'
import { DefaultQuestions } from './DefaultQuestions'
import { DaysQuestions } from './DaysQuestions'

export const PersonalInfoQuestions = ({
    formMethods,
    personalInfoData,
}: {
    formMethods: any
    personalInfoData: any
}) => {
    const formValues = formMethods.watch()
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
            {questionList?.map((ques, i, list) => {
                const textTypeLength = list?.filter(
                    (l) => l?.type === 'text'
                )?.length
                if (ques?.type === 'text') {
                    return (
                        <TextTypeQuestions
                            key={i}
                            index={i}
                            ques={ques}
                            textTypeLength={textTypeLength}
                            formMethods={formMethods}
                        />
                    )
                }
                if (ques?.type === 'days') {
                    return (
                        <DaysQuestions
                            key={i}
                            index={i}
                            ques={ques}
                            textTypeLength={textTypeLength}
                        />
                    )
                }

                if (ques?.type === 'textarea') {
                    return <TextAreaQuestions key={i} ques={ques} />
                }
                return (
                    <DefaultQuestions
                        key={i}
                        ques={ques}
                        personalInfoData={personalInfoData}
                        value={formValues?.[ques?.name]}
                    />
                )
            })}
        </div>
    )
}
