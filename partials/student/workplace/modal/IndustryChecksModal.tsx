import { Button, GlobalModal, Typography } from '@components'
import { FileUpload } from '@hoc'
import React from 'react'
import { MdCancel } from 'react-icons/md'

const UploadFile = ({ name, fileList }: { name: string; fileList: any }) => (
    <div className=" bg-primaryNew-dark rounded-[5px] flex justify-between items-center px-5 py-2.5">
        <Typography variant="small" medium color="text-white">
            Saad
        </Typography>

        <Button>
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                Upload Document
            </label>
        </Button>
    </div>
)

export const IndustryChecksModal = ({ onCancel }: { onCancel: () => void }) => {
    return (
        <GlobalModal>
            <div className="relative max-w-[1076px] w-full">
                <MdCancel
                    onClick={onCancel}
                    className="absolute -top-3 -right-3 transition-all duration-500 text-black hover:text-black text-3xl cursor-pointer hover:rotate-90"
                />
                <div className="h-[80vh] md:h-[88vh]  overflow-auto custom-scrollbar">
                    <Typography variant="title" center>
                        Industry Checks
                    </Typography>

                    <FileUpload
                        onChange={(docs: FileList) => {}}
                        name={'attachments'}
                        component={UploadFile}
                        multiple
                        limit={Number(1111111111)}
                    />
                </div>
            </div>
        </GlobalModal>
    )
}
