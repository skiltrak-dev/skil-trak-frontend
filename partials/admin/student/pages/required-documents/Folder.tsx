import React from 'react'

// Icons
import { MdFolderOpen, MdFolder } from 'react-icons/md'

// components
import { FileView } from './FileView'

// components
import { Typography } from 'components'
import { useContextBar } from 'hooks'

export const Folder = ({ folder, docType }: any) => {
  const Icon = true ? MdFolder : MdFolderOpen
  const { setContent, show } = useContextBar()
  return (
    <div
      className={`flex items-center gap-x-2 cursor-pointer`}
      onClick={() => {
        setContent(<FileView id={folder?.id} docType={docType} />)
        show()
      }}
    >
      <div className="relative">
        <Icon className="text-xl text-info" />
        <span className="absolute top-[5px] left-2 mx-auto text-[9px] text-white ">
          0
        </span>
      </div>
      <Typography variant={'muted'}>{folder?.name}</Typography>
    </div>
  )
}
