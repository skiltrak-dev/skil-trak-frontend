import React from 'react'
import Image from 'next/image'
import { SerialNumberProps } from '../types'

export const SerialNumber: React.FC<SerialNumberProps> = ({ row }) => {
    return (
        <span className="text-black font-medium text-sm">
            {row.index === 0 ? (
                <Image
                    src={'/images/kpis/firstcup.svg'}
                    alt="First Cup"
                    width={0}
                    height={0}
                    sizes="100vh 100vw"
                    className="w-8 h-8"
                />
            ) : row.index === 1 ? (
                <Image
                    src={'/images/kpis/silverMedal.svg'}
                    alt="Silver Medal"
                    width={0}
                    height={0}
                    sizes="100vh 100vw"
                    className="w-8 h-8"
                />
            ) : row.index === 2 ? (
                <Image
                    src={'/images/kpis/bronzeMedal.svg'}
                    alt="Bronze Medal"
                    width={0}
                    height={0}
                    sizes="100vh 100vw"
                    className="w-8 h-8"
                />
            ) : row.original.id <= 9 ? (
                '0' + row.original.id
            ) : (
                row.original.id
            )}
        </span>
    )
}
