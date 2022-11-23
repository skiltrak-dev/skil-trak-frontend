import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React from 'react'

type Props = {
  setActive: any
  personalInfoData: any
  res: any
}

export const YourIndustry = ({ setActive, personalInfoData, res }: Props) => {
  return (
    <div>
      <Card>
        <Typography variant="h4">
          Your Industry
        </Typography>
        <p>{res?.data?.businessName}</p>
      </Card>
    </div>
  )
}
