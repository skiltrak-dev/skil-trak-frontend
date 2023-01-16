import { Card, InitialAvatar, InitialAvatarContainer, NoData } from '@components'
import Image from 'next/image'
import React from 'react'
import { FaSchool } from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'
import { SubAdmin } from '@types'
type Props = {
  data: any
}

export const MyRtoCard = ({ data }: Props) => {
  return (
    <>
      <Card>
        {/* Card Header */}
        <div className="flex justify-between items-center">
          {/* Icon Title */}
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex justify-center items-center">
              <FaSchool size={16} />
            </div>
            <p className="text-sm font-semibold">My RTO</p>
          </div>

          {/* Action */}
          {/* <Link legacyBehavior href="#">
                            <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
                                See Details
                            </a>
                        </Link> */}
        </div>

        {/* Card Body */}
        {data?.rto ? (
          <div className="flex items-center gap-x-6 py-4">
            <div className="flex-shrink-0">
              {data?.rto?.user.avatar ? (
                <Image
                  src={data?.rto?.user.avatar}
                  width={100}
                  height={100}
                  alt=""
                  className="rounded-full shadow-inner-image"
                />
              ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                  <span className="text-4xl text-gray-300">
                    <FaSchool />
                  </span>
                </div>
              )}
            </div>
            <div>
              <div>
                <p className="font-medium">
                  {data?.rto?.user?.name}
                </p>
                <p className="text-slate-400 text-sm">
                  {data?.rto?.user?.email}
                </p>
              </div>
              <div className="flex gap-x-6 mt-1">
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-400">
                    <MdPermContactCalendar size={14} />
                  </span>
                  <span className="text-xs">
                    Not Provided
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-400">
                    <MdPhone size={14} />
                  </span>
                  <span className="text-xs">
                    {data?.rto?.phone}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] text-gray-400">
                  Coordinators
                </p>
                <div className="flex justify-between gap-x-2">
                  {data?.rto?.subadmin?.length && (
                    <div>
                      <p className="font-medium text-sm">
                        {
                          data?.rto?.subadmin[0]?.user
                            ?.name
                        }
                      </p>
                      <p className="text-xs font-medium text-slate-400">
                        {
                          data?.rto?.subadmin[0]?.user
                            ?.email
                        }
                      </p>
                    </div>
                  )}

                  {data?.rto?.subadmin.slice(
                    1,
                    data?.rto?.subadmin?.length
                  ).length > 0 && (
                      <InitialAvatarContainer show={2}>
                        {data?.rto.subadmin
                          .slice(
                            1,
                            data?.rto?.subadmin.length
                          )
                          .map(
                            (
                              subAdmin: SubAdmin,
                              idx: number
                            ) => (
                              <InitialAvatar
                                key={subAdmin.id}
                                name={
                                  subAdmin.user
                                    .name
                                }
                                first={idx === 0}
                              />
                            )
                          )}
                      </InitialAvatarContainer>
                    )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <NoData text="No RTO Assigned" />
          </div>
        )}
      </Card>
    </>
  )
}
