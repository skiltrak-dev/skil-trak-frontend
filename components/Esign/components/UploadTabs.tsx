import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'
import React from 'react'
import { read, utils } from 'xlsx'

export const UploadTabs = ({ onFileChange }: { onFileChange: any }) => {
    const onChange = async (e: any, fileData: any) => {
        // const wb = readFile(e.target.result)
        const wb = read(e.target.result, { type: 'binary' })
        const sheets = wb.SheetNames

        if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
            onFileChange(rows)
        }
    }
    return (
        <div className='mt-3'>
            <BinaryFileUpload
                label={'Upload Tabs'}
                name="list"
                onChange={onChange}
                fileAsObject={false}
                // acceptTypes={['.xlsx, .csv']}
            />
        </div>
    )
}
