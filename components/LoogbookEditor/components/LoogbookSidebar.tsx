import React from 'react'
import { UserRoles } from '@constants'
import { BiRename } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { LoogBookDraggableInput } from './LoogBookDraggableInput'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'

export const LoogbookSidebar = ({
    setData,
    setDraggableData,
}: {
    setData: any
    setDraggableData: any
}) => {
    const ColorPreset = {
        student: '#f59e0b',
        rto: '#3b82f6',
        industry: '#10b981',
        coordinator: '',
        standard: '',
    }
    const sidebarData = [
        {
            text: 'Text Field',
            id: 'input-student-id',
            color: ColorPreset.student,
            placeholder: 'Student Id',
            preDefined: true,
            type: FieldsTypeEnum.Text,
            column: 'studentId',
            role: UserRoles.STUDENT,
            Icon: MdDriveFileRenameOutline,
            img: '/images/logbook/text-editor.png',
        },
        {
            text: 'Checkbox',
            id: 'input-student-checkbox',
            color: ColorPreset.student,
            placeholder: 'Student name',
            preDefined: true,
            type: FieldsTypeEnum.Checkbox,
            column: 'name',
            Icon: AiOutlineUser,
            role: UserRoles.STUDENT,
            img: '/images/logbook/check.png',
        },
        {
            text: 'Date',
            id: 'input-student-checkbox',
            color: ColorPreset.student,
            placeholder: 'Student name',
            preDefined: true,
            type: FieldsTypeEnum.Date,
            column: 'name',
            Icon: AiOutlineUser,
            role: UserRoles.STUDENT,
            img: '/images/logbook/calenadar.png',
        },
        {
            text: 'Signature',
            id: 'input-student-signature',
            color: ColorPreset.student,
            placeholder: 'Student name',
            preDefined: true,
            type: FieldsTypeEnum.Signature,
            column: 'name',
            Icon: AiOutlineUser,
            role: UserRoles.STUDENT,
            img: '/images/logbook/agreement.png',
        },
    ]
    return (
        <div className="px-3 flex flex-col gap-y-2.5 mt-3.5">
            {sidebarData?.map((item: any, index: number) => (
                <LoogBookDraggableInput
                    setDraggableData={setDraggableData}
                    onClick={setData}
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
                        img: item?.img,
                    }}
                    Icon={item?.Icon || BiRename}
                />
            ))}
        </div>
    )
}
