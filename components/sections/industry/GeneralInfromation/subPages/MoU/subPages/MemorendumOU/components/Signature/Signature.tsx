import React, { useEffect } from 'react'
import SignatureCanvas from 'react-signature-canvas'

// components
import { Typography, Button } from '@components'

import { isBrowser } from '@utils'

export const Signature = ({ sigPad, setSigPad, industryName }: any) => {
  const onClear = () => {
    sigPad.clear()
  }
  return (
    <div className="my-5 w-full max-w-[50%] ml-auto">
      <div className="cursor-pointer h-40 border border-gray flex justify-center items-center ">
        <SignatureCanvas
          penColor="black"
          ref={(ref) => {
            setSigPad(ref)
          }}
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
}
