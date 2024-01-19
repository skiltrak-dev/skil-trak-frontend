'use client'

import { BiRename } from 'react-icons/bi'
import { DraggableInput } from './DraggableInput'
import { FieldsTypeEnum, SideBarFieldsData } from './SidebarData'
import { SidebarOptions } from './SidebarOptions'
import { Typography } from '@components/Typography'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useState } from 'react'
import { BackButton } from '@components/buttons'

export const ColorPreset = {
    student: '#f59e0b',
    rto: '#3b82f6',
    industry: '#10b981',
    coordinator: '',
    standard: '',
}
export const Sidebar = ({
    setDraggableData,
    recipients,
}: {
    setDraggableData: any
    recipients: string[]
}) => {
    const [isOpened, setIsOpened] = useState<string>('')
    const users = ['rto', 'industry']
    return (
        <div className="min-w-[250px] h-screen overflow-hidden overflow-y-auto custom-scrollbar bg-white py-2">
            <div className="h-[78%] w-full custom-scrollbar overflow-auto px-4">
                <BackButton
                    text="Back To Esign"
                    link={
                        'portals/admin/e-sign?tab=approved&page=1&pageSize=50'
                    }
                />

                <div className="my-3">
                    <Typography variant="small" semibold>
                        Open the user fields to view the draggable fields
                    </Typography>
                </div>

                {Object.entries(SideBarFieldsData)?.map(([key, value]: any) => {
                    const updatedValue =
                        recipients && recipients?.length > 0
                            ? recipients?.includes(value?.key)
                                ? value?.value
                                : value?.value?.filter(
                                      (v: any) =>
                                          v?.type !==
                                              FieldsTypeEnum?.Signature &&
                                          v?.type !== FieldsTypeEnum?.Date
                                  )
                            : value?.value

                    return (
                        <div
                            key={key}
                            className="min-w-[100px] overflow-hidden py-2"
                        >
                            <div
                                className="text-sm font-medium flex justify-between items-center cursor-pointer"
                                onClick={() => {
                                    setIsOpened(isOpened === key ? '' : key)
                                }}
                            >
                                <div className="flex items-center gap-x-1.5">
                                    <value.Icon className="text-lg" />
                                    <Typography variant="label" bold>
                                        <span className="cursor-pointer">
                                            {key}
                                        </span>
                                    </Typography>
                                </div>
                                <MdKeyboardArrowDown
                                    className={`${
                                        isOpened === key ? '-rotate-180' : ''
                                    } transition-all duration-300`}
                                />
                            </div>
                            <div
                                className={`${
                                    isOpened === key
                                        ? 'max-h-[1000px]'
                                        : 'max-h-0'
                                } transition-all duration-700 overflow-hidden`}
                            >
                                {updatedValue?.map(
                                    (item: any, index: number) => (
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
                                    )
                                )}
                            </div>
                        </div>
                    )
                })}
                {/* <div className="min-w-[100px] overflow-hidden">
                    <div className="text-sm font-medium">Student Fields</div>
                    <div>
                        <DraggableInput
                            text="Student Id"
                            id="input-student-id"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Id',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'studentId',
                                role: UserRoles.STUDENT,
                                // dataLabel: 'studentName',
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Student Name"
                            id="input-student-name"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Name',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'name',
                                role: UserRoles.STUDENT,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Student Email"
                            id="input-student-email"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Email',
                                preDefined: true,
                                type: FieldsTypeEnum.Email,
                                column: 'email',
                                role: UserRoles.STUDENT,
                            }}
                            Icon={MdOutlineMail}
                        />
                        <DraggableInput
                            text="Student Phone"
                            id="input-student-phone"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Phone',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'phone',
                                role: UserRoles.STUDENT,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Student Sign Date"
                            id="input-sign-student-date"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Sign Date',
                                preDefined: true,
                                type: FieldsTypeEnum.Date,
                                column: 'date',
                                role: UserRoles.STUDENT,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Student Signature"
                            id="input-student-signature"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Student Signature',
                                preDefined: true,
                                type: FieldsTypeEnum.Signature,
                                column: FieldsTypeEnum.Signature,
                                role: UserRoles.STUDENT,
                            }}
                            Icon={MdOutlineMail}
                        />
                    </div>
                </div>
                <div className="min-w-[100px] overflow-hidden">
                    <div className="text-sm font-medium">RTO Fields</div>
                    <div>
                        <DraggableInput
                            text="RTO Name"
                            id="input-rto-name"
                            data={{
                                color: ColorPreset.rto,
                                placeholder: 'RTO Name',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'name',
                                role: UserRoles.RTO,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="RTO Email"
                            id="input-rto-email"
                            data={{
                                color: ColorPreset.rto,
                                placeholder: 'RTO Email',
                                preDefined: true,
                                type: FieldsTypeEnum.Email,
                                column: 'email',
                                role: UserRoles.RTO,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="RTO Code"
                            id="input-rto-code"
                            data={{
                                color: ColorPreset.rto,
                                placeholder: 'RTO Code',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'rtoCode',
                                role: UserRoles.RTO,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="RTO Phone"
                            id="input-rto-phone"
                            data={{
                                color: ColorPreset.rto,
                                placeholder: 'RTO Phone',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'phone',
                                role: UserRoles.RTO,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Rto Sign Date"
                            id="input-rto-sign-date"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Rto Sign Date',
                                preDefined: true,
                                type: FieldsTypeEnum.Date,
                                column: 'date',
                                role: UserRoles.RTO,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="RTO Signature"
                            id="input-rto-signature"
                            data={{
                                color: ColorPreset.rto,
                                placeholder: 'RTO Signature',
                                preDefined: true,
                                type: FieldsTypeEnum.Signature,
                                column: 'signature',
                                role: UserRoles.RTO,
                            }}
                            Icon={MdOutlineMail}
                        />
                    </div>
                </div>
                <div className="min-w-[100px] overflow-hidden">
                    <div className="text-sm font-medium">Industry Fields</div>
                    <div>
                        <DraggableInput
                            text="Industry Name"
                            id="input-industry-name"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Industry Name',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'name',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Industry Email"
                            id="input-industry-email"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Industry Email',
                                preDefined: true,
                                type: FieldsTypeEnum.Email,
                                column: 'email',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Industry ABN"
                            id="input-industry-abn"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Industry ABN',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'abn',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Industry Phone"
                            id="input-industry-phone"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Industry Phone',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'phoneNumber',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Industry Sign Date"
                            id="input-industry-sign-date"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Industry Sign Date',
                                preDefined: true,
                                type: FieldsTypeEnum.Date,
                                column: 'date',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Industry Signature"
                            id="input-industry-signature"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Industry Signature',
                                preDefined: true,
                                type: FieldsTypeEnum.Signature,
                                column: 'signature',
                                role: UserRoles.INDUSTRY,
                            }}
                            Icon={MdOutlineMail}
                        />
                    </div>
                </div>
                <div className="min-w-[100px] overflow-hidden">
                    <div className="text-sm font-medium">
                        Coordinator Fields
                    </div>
                    <div>
                        <DraggableInput
                            text="Coordinator Name"
                            id="input-coordinator-name"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Coordinator Name',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'name',
                                role: UserRoles.SUBADMIN,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Coordinator Email"
                            id="input-coordinator-email"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Coordinator Email',
                                preDefined: true,
                                type: FieldsTypeEnum.Email,
                                column: 'email',
                                role: UserRoles.SUBADMIN,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Coordinator Phone"
                            id="input-coordinator-phone"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Coordinator Phone',
                                preDefined: true,
                                type: FieldsTypeEnum.Text,
                                column: 'email',
                                role: UserRoles.SUBADMIN,
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Subadmin Sign Date"
                            id="input-subadmin-sign-date"
                            data={{
                                color: ColorPreset.student,
                                placeholder: 'Subadmin Sign Date',
                                preDefined: true,
                                type: FieldsTypeEnum.Date,
                                column: 'date',
                                role: UserRoles.SUBADMIN,
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="Coordinator Signature"
                            id="input-coordinator-signature"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Coordinator Signature',
                                preDefined: true,
                                type: FieldsTypeEnum.Signature,
                                column: 'signature',
                                role: UserRoles.SUBADMIN,
                            }}
                            Icon={MdOutlineMail}
                        />
                    </div>
                </div>
                <div className="min-w-[100px] overflow-hidden">
                    <div className="text-sm font-medium">Standard Fields</div>
                    <div>
                        <DraggableInput
                            text="Text Field"
                            id="text"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Text Field',
                                type: FieldsTypeEnum.Text,
                                column: 'custom',
                                isCustom: true,
                                name: '',
                            }}
                            Icon={BiRename}
                        />

                        <DraggableInput
                            text="CheckBox"
                            id="checkbox"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'CheckBox',
                                type: FieldsTypeEnum.Checkbox,
                                isCustom: true,
                                column: 'custom',
                                name: '',
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Radio Button"
                            id="radioButton"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Radio Button',
                                type: FieldsTypeEnum.Radio,
                                isCustom: true,
                                column: 'custom',
                                name: '',
                            }}
                            Icon={MdOutlineMail}
                        />

                        <DraggableInput
                            text="Dropdown"
                            id="dropdown"
                            data={{
                                color: ColorPreset.industry,
                                placeholder: 'Dropdown',
                                isCustom: true,
                                column: 'custom',
                                type: FieldsTypeEnum.Dropdown,
                                name: '',
                            }}
                            Icon={MdOutlineMail}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    )
}
