import { Typography } from '@components/Typography'
import React from 'react'
import { BsDot } from 'react-icons/bs'

export const Industries = ({ industries }: any) => {
    return (
        <div>
            <div className="flex justify-between">
                <Typography variant={'xs'} color={'text-gray-400'}>
                    Suggested Industries
                </Typography>
                <Typography variant={'small'} color={'text-info'}>
                    <span className="font-semibold">+ Add Industry</span>
                </Typography>
            </div>

            {/* industries List */}
            <div className="border border-dashed border-gray-400 rounded-lg p-1 flex flex-col gap-y-1">
                {industries && industries.length > 0
                    ? industries.map((industry: any, i: number) => (
                          <div
                              key={i}
                              className="bg-secondary py-1 px-2 rounded-lg flex justify-between items-center"
                          >
                              <div className="flex items-center gap-x-2">
                                  <img
                                      className="w-6 h-6 rounded-full"
                                      src={`https://picsum.photos/100/10${i}`}
                                      alt=""
                                  />
                                  <div>
                                      <div className="flex items-center gap-x-0.5">
                                          <Typography variant={'label'}>
                                              {industry?.industry?.businessName}
                                          </Typography>
                                          <BsDot />
                                          <Typography
                                              variant={'xs'}
                                              color={'text-gray-400'}
                                          >
                                              5km away
                                          </Typography>
                                      </div>
                                      <Typography
                                          variant={'muted'}
                                          color={'gray'}
                                      >
                                          {industry?.industry?.addressLine1},{' '}
                                          {industry?.industry?.addressLine2}
                                      </Typography>
                                  </div>
                              </div>
                              {industry.applied && (
                                  <Typography
                                      variant={'xs'}
                                      color={'text-red-800'}
                                      center
                                  >
                                      APPLIED
                                  </Typography>
                              )}
                          </div>
                      ))
                    : 'No Industry Found'}
            </div>
        </div>
    )
}
