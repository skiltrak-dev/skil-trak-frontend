'use client'

import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import { FieldsTypeEnum } from './SidebarData'
import { Checkbox } from '@components/inputs'

export const Contextbar = ({
    items,
    content,
    totalPages,
    setCurrentPage,
    onSetContextBar,
    onSetCoordinates,
    onHandleScroll,
}: {
    onHandleScroll: any
    items: any
    content: any
    totalPages: number
    setCurrentPage: (pageNumber: number) => void
    onSetContextBar: (e: any, key: string) => void
    onSetCoordinates: (content: any, cordinate: any, key: string) => void
}) => {
    const isExist = (key: string) =>
        items?.find(
            (item: any) =>
                item?.data?.[key]?.toLowerCase() ===
                    content?.data?.[key]?.toLowerCase() &&
                item?.id != content?.id
        )

    return (
        <div className="min-w-[250px] h-screen overflow-auto custom-scrollbar bg-white px-4 py-2">
            <div className="h-[81%] overflow-auto custom-scrollbar">
                <div className="text-sm font-medium">
                    {content?.type || 'Select Input'}
                </div>
                <hr />
                <div>
                    <p className="text-sm font-medium">Location</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                            <Typography
                                variant="small"
                                semibold
                                color={'text-gray-600'}
                            >
                                X:
                            </Typography>
                            <input
                                type="number"
                                onChange={(e: any) => {
                                    onSetCoordinates(content, e, 'x')
                                }}
                                value={content?.location?.x || ''}
                                className="border p-0 w-full h-8 shadow rounded-md px-1"
                            />
                        </div>
                        <div className="flex flex-col ">
                            <Typography
                                variant="small"
                                semibold
                                color={'text-gray-600'}
                            >
                                Y:
                            </Typography>
                            <input
                                type="number"
                                onChange={(e: any) => {
                                    onSetCoordinates(content, e, 'y')
                                }}
                                value={content?.location?.y || ''}
                                className="border p-0 w-full h-8 shadow rounded-md px-1"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-2">
                    <Typography
                        variant="small"
                        semibold
                        color={'text-gray-600'}
                    >
                        Data Label
                    </Typography>
                    <input
                        type="text"
                        onChange={(e: any) => {
                            onSetContextBar({ content, e }, 'dataLabel')
                        }}
                        disabled={content?.data?.preDefined}
                        value={content?.data?.dataLabel || ''}
                        className={`order p-0 w-full border h-8 shadow rounded-md px-1 ${
                            content?.data?.preDefined
                                ? 'bg-gray-200 cursor-not-allowed'
                                : ''
                        }`}
                    />
                    {/* {isExist('dataLabel') && content?.data?.dataLabel && (
                    <p className="text-xs text-error">
                        {content?.data?.dataLabel} Data Label Already exist
                    </p>
                )} */}
                </div>
                {/* <div className="mt-2">
                <p className="text-sm font-medium">Data Type</p>
                <select
                    className={`border w-full rounded ${
                        content?.data?.preDefined
                            ? 'bg-gray-200 cursor-not-allowed'
                            : ''
                    }`}
                    name=""
                    id=""
                    disabled={content?.data?.preDefined}
                    value={content?.data?.type || ''}
                    onChange={(e: any) => {
                        onSetContextBar({ content, e }, 'type')
                    }}
                >
                    <option value="">Select</option>
                    <option value={FieldsTypeEnum.Text}>Text</option>
                    <option value={FieldsTypeEnum.Email}>Email</option>
                    <option value={FieldsTypeEnum.Date}>Date</option>
                </select>
            </div> */}

                {content?.data?.isCustom && (
                    <>
                        <div className="mt-3">
                            <Typography
                                variant="small"
                                semibold
                                color={'text-gray-600'}
                            >
                                Name
                            </Typography>{' '}
                            <input
                                type="text"
                                onChange={(e: any) => {
                                    onSetContextBar({ content, e }, 'column')
                                }}
                                disabled={content?.data?.preDefined}
                                value={content?.data?.column || ''}
                                className={`order p-0 w-full border h-8 shadow rounded-md px-1 ${
                                    content?.data?.preDefined
                                        ? 'bg-gray-200 cursor-not-allowed'
                                        : ''
                                }`}
                            />
                            {/* {content?.data?.type !== FieldsTypeEnum.Checkbox &&
                            content?.data?.type !== FieldsTypeEnum.Radio &&
                            isExist('name') &&
                            content?.data?.name && (
                                <p className="text-xs text-error">
                                    {content?.data?.name} Name Already exist
                                </p>
                            )} */}
                        </div>

                        {content?.data?.type === FieldsTypeEnum.Dropdown && (
                            <div className="mt-3">
                                <Typography
                                    variant="small"
                                    semibold
                                    color={'text-gray-600'}
                                >
                                    DropDown Values
                                </Typography>

                                <textarea
                                    placeholder="Seprate Values with Comma(,)"
                                    rows={4}
                                    onChange={(e: any) => {
                                        onSetContextBar(
                                            { content, e },
                                            'option'
                                        )
                                    }}
                                    disabled={content?.data?.preDefined}
                                    value={content?.data?.option || ''}
                                    className={`order p-0 w-full border shadow-md rounded-md px-1.5 ${
                                        content?.data?.preDefined
                                            ? 'bg-gray-200 cursor-not-allowed'
                                            : ''
                                    }`}
                                />
                                <p className="text-[10px]">
                                    Seprate Values with Comma(,)
                                </p>
                            </div>
                        )}
                        <div className="mt-3">
                            <Typography
                                variant="small"
                                semibold
                                color={'text-gray-600'}
                            >
                                Role{' '}
                            </Typography>
                            <select
                                className={`border w-full shadow-md rounded-md px-1 ${
                                    content?.data?.preDefined
                                        ? 'bg-gray-200 cursor-not-allowed'
                                        : ''
                                }`}
                                name=""
                                id=""
                                value={content?.data?.role || ''}
                                onChange={(e: any) => {
                                    onSetContextBar({ content, e }, 'role')
                                }}
                            >
                                <option value="">Select</option>
                                {Object.values(UserRoles).map((key: string) => (
                                    <option
                                        key={key}
                                        value={key}
                                        className="capitalize"
                                    >
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-2 flex items-center gap-x-2">
                            {/* <input
                            onChange={(e) => {
                                onSetContextBar({ content, e }, 'isRequired')
                            }}
                            defaultChecked={content?.data?.isRequired}
                            type="checkbox"
                            name=""
                            value={content?.data?.isRequired}
                            id="isRequired"
                        /> */}
                            <Checkbox
                                name={'isRequired'}
                                onChange={(e: any) => {
                                    onSetContextBar(
                                        { content, e },
                                        'isRequired'
                                    )
                                }}
                                defaultChecked={content?.data?.isRequired}
                                value={content?.data?.isRequired}
                                id="isRequired"
                                label={'IsRequired'}
                            />
                            {/* <label htmlFor="isRequired">IsRequired</label> */}
                        </div>
                    </>
                )}

                {totalPages && (
                    <div className="mt-4">
                        <Typography
                            variant="label"
                            color="text-gray-600"
                            semibold
                        >
                            Page Numbers
                        </Typography>
                        <div className="grid grid-cols-4 gap-3 mt-2">
                            {[...Array(Number(totalPages))]?.map((_, i) => (
                                <span
                                    key={i}
                                    onClick={() => {
                                        // setCurrentPage(i)
                                        onHandleScroll(i)
                                    }}
                                    className="w-8 h-8 rounded-full bg-success text-white text-xs font-bold flex justify-center items-center cursor-pointer"
                                >
                                    {i + 1}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {/* <div className="mt-2">
                <p className="text-sm font-medium">Data Type</p>
                <select
                    className={`border w-full rounded ${
                        content?.data?.preDefined
                            ? 'bg-gray-200 cursor-not-allowed'
                            : ''
                    }`}
                    name=""
                    id=""
                    disabled={content?.data?.preDefined}
                    value={content?.data?.type || ''}
                    onChange={(e: any) => {
                        onSetContextBar({ content, e }, 'type')
                    }}
                >
                    <option value="">Select</option>
                    <option value={FieldsTypeEnum.Text}>Text</option>
                    <option value={FieldsTypeEnum.Email}>Email</option>
                    <option value={FieldsTypeEnum.Date}>Date</option>
                </select>
            </div> */}

            {content?.data?.isCustom && (
                <>
                    <div className="mt-3">
                        <p className="text-sm font-medium">Name</p>
                        <input
                            type="text"
                            onChange={(e: any) => {
                                onSetContextBar({ content, e }, 'column')
                            }}
                            disabled={content?.data?.preDefined}
                            value={content?.data?.column || ''}
                            className={`order p-0 w-full border ${
                                content?.data?.preDefined
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : ''
                            }`}
                        />
                        {/* {content?.data?.type !== FieldsTypeEnum.Checkbox &&
                            content?.data?.type !== FieldsTypeEnum.Radio &&
                            isExist('name') &&
                            content?.data?.name && (
                                <p className="text-xs text-error">
                                    {content?.data?.name} Name Already exist
                                </p>
                            )} */}
                    </div>

                    {content?.data?.type === FieldsTypeEnum.Dropdown && (
                        <div className="mt-3">
                            <p className="text-sm font-medium">
                                DropDown Values
                            </p>
                            <textarea
                                placeholder="Seprate Values with Comma(,)"
                                rows={4}
                                onChange={(e: any) => {
                                    onSetContextBar({ content, e }, 'option')
                                }}
                                disabled={content?.data?.preDefined}
                                value={content?.data?.option || ''}
                                className={`order p-0 w-full border ${
                                    content?.data?.preDefined
                                        ? 'bg-gray-200 cursor-not-allowed'
                                        : ''
                                }`}
                            />
                            <p className="text-[10px]">
                                Seprate Values with Comma(,)
                            </p>
                        </div>
                    )}
                    <div className="mt-3">
                        <p className="text-sm font-medium">Role</p>
                        <select
                            className={`border w-full rounded ${
                                content?.data?.preDefined
                                    ? 'bg-gray-200 cursor-not-allowed'
                                    : ''
                            }`}
                            name=""
                            id=""
                            value={content?.data?.role || ''}
                            onChange={(e: any) => {
                                onSetContextBar({ content, e }, 'role')
                            }}
                        >
                            <option value="">Select</option>
                            {Object.values(UserRoles).map((key: string) => (
                                <option
                                    key={key}
                                    value={key}
                                    className="capitalize"
                                >
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}
        </div>
    )
}
