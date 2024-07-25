import React from 'react'
import { ClipLoader } from 'react-spinners'

export const DocsCheckbox = ({ checked, label, onChange, loading }: any) => {
    return (
        <label className="flex items-center gap-x-2.5 text-xs">
            {loading ? (
                <div className="h-[22px] w-[22px] flex items-center justify-center rounded-md">
                    <ClipLoader size={16} />
                </div>
            ) : (
                <input
                    type="checkbox"
                    name=""
                    value={label}
                    id=""
                    onChange={(event) => onChange(event)}
                    checked={checked}
                />
            )}
            <p className="text-black text-xs font-medium">{label}</p>
        </label>
    )
}
