import { Badge, Typography } from '@components'
import classNames from 'classnames'
import React, { ReactNode, useEffect, useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'

export enum WorkplaceAnswerEnum {
    Yes = 'Yes',
    No = 'No',
}

const answersData = [WorkplaceAnswerEnum.No, WorkplaceAnswerEnum.Yes]

export const WorkplaceQuestionCard = ({
    data,
    index,
    title,
    height,
    onClick,
    children,
    showOnlyAnswer,
}: {
    data: any
    index: number
    title: string
    height?: string
    children?: ReactNode
    showOnlyAnswer?: boolean
    onClick?: (value: WorkplaceAnswerEnum) => void
}) => {
    const [answer, setAnswer] = useState<any>(null)

    useEffect(() => {
        if (data?.answer) {
            setAnswer(data?.answer)
        }
    }, [data])

    const numberClasses = classNames({
        'bg-[#BF0000]': WorkplaceAnswerEnum.No === answer,
        'bg-[#30AF22]': WorkplaceAnswerEnum.Yes === answer,
        'bg-muted-dark':
            !answer ||
            (answer !== WorkplaceAnswerEnum.Yes &&
                answer !== WorkplaceAnswerEnum.No),
    })

    const answerIconClasses = (text: WorkplaceAnswerEnum, type?: string) => {
        return classNames({
            'text-[#BF0000]':
                text === answer && WorkplaceAnswerEnum.No === answer,
            'text-[#30AF22]':
                text === answer && WorkplaceAnswerEnum.Yes === answer,
            'text-secondary-dark': answer !== text,
        })
    }

    return (
        <div
            className={`flex-grow border border-dashed border-[#A5A3A9] p-2.5 h-auto ${
                height ? height : 'lg:h-[104px]'
            }  rounded-[10px] flex flex-col justify-between`}
        >
            <div className="flex items-start gap-x-4">
                <div
                    className={`mt-1 min-w-6 min-h-6 w-fit flex justify-center items-center ${numberClasses}  rounded-full`}
                >
                    <Typography variant="small" color="text-white">
                        {index < 9 ? 0 : null}
                        {index + 1}
                    </Typography>
                </div>
                <Typography medium>
                    <span className="text-[15px]">{title}</span>
                </Typography>
            </div>

            {/*  */}
            <div className="flex items-center gap-x-6 px-10">
                {showOnlyAnswer ? (
                    // <Typography variant="label">{data?.answer}</Typography>
                    children ? (
                        children
                    ) : (
                        <div className="flex items-center gap-x-1">
                            <Typography variant={'label'}>Answer:</Typography>
                            <Badge
                                text={data?.answer}
                                variant={
                                    data?.answer === WorkplaceAnswerEnum.No
                                        ? 'error'
                                        : 'success'
                                }
                            />
                        </div>
                    )
                ) : (
                    answersData.map((text) => (
                        <div
                            className="flex items-center gap-x-2.5 cursor-pointer"
                            onClick={() => {
                                setAnswer(text)
                                if (onClick) {
                                    onClick(text)
                                }
                            }}
                        >
                            <FaCircleCheck
                                size={19}
                                className={answerIconClasses(text)}
                            />
                            <Typography variant="label">{text}</Typography>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
