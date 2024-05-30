import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import { FindWorkplaces } from './FindWorkplaces'
import { Paginate, Select, Typography } from '@components'
import { MapDetail } from './MapDetail'
import { AdminApi } from '@queries'

const libraries = ['places'] as any
export const SearchLocation = () => {
    const inputRef = useRef<any>()
    const [allVisibleIndustries, setAllVisibleIndustries] = useState<any>([])
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [resultList, setResultList] = useState([])
    const [detailList, setDetailList] = useState<any>([])
    const [currentItems, setCurrentItems] = useState(Array())
    const [selectedLocation, setSelectedLocation] = useState<any>(null)
    const [visibleMarkers, setVisibleMarkers] = useState<any[]>([])
    // const [selectedCourse, setSelectedCourse] = useState<any>(null)
    // const handlePlaceChanged = () => {
    //     const [place] = inputRef.current.getPlaces()
    //     const inputElement = document.getElementById(
    //         'searchInput'
    //     ) as HTMLInputElement
    //     const query = inputElement.value
    //     if (place) {
    //         const request = {
    //             query: query,
    //             location: place.geometry.location,
    //             radius: 1000,
    //             type: 'all',
    //         }

    //         const service = new window.google.maps.places.PlacesService(
    //             document.createElement('div')
    //         )
    //         service.textSearch(request, (results: any, status: any) => {
    //             if (
    //                 status === window.google.maps.places.PlacesServiceStatus.OK
    //             ) {
    //                 setResultList(results)
    //             }
    //         })
    //     }
    // }
    // const { data, isLoading, isError } =
    //     AdminApi.Courses.useListQuery(undefined)

    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces()
        const inputElement = document.getElementById(
            'searchInput'
        ) as HTMLInputElement
        const query = inputElement.value

        if (place) {
            const request = {
                query: query,
                location: place.geometry.location,
                radius: 1000,
                type: 'all',
            }

            const service = new window.google.maps.places.PlacesService(
                document.createElement('div')
            )
            service.textSearch(request, (results: any, status: any) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    const detailList: any = []

                    const placeIds = results.map(
                        (result: any) => result.place_id
                    )

                    // Fetch place details for each place ID
                    placeIds.forEach((placeId: string) => {
                        const detailsRequest = {
                            placeId: placeId,
                            fields: [
                                'name',
                                'formatted_address',
                                'formatted_phone_number',
                                'international_phone_number',
                                'current_opening_hours',
                                'opening_hours',
                                'website',
                                'secondary_opening_hours',
                                'price_level',
                                'reviews',
                                'geometry',
                                'photos',
                                'rating',
                                'user_ratings_total',
                                'opening_hours',
                                'url',
                                'types',
                                'plus_code',
                                'vicinity',
                            ],
                        }

                        service.getDetails(
                            detailsRequest,
                            (place: any, status: any) => {
                                if (
                                    status ===
                                    window.google.maps.places
                                        .PlacesServiceStatus.OK
                                ) {
                                    detailList.push(place) // Push the entire place object into the array
                                }

                                // Check if all details have been fetched
                                if (detailList.length === placeIds.length) {
                                    setDetailList(detailList) // Set the array of place details
                                }
                            }
                        )
                    })

                    setResultList(results)
                }
            })
        }
    }

    // const handleInputChange = (e: any) => {
    //     setSelectedCourse(e.target.value)
    // }

    // const handleSelectChange = (selectedOption: any) => {
    //     setSelectedCourse(selectedOption?.label || '')
    // }
    return (
        <>
            <div>
                <LoadScript
                    googleMapsApiKey="AIzaSyCMEGspm5WHyXte3TN4Lfrkcg9DchsbYEk"
                    libraries={libraries}
                    region="AU"
                >
                    <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <>
                            <Typography variant="label" color="text-gray-700">
                                Search for industry
                            </Typography>
                            <input
                                id="searchInput"
                                type="text"
                                className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter Location"
                            />
                        </>
                    </StandaloneSearchBox>
                    <div className="grid grid-cols-8  gap-x-8 w-full h-full">
                        <div className="col-span-4">
                            {visibleMarkers && visibleMarkers?.length > 0 && (
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-600 text-xs">
                                        results({visibleMarkers?.length})
                                    </span>
                                    <Paginate
                                        data={visibleMarkers}
                                        itemsPerPage={5}
                                        setCurrentItems={setCurrentItems}
                                    />
                                </div>
                            )}
                            {currentItems.map((item: any) => (
                                <FindWorkplaces
                                    key={item.place_id}
                                    onClick={(e: any) => {
                                        const { geometry, place_id } = item

                                        setSelectedLocation({
                                            geometry,
                                            place_id,
                                        })
                                        setSelectedBox({
                                            ...item,
                                            position: {
                                                lat: item?.geometry?.location?.lat(),
                                                lng: item?.geometry?.location?.lng(),
                                            },
                                        })
                                    }}
                                    item={item}
                                />
                            ))}
                        </div>

                        <div className="col-span-4 w-full h-[45rem]">
                            <MapDetail
                                resultList={resultList}
                                selectedBox={selectedBox}
                                setSelectedBox={setSelectedBox}
                                selectedLocation={selectedLocation}
                                setVisibleMarkers={setVisibleMarkers}
                                visibleMarkers={visibleMarkers}
                            />
                        </div>
                    </div>
                </LoadScript>
            </div>
            {/* <div className="w-96 h-96">
                <MapDetail
                    resultList={resultList}
                    selectedBox={selectedBox}
                    setSelectedBox={setSelectedBox}
                />
            </div> */}
        </>
    )
}
