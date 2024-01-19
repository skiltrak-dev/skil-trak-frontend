import React, { useState } from 'react'
import { DraggableInput } from './DraggableInput'
import { BiRename } from 'react-icons/bi'
import { Typography } from '@components/Typography'
import { MdKeyboardArrowDown } from 'react-icons/md'

export const SidebarOptions = ({
    value,
    setDraggableData,
    keyValue,
}: {
    keyValue: string
    value: any
    setDraggableData: any
}) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
    return (
        <div className="min-w-[100px] overflow-hidden">
            <div className="text-sm font-medium flex justify-between items-center">
                <Typography variant="label" bold>
                    {keyValue}
                </Typography>
                <MdKeyboardArrowDown
                    onClick={() => {
                        setIsOpened(!isOpened)
                    }}
                />
            </div>
            <div
                className={`${
                    isOpened ? 'max-h-[1000px]' : 'max-h-0'
                } transition-all duration-300`}
            >
                {value?.map((item: any, index: number) => (
                    <DraggableInput
                        setDraggableData={setDraggableData}
                        key={index}
                        text={item?.text}
                        id={item?.id}
                        data={{
                            color: item?.color,
                            placeholder: item?.placeholder,
                            preDefined: item?.preDefined,
                            type: item?.type,
                            column: item?.column,
                            role: item?.role,
                            isCustom: item?.isCustom,
                            // dataLabel: 'studentName',
                        }}
                        Icon={item?.Icon || BiRename}
                    />
                ))}
            </div>
        </div>
    )
}
