import { AuthorizedUserComponent, ShowErrorNotifications } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { LoadingSpinner } from '@components/inputs/components'
import { UserRoles } from '@constants'
import { useNotification } from '@hooks'
import { CommonApi } from '@queries'
import debounce from 'lodash/debounce'
import React, { useCallback } from 'react'
import { FaSignature } from 'react-icons/fa'

export const TabsView = ({
    customFieldsData,
    index,
    onAddCustomFieldsData,
    onSignatureClicked,
    selectedFillDataField,
}: {
    index: number
    customFieldsData: any
    onAddCustomFieldsData: any
    onSignatureClicked: any
    selectedFillDataField?: any
}) => {
    const { notification } = useNotification()

    const [updateSignDate, updateSignDateResult] =
        CommonApi.ESign.useUpdateSignDate()

    const onUpdateSignDate = useCallback(
        debounce(
            (event: any, tab: any) =>
                updateSignDate({
                    date: event?.target?.value,
                    id: tab?.responses?.[0]?.id,
                }).then((res: any) => {
                    if (res?.data) {
                        notification.success({
                            title: 'Date Updated',
                            description: 'Date Updated Successfully',
                        })
                    }
                }),
            1600
        ),
        []
    )

    return (
        <>
            <ShowErrorNotifications result={updateSignDateResult} />

            {customFieldsData &&
                customFieldsData?.length > 0 &&
                customFieldsData?.map((s: any) => {
                    const [x, y] = s ? s?.position?.split(',') : []
                    const [width, height] = s ? s?.size?.split(',') : []

                    const latestResponse = s?.responses?.reduce(
                        (accumulator: any, current: any) => {
                            // Convert timestamps to Date objects for comparison
                            const accumulatorDate = new Date(
                                accumulator.updatedAt
                            )
                            const currentDate = new Date(current.updatedAt)

                            // Return the item with the later updatedAt timestamp
                            return currentDate > accumulatorDate
                                ? current
                                : accumulator
                        },
                        s?.responses[0]
                    )

                    return s?.number === index + 1 ? (
                        <foreignObject
                            x={x}
                            y={y}
                            width={
                                s?.type === FieldsTypeEnum.Date
                                    ? String(Number(width) + 10)
                                    : width
                            }
                            height={
                                s?.type === FieldsTypeEnum.Date
                                    ? String(Number(height) + 10)
                                    : height
                            }
                        >
                            {s?.type === FieldsTypeEnum.Signature ? (
                                s?.responses &&
                                s?.responses?.length > 0 &&
                                !latestResponse?.reSignRequested ? (
                                    ''
                                ) : (
                                    <div
                                        onClick={() => onSignatureClicked(s)}
                                        className="z-10 w-full h-full bg-red-600 flex justify-center items-center gap-x-2 text-white"
                                    >
                                        <FaSignature className="text-xs" />
                                        <button className="text-[8px]">
                                            Sign Here
                                        </button>
                                    </div>
                                )
                            ) : null}
                            {!s?.responses?.length ? (
                                s?.type === FieldsTypeEnum.Text &&
                                s?.isCustom ? (
                                    <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={s?.fieldValue}
                                        className={`w-full h-full border-2 rounded-md ${
                                            selectedFillDataField === s?.id
                                                ? 'border-primary'
                                                : 'border-gray-500'
                                        }  text-sm p-1 outline-none`}
                                        placeholder={s?.label}
                                        onChange={(e: any) => {
                                            onAddCustomFieldsData({
                                                ...s,
                                                fieldValue: e?.target?.value,
                                            })
                                        }}
                                    />
                                ) : s?.type === FieldsTypeEnum.Checkbox ? (
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type={FieldsTypeEnum.Checkbox}
                                            name={s?.columnName}
                                            id=""
                                            defaultChecked={s?.fieldValue}
                                            checked={s?.fieldValue}
                                            value={s?.fieldValue}
                                            className={`noDefault border !w-full !h-full rounded-md ${
                                                selectedFillDataField === s?.id
                                                    ? 'border-primary'
                                                    : 'border-gray-500'
                                            } text-sm p-1 outline-none`}
                                            placeholder={s?.label}
                                            onChange={(e: any) => {
                                                onAddCustomFieldsData({
                                                    ...s,
                                                    fieldValue:
                                                        e?.target?.checked,
                                                })
                                            }}
                                        />
                                        {/* <label className="text-xs capitalize">
                                {s?.label}
                            </label> */}
                                    </div>
                                ) : s?.type === FieldsTypeEnum.Radio ? (
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type={FieldsTypeEnum.Radio}
                                            name={s?.columnName}
                                            id=""
                                            value={s?.fieldValue}
                                            className="border rounded-md border-gray-500 text-sm p-1 outline-none"
                                            placeholder={s?.label}
                                            onChange={(e: any) => {
                                                onAddCustomFieldsData({
                                                    ...s,
                                                    fieldValue:
                                                        e?.target?.checked,
                                                })
                                            }}
                                        />
                                        {/* <label className="text-xs capitalize">
                                {s?.label}
                            </label> */}
                                    </div>
                                ) : s?.type === FieldsTypeEnum.Dropdown ? (
                                    <select
                                        value={s?.fieldValue}
                                        onChange={(e: any) => {
                                            onAddCustomFieldsData({
                                                ...s,
                                                fieldValue: e?.target?.value,
                                            })
                                        }}
                                        className="w-full h-4 border border-gray-600 rounded text-xs"
                                    >
                                        <option>Select</option>
                                        {s?.option &&
                                            s?.option
                                                ?.split(',')
                                                ?.map((data: string) => (
                                                    <option
                                                        key={data}
                                                        value={data}
                                                    >
                                                        {data}
                                                    </option>
                                                ))}
                                    </select>
                                ) : (
                                    ''
                                )
                            ) : null}
                            {s?.type === FieldsTypeEnum.Date &&
                            s?.responses &&
                            s?.responses?.length > 0 ? (
                                <AuthorizedUserComponent
                                    roles={[UserRoles.SUBADMIN]}
                                >
                                    <div className="bg-white relative flex flex-col ">
                                        <label
                                            htmlFor=""
                                            className="text-[8px]"
                                        >
                                            {s?.placeholder}
                                        </label>

                                        <input
                                            type="date"
                                            name=""
                                            id=""
                                            value={s?.fieldValue?.slice(0, 10)}
                                            className="w-full h-5 border rounded-md border-gray-500 text-sm p-1 outline-none"
                                            placeholder={s?.label}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>
                                            ) => {
                                                // Handle changes only if the input field has focus (i.e., not when the month or year are changed)

                                                onAddCustomFieldsData({
                                                    ...s,
                                                    fieldValue: e.target.value,
                                                })
                                                onUpdateSignDate(e, s)
                                            }}
                                        />
                                        {updateSignDateResult?.isLoading && (
                                            <LoadingSpinner
                                                loading={
                                                    updateSignDateResult?.isLoading
                                                }
                                            />
                                        )}
                                    </div>
                                </AuthorizedUserComponent>
                            ) : (
                                ''
                            )}
                        </foreignObject>
                    ) : null
                })}
        </>
    )
}
