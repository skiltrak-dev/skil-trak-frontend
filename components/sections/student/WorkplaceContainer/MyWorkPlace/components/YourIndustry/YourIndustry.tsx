import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  setActive: any
  personalInfoData: any
  res: any
}

export const YourIndustry = ({ setActive, personalInfoData, res }: Props) => {
  const router = useRouter()

  return (
    <div>
      <Card>
        <Typography variant="h4">Your Industry</Typography>
        {res?.isSuccess && res?.data?.length > 0 ? (
          <p>{res?.data?.businessName}</p>
        ) : (
          <>
            <p className="mt-2 text-red-400">Industry Not found</p>

          </>
        )}
      </Card>
    </div>
  )
}
