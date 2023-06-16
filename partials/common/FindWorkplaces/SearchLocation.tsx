import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import { FindWorkplaces } from './FindWorkplaces'
import { Paginate, Typography } from '@components'
import { MapDetail } from './MapDetail'

const libraries = ['places'] as any
export const SearchLocation = () => {
    const inputRef = useRef<any>()
    const [allVisibleIndustries, setAllVisibleIndustries] = useState<any>([])
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [resultList, setResultList] = useState([])
    const [currentItems, setCurrentItems] = useState(Array())
    const [selectedLocation, setSelectedLocation] = useState<any>(null)
    // const handlePlaceChanged = () => {
    //     const [place] = inputRef.current.getPlaces()
    //     if (place) {
    //         console.log('place>>>', place)
    //         const request = {
    //             location: place.geometry.location,
    //             radius: 1000,
    //             type: 'industry',
    //         }

    //         const service = new window.google.maps.places.PlacesService(
    //             document.createElement('div')
    //         )
    //         service.nearbySearch(request, (results: any, status: any) => {
    //             if (
    //                 status === window.google.maps.places.PlacesServiceStatus.OK
    //             ) {
    //                 console.log('results>>>', results)
    //                 setResultList(results)
    //             }
    //         })
    //     }
    // }
    const handlePlaceChanged = () => {
        const [place] = inputRef.current.getPlaces()
        if (place) {
            const request = {
                location: place.geometry.location,
                radius: 1000,
                type: 'industry',
            }

            const service = new window.google.maps.places.PlacesService(
                document.createElement('div')
            )

            service.nearbySearch(request, (results: any, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    setResultList(results)

                    // Get phone number and email for each result
                    results.forEach((result: any) => {
                        const detailsRequest = {
                            placeId: result.place_id,
                            fields: [
                                'name',
                                'formatted_phone_number',
                                'website',
                                'formatted_address',
                                'email',
                            ],
                        }

                        service.getDetails(
                            detailsRequest,
                            (placeResult: any, detailsStatus) => {
                                if (
                                    detailsStatus ===
                                    window.google.maps.places
                                        .PlacesServiceStatus.OK
                                ) {
                                    console.log(
                                        'Phone number:',
                                        placeResult.formatted_phone_number
                                    )
                                    console.log('Email:', placeResult.email)
                                    // You can store the phone number and email in your desired format or use them as needed
                                } else {
                                    console.log(
                                        'Failed to retrieve details:',
                                        detailsStatus
                                    )
                                }
                            }
                        )
                    })
                } else {
                    console.log('Failed to retrieve nearby places:', status)
                }
            })
        }
    }
    return (
        <>
            <div>
                <LoadScript
                    googleMapsApiKey="AIzaSyCMEGspm5WHyXte3TN4Lfrkcg9DchsbYEk"
                    libraries={libraries}
                    region="AUSTRALIA"
                >
                    <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <>
                            <Typography variant='label' color='text-gray-700'>Search for industry</Typography>
                            <input
                                type="text"
                                className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter Location"
                            />
                        </>
                    </StandaloneSearchBox>
                    <div className="grid grid-flow-col gap-x-8 w-full h-full">
                        <div className="col-span-2">
                            {resultList && resultList?.length > 0 && (
                                <div className='flex items-center justify-between mb-2'>
                                <span className='text-gray-600 text-xs'>results({resultList?.length})</span>
                                    <Paginate
                                        data={resultList}
                                        itemsPerPage={4}
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
                        <div className="col-span-3 w-full h-[28rem]">
                            <MapDetail
                                resultList={resultList}
                                selectedBox={selectedBox}
                                setSelectedBox={setSelectedBox}
                                selectedLocation={selectedLocation}
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
