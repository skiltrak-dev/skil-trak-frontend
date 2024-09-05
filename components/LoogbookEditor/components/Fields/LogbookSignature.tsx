import { forwardRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

// components
import { Button, Typography } from '@components'

export const LogbookSignature = forwardRef(
    ({ onSubmitSign }: { onSubmitSign: () => void }, ref: any) => {
        const onClear = () => {
            ref?.current?.clear()
        }
        return (
            <div className="w-full ml-auto p-2.5 bg-white shadow-profiles flex flex-col gap-y-1.5">
                <Typography variant="small" center medium>
                    Signature
                </Typography>
                <div className="relative cursor-pointer h-40 flex justify-center items-center ">
                    <SignatureCanvas
                        penColor="black"
                        ref={ref}
                        canvasProps={{
                            className:
                                'bg-[#F0F0F0] w-full h-full rounded-[5px] shadow-profiles',
                            id: 'sigCanvas',
                        }}
                    />
                    {ref?.current?.isEmpty() ? (
                        <div className="absolute w-full h-full top-1/2 left-1/2">
                            Sign here...
                        </div>
                    ) : null}
                </div>

                <div className="flex justify-center gap-3 mt-1.5">
                    <Button onClick={onClear} variant="secondary">
                        Clear
                    </Button>
                    <Button onClick={onSubmitSign} variant="info">
                        Add
                    </Button>
                </div>
            </div>
        )
    }
)

LogbookSignature.displayName = 'LogbookSignature'
