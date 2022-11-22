import { Card } from '@components'
import { Typography } from '@components'
import React from 'react'
import { CourseFolders } from './CourseFolders'

export const RequiredDocs = () => {
  return (
    <div className="">
      <Card>
        <div className="grid grid-cols-2">
          <div className="border-r border-secondary-dark pr-4 flex flex-col gap-y-4">
            <Typography variant={'subtitle'}>Industry Checks</Typography>
            {[...Array(2)].map((_, i) => (
              <CourseFolders key={i} />
            ))}
          </div>
          <div className="pl-4 flex flex-col gap-y-4">
            <Typography variant={'subtitle'}>Assessment Evidence</Typography>
            {[...Array(2)].map((_, i) => (
              <CourseFolders key={i} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
