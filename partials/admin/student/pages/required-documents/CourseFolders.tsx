import React from 'react'

import { BsExclamation, BsCheck } from 'react-icons/bs'

// components
import { Typography } from 'components'
import { Folder } from './Folder'

export const CourseFolders = () => {
  const even = 2 % 2 === 0
  const Icon = even ? BsExclamation : BsCheck
  return (
    <div className="w-full p-2 rounded-lg border border-secondary-dark overflow-hidden relative">
      {/* <DocsStyle
        bgColor={even ? Colors.error : Colors.success}
        className="absolute top-0 right-0  w-24 h-4/5 "
      >
        <Icon className="absolute top-1 right-1 z-10 text-white text-2xl" />
      </DocsStyle> */}
      <Typography variant={'muted'} color={'gray'}>
        Early Childhood, Education and Care
      </Typography>
      <Typography variant={'label'}>
        <span className="font-bold">CHC50113</span> Diploma of early Childhood,
        Education and Care
      </Typography>

      {/*  */}
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        {[...Array(8)].map((_, i) => (
          <Folder key={i} />
        ))}
      </div>
    </div>
  )
}
