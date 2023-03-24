import { ActionButton, TextInput, Typography } from '@components'
import { addDays } from 'date-fns'
import React, { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { AiTwotoneGift } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import OutsideClickHandler from 'react-outside-click-handler'

const ReactDateRanges = () => {
    const [selectedDate, setSelectedDate] = useState<any>([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ])
    const [months, setMonths] = useState<number>(1)
    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const [isDropDown, setIsDropDown] = useState<boolean>(false)
    return (
        <>
            <div className="relative">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setIsDropDown(false)
                        setMonths(1)
                        setSelectedDate([
                            {
                                startDate: new Date(),
                                endDate: addDays(new Date(), 7),
                                key: 'selection',
                            },
                        ])
                    }}
                >
                    <div
                        onClick={() => {
                            setIsDropDown(!isDropDown)
                        }}
                        className="border flex items-center gap-x-2 px-3 py-1 rounded-md w-48 cursor-pointer"
                    >
                        <AiTwotoneGift />
                        <Typography>1 jan to 31 march</Typography>
                    </div>
                    {isDropDown && (
                        <div className="absolute top-full bg-gray-50 border border-blue-300 p-5 rounded-md shadow-lg">
                            <FaTimes
                                className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                                onClick={() => {
                                    setIsDropDown(false)
                                    setMonths(1)
                                    setSelectedDate([
                                        {
                                            startDate: new Date(),
                                            endDate: addDays(new Date(), 7),
                                            key: 'selection',
                                        },
                                    ])
                                }}
                            />
                            <div className="max-w-sm">
                                <TextInput
                                    tooltip={
                                        'You can add up to 4 month to select the date range uning this input field'
                                    }
                                    name={'month'}
                                    value={months}
                                    label={'Set Months'}
                                    onChange={(e: any) => {
                                        if (e.target.value > 0) {
                                            if (e.target.value < 5) {
                                                setMonths(
                                                    Number(e.target.value)
                                                )
                                            } else {
                                                setMonths((month) => month)
                                            }
                                        } else {
                                            setMonths(1)
                                        }
                                    }}
                                    type={'number'}
                                />
                            </div>
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setSelectedDate([item.selection])
                                }}
                                // showSelectionPreview={true}
                                // moveRangeOnFirstSelection={false}
                                months={months}
                                ranges={selectedDate}
                                direction={'horizontal'}
                            />
                        </div>
                    )}
                </OutsideClickHandler>
            </div>
        </>
    )
}

export default ReactDateRanges
