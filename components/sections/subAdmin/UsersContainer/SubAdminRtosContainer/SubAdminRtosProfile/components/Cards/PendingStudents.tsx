import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import React from 'react'

type PendingStudentsProps = {
  phoneNumber: string
  name: string
  email: string
  imageUrl: string
}

export const PendingStudents = ({
  phoneNumber,
  name,
  email,
  imageUrl,
}: PendingStudentsProps) => {
  return (
    <>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-2">
            <Image
              className="rounded-full w-7 h-7"
              src={imageUrl || ' '}
              alt={''}
              width={50}
              height={50}
            />
            <div>
              <Typography variant={'muted'}>
                {phoneNumber}
              </Typography>
              <Typography variant={'title'} color={'black'}>
                {name}
              </Typography>
              <Typography variant={'muted'} color={'gray'}>
                {email}
              </Typography>
            </div>
          </div>
          <Typography variant={'muted'} color={'gray'}>
            {phoneNumber}
          </Typography>
          <div className="flex gap-x-2 items-center">
            <Button variant={'secondary'}>
              <span className="text-green-500">ACCEPT</span>
            </Button>
            <Button variant={'secondary'}>
              <span className="text-red-500">REJECT</span>
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}
