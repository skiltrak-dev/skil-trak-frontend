import React, { useRef, useState } from 'react'
import { StandaloneSearchBox, LoadScript } from '@react-google-maps/api'
import { FindWorkplaces } from './FindWorkplaces'
import { Paginate } from '@components'
import { MapDetail } from './MapDetail'
export const SearchLocation = () => {
    const inputRef = useRef<any>()
    const [allVisibleIndustries, setAllVisibleIndustries] = useState<any>([])
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [resultList, setResultList] = useState([])
    const [currentItems, setCurrentItems] = useState(Array())

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
            console.log('place>>>', place)
            const request = {
                location: place.geometry.location,
                radius: 1000,
                type: 'industry',
            }

            const service = new window.google.maps.places.PlacesService(
                document.createElement('div')
            )
            service.nearbySearch(request, (results:any, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                    console.log('results>>>', results)
                    setResultList(results)

                    // Get phone number and email for each result
                    results.forEach((result:any) => {
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
                            (placeResult:any, detailsStatus) => {
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
                    libraries={['places']}
                    region="AUSTRALIA"
                >
                    <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handlePlaceChanged}
                    >
                        <input
                            type="text"
                            className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter Location"
                        />
                    </StandaloneSearchBox>
                    <div className="flex gap-x-12 w-full h-full">
                        <div>
                            {resultList && resultList?.length > 0 && (
                                <Paginate
                                    data={resultList}
                                    itemsPerPage={3}
                                    setCurrentItems={setCurrentItems}
                                />
                            )}
                            {currentItems.map((item: any) => (
                                <div key={item.place_id}>
                                    <FindWorkplaces
                                        selectedBox={selectedBox}
                                        setSelectedBox={setSelectedBox}
                                        item={item}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="w-[65rem] h-[28rem]">
                            <MapDetail
                                resultList={resultList}
                                selectedBox={selectedBox}
                                setSelectedBox={setSelectedBox}
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
