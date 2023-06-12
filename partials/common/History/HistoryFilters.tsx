import { Button, Card, Typography } from '@components'
import moment from 'moment'
import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { CalendarStyles } from '@components/Calendar/style'
import Calendar from 'react-calendar'
import { FilterType } from 'pages/portals/sub-admin/history'

export const HistoryFilters = ({
    filterType,
    isCustomRange,
    setFilterType,
    customRangeDate,
    setIsCustomRange,
    setCustomRangeDate,
}: {
    filterType: any
    isCustomRange: any
    setFilterType: any
    customRangeDate: any
    setIsCustomRange: any
    setCustomRangeDate: any
}) => {
    return (
        <div className="flex items-center gap-x-2">
            <Typography>
                <span className="font-semibold">
                    {filterType === FilterType.Today
                        ? 'Today'
                        : filterType === FilterType.Range
                        ? customRangeDate?.startDate &&
                          customRangeDate?.endDate &&
                          `${moment(customRangeDate?.startDate).format(
                              'MMM, DD YYYY'
                          )} - ${moment(customRangeDate?.endDate).format(
                              'MMM, DD YYYY'
                          )}`
                        : filterType === FilterType['7Days']
                        ? 'Last 7 Days'
                        : 'Last 7 Days'}
                </span>
            </Typography>
            <Button
                text={'Today'}
                variant={'action'}
                onClick={() => {
                    setFilterType(FilterType.Today)
                }}
            />
            <Button
                text={'Last 7 Days'}
                variant={'dark'}
                onClick={() => {
                    setFilterType(FilterType['7Days'])
                }}
            />
            <div className="relative">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setIsCustomRange(false)
                    }}
                >
                    <Button
                        text={'Range'}
                        variant={'secondary'}
                        onClick={() => {
                            setFilterType(FilterType.Range)
                            setIsCustomRange(!isCustomRange)
                        }}
                    />

                    {isCustomRange && (
                        <div className="absolute top-full right-0 flex-shrink-0 z-50 min-w-[550px] mt-5">
                            <Card>
                                <div className="flex justify-between w-[inherit]">
                                    <CalendarStyles>
                                        <Calendar
                                            onChange={(e: Date) => {
                                                setCustomRangeDate({
                                                    ...customRangeDate,
                                                    startDate: e,
                                                })
                                            }}
                                            value={customRangeDate?.startDate}
                                        />
                                    </CalendarStyles>
                                    <CalendarStyles>
                                        <Calendar
                                            onChange={(e: Date) => {
                                                setCustomRangeDate({
                                                    ...customRangeDate,
                                                    endDate: e,
                                                })
                                            }}
                                            value={customRangeDate?.endDate}
                                        />
                                    </CalendarStyles>
                                </div>
                            </Card>
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </div>
    )
}
