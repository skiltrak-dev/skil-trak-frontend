import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { useState } from 'react'

export const LogbookCheckBox = () => {
    const [first, setfirst] = useState(false)
    console.log({ first })

    return (
        <input
            type={FieldsTypeEnum.Checkbox}
            name={'check'}
            // id={`tabs-view-${s?.id}`}
            defaultChecked={first}
            checked={first}
            style={{
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                width: '20px',
                height: '20px',
                position: 'relative',
                outline: 'none',
            }}
            // value={s?.fieldValue}
            // value={first}
            // className={`noDefault z-10  ${
            //     true ? 'border-primary border-2' : 'border-gray-500 border'
            // }  rounded-sm text-sm p-1 outline-none`}
            onChange={() => {
                setfirst(!first)
            }}
            // onChange={(e: any) => {
            //     onAddCustomFieldsData({
            //         ...s,
            //         fieldValue: e?.target?.checked,
            //     })
            // }}
        />
    )
}
