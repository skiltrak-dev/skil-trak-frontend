import React from 'react'

// Icons
import { MdFolderOpen, MdFolder } from 'react-icons/md'

// components
import { Typography } from 'components'
import { useContextBar } from 'hooks'

export const Folder = () => {
  const Icon = true ? MdFolder : MdFolderOpen
  return (
    <div
      className={`flex items-center gap-x-2`}
    >
      <div className="relative">
        <Icon className="text-xl text-info" />
        <span className="absolute top-[5px] left-2 mx-auto text-[9px] text-white ">
          0
        </span>
      </div>
      <Typography variant={'muted'}>First Aid</Typography>
    </div>
  )
}
