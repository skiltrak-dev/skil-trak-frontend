import React from 'react'

// components
import { Typography } from '@components'

export const CreateAppointmentCard = ({
  text,
  onClick,
  selected,
  icon,
}: {
  selected: string | null
  text: string
  onClick: Function
  icon?: string | null
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center gap-y-1 border ${
        selected === text ? 'border-info' : 'border-gray-300'
      } rounded-lg px-6 py-3 cursor-pointer`}
      onClick={() => {
        onClick()
      }}
    >
      <img
        className="w-8 h-8"
        src={icon || 'https://picsum.photos/100/100'}
        alt=""
      />
      <Typography variant={'label'} center>
        {text}
      </Typography>
    </div>
  )
}
