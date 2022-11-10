import { Card } from '@components/cards'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoBriefcase } from 'react-icons/io5'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'

type Props = {}

export const WorkplaceInfoCard = (props: Props) => {
  return (
    <div>
      <Card>
        {/* Card Header */}
        <div className="flex justify-between items-center">
          {/* Icon Title */}
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex justify-center items-center">
              <IoBriefcase size={16} />
            </div>
            <p className="text-sm font-semibold">My Workplace</p>
          </div>

          {/* Action */}
          <div className='flex justify-between gap-x-4'>
            <Link href="#">
              <a className="inline-block uppercase text-xs font-medium bg-green-100 text-green-600 px-4 py-2 rounded">
                See Details
              </a>
            </Link>
            <Link href="#">
            <a className="inline-block uppercase text-xs font-medium bg-gray-100 text-gray-500 px-4 py-2 rounded">
              See Details
            </a>
          </Link>
          </div>
        </div>

        {/* Card Body */}
        <div className="mt-4">
          <div className="flex items-center gap-x-6 mb-4">
            <div className="flex-shrink-0">
              <Image src="" height={100} width={100} />
            </div>
            <div>
              <div>
                <p className="font-medium">
                  Tandoori Fusions Restaurants
                </p>
                <p className="text-slate-400 text-sm">
                  info@tandoori.edu.au
                </p>
              </div>
              <div className="flex gap-x-3 mt-1 border-t pt-2">
                <div className="flex items-center gap-x-1">
                  <span className="text-gray-400">
                    <FaMapMarkerAlt size={14} />
                  </span>
                  <span className="text-xs">
                    221B Baker Street, Sydney, Australia
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-[11px] text-gray-400">
                  Contact Person
                </p>
                <div className="flex justify-between gap-x-4">
                  <div>
                    <p className="font-medium text-sm">
                      Taylor Smith
                    </p>
                    <p className="text-xs font-medium text-slate-400">
                      smith@tandoori.com.au
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-1 border-t pt-2">
            <div className="flex items-center gap-x-1">
              <span className="text-gray-400">
                <MdPermContactCalendar size={14} />
              </span>
              <span className="text-xs">John Smith</span>
            </div>
            <div className="flex items-center gap-x-1">
              <span className="text-gray-400">
                <MdPhone size={14} />
              </span>
              <span className="text-xs">039 6534 100</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
