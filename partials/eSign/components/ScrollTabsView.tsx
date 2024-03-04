import { Card, Typography } from '@components'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { ellipsisText } from '@utils'
import { FaSignature } from 'react-icons/fa'
import { IoIosCheckmarkCircle } from 'react-icons/io'

export const ScrollTabsView = ({
    scrollToPage,
    customFieldsAndSign,
    setSelectedFillDataField,
    onClick,
}: {
    scrollToPage: any
    customFieldsAndSign: any
    setSelectedFillDataField: any
    onClick: any
}) => {
    return (
        <Card noPadding fullHeight>
            <div className="p-2 flex flex-col gap-y-2 h-full overflow-y-auto custom-scrollbar">
                <div>
                    <Typography variant="small" semibold>
                        Click here to fill the data in form
                    </Typography>
                </div>
                {customFieldsAndSign?.map((fields: any, i: number) => {
                    if (fields?.type === FieldsTypeEnum.Signature) {
                        return (
                            <div
                                onClick={() => {
                                    onClick()
                                    scrollToPage(Number(fields?.number - 1))
                                    // scrollToPage(Number(i))
                                }}
                                className="w-full ml-auto z-10 px-7 py-2 h-9 bg-red-600 rounded-md flex justify-center items-center gap-x-2 text-white"
                            >
                                <FaSignature className="text-2xl" />
                                <button className="text-sm whitespace-pre">
                                    {fields?.responses &&
                                    fields?.responses?.length > 0
                                        ? 'View Sign'
                                        : 'Go to Sign Section'}
                                </button>
                            </div>
                        )
                    }
                    return (
                        <div>
                            <div
                                onClick={() => {
                                    onClick()
                                    setSelectedFillDataField(fields?.id)
                                    scrollToPage(Number(fields?.number - 1))
                                    // scrollToPage(Number(i))
                                }}
                                className={`h-9 w-full ml-auto px-1 py-2 ${
                                    fields?.fieldValue
                                        ? 'bg-success'
                                        : 'bg-primary'
                                } relative group text-white rounded-md flex justify-center items-center gap-x-2  cursor-pointer`}
                            >
                                <Typography
                                    variant="label"
                                    medium
                                    color={'text-white'}
                                >
                                    <span className="w-full flex items-center gap-x-0.5">
                                        <span className="cursor-pointer">
                                            {ellipsisText(
                                                fields?.placeholder,
                                                10
                                            )}
                                        </span>
                                        <span className="text-[10px]">
                                            ({fields?.number})
                                        </span>
                                        {fields?.fieldValue && (
                                            <span>
                                                <IoIosCheckmarkCircle className="text-white text-lg" />
                                            </span>
                                        )}
                                    </span>
                                </Typography>
                                {fields?.fieldValue && (
                                    <div className="w-full flex justify-center absolute top-full left-0">
                                        <div className="hidden group-hover:block w-[90%] break-all  p-2 z-[1111] text-black shadow rounded-md bg-white">
                                            <Typography
                                                variant="small"
                                                semibold
                                            >
                                                {fields?.fieldValue}
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}
