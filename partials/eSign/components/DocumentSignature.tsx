import { forwardRef } from 'react'
import SignatureCanvas from 'react-signature-canvas'

// components
import { Button, Typography } from '@components'

export const DocumentSignature = forwardRef(
    ({ industryName }: any, ref: any) => {
        const onClear = () => {
            ref?.current?.clear()
        }
        return (
            <div className="w-full ml-auto">
                <div className="cursor-pointer bg-gr h-40 border rounded-lg overflow-hidden border-gray flex justify-center items-center ">
                    <SignatureCanvas
                        penColor="black"
                        ref={ref}
                        canvasProps={{
                            className: 'w-full h-full bg-gray-100 ',
                            id: 'sigCanvas',
                        }}
                    />
                </div>
            </div>
        )
    }
)
DocumentSignature.displayName = 'DocumentSignature'
