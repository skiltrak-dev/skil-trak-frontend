import { forwardRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

// components
import { Button, Typography } from '@components'

export const Signature = forwardRef(({ industryName }: any, ref: any) => {
    const onClear = () => {
        ref?.current?.clear()
    }
    return (
        <div className="my-5 w-full max-w-[50%] ml-auto">
            <div className="cursor-pointer h-40 border border-gray flex justify-center items-center ">
                <SignatureCanvas
                    penColor="black"
                    ref={ref}
                    canvasProps={{
                        className: 'w-full h-full',
                        id: 'sigCanvas',
                    }}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Typography variant={'label'}>{industryName}</Typography>
                <div className="flex gap-x-2 items-center">
                    <Button onClick={onClear} variant="secondary">
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    )
})
Signature.displayName = 'Signature'
