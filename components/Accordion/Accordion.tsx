import { GoPlus } from 'react-icons/go'

import { Typography } from '@components'

type AccordionProps = {
    question: string
    answer: string
    index?: number
    isOpen: boolean
    onToggle: () => void
}

export const Accordion = ({
    question,
    answer,
    index = 0,
    isOpen,
    onToggle,
}: AccordionProps) => {
    return (
        <div
            onClick={onToggle}
            className={`bg-white cursor-pointer transition-all shadow-md ${
                isOpen ? 'min-h-20' : 'h-[118px] overflow-hidden'
            } border-b-2 border-gray-300`}
        >
            <div className=" py-[52px] px-[60px]">
                <div className="flex justify-between">
                    <div className="flex gap-x-[52px]">
                        <Typography
                            variant="title"
                            color={'text-gray-400'}
                            bold
                            cursorPointer
                        >
                            {index <= 9 ? `0${index}` : index}
                        </Typography>
                        <div className="flex flex-col gap-y-8">
                            <Typography variant="title" bold cursorPointer>
                                {question}
                            </Typography>
                            <Typography variant="body" color="text-gray-500">
                                {answer}
                            </Typography>
                        </div>
                    </div>

                    <div
                        className={`${
                            isOpen ? 'bg-black text-white' : 'bg-gray-200'
                        } rounded-full h-8 w-8 flex justify-center items-center p-2 transition-all`}
                    >
                        <GoPlus
                            size={16}
                            className={` ${
                                isOpen ? '-rotate-45 ' : 'rounded-full rotate-0'
                            } transition-all`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
