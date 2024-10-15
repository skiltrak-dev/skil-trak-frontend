import { Badge, TextInput, Typography } from '@components'
import { useJsApiLoader } from '@react-google-maps/api'
import { addDays } from 'date-fns'
import { useState } from 'react'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { AiTwotoneGift } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
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
    const [searchPlace, setSearchPlace] = useState<string>('')

    // const getSearchPlaces =
    //     CommonApi.SearchPlaces.useGetSerchedPlaces(searchPlace)

    const onPlaceSelected = (place: any) => {}

    return (
        <>
            <Badge loading text="Saad" />
            {[...Array(10)].map((_, i) => (
                <div key={i}>
                    <Skeleton
                        baseColor="#000000"
                        className="min-w-[320px] min-h-[200px] rounded-lg"
                    />
                </div>
            ))}

            <TextInput
                name={'month'}
                label={'Set Months'}
                onChange={(e: any) => {
                    setSearchPlace(e.target.value)
                }}
            />
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
