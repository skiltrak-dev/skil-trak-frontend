// src/components/MapComponent.tsx
import { Card, Checkbox, Select } from '@components'
import { useState } from 'react'

//
import { useForm } from 'react-hook-form'
import { SuburbInput } from './SuburbInput'
export const SubAdminDashboardMap = ({ sectorsOptions }: any) => {
    const containerStyle = {
        width: '100%',
        height: '389px',
    }

    const center = {
        lat: -37.81374,
        lng: 144.963033,
    }

    // Select fields states
    const [location, setLocation] = useState('')
    const [rto, setRto] = useState('')
    const [sector, setSector] = useState('')
    const [workplaceType, setWorkplaceType] = useState<string | null>(null)

    const [visibleMarkers, setVisibleMarkers] = useState<any>([])
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [searchInitiated, setSearchInitiated] = useState(false)
    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

    // bounds

    // const onBoundChange = useCallback(() => {
    //     if (map) {
    //         const newCenter = map.getCenter()
    //         const newZoom = map.getZoom()
    //         if (newZoom !== undefined && newCenter !== undefined) {
    //             setMapCenter({
    //                 lat: newCenter.lat(),
    //                 lng: newCenter.lng(),
    //             })
    //         }
    //         if (newZoom !== undefined) {
    //             setMapZoom(newZoom)
    //         }
    //     }
    // }, [map])

    const methods = useForm({
        mode: 'all',
    })

    const watchData = methods?.watch()
    console.log({ watchData })
    // useEffect(() => {
    //     console.log({ watchData })
    //     if (watchData?.suburb) {
    //         fromAddress(watchData?.suburb)
    //             .then(({ results }) => {
    //                 const { lat, lng } = results[0].geometry.location
    //                 console.log({
    //                     map,
    //                     lat,
    //                     lng,
    //                     outer: true,
    //                 })
    //                 if (map) {
    //                     console.log({
    //                         map,
    //                         lat,
    //                         lng,
    //                     })
    //                     map.setCenter({ lat, lng })
    //                     map.setZoom(8)
    //                 }
    //                 console.log(lat, lng)
    //             })
    //             .catch(console.error)
    //     }
    // }, [watchData])

    return (
        <div className="w-full flex flex-col gap-y-2.5">
            {/* <FormProvider {...methods}>
                <form className="mt-2 w-full"> */}
            <Card noPadding>
                <div className="grid grid-cols-4 items-center gap-x-2 w-full px-2.5 pt-2.5">
                    {/* <Select
                            name="suburb"
                            options={suburbOptions}
                            label={'Suburb'}
                            loading={
                                suburbsList?.isLoading || suburbsList?.isFetching
                            }
                            onChange={(e: any) => {
                                if (e?.value) {
                                    setLocation(e?.value)
                                    setSearchInitiated(true)
                                } else {
                                    setLocation('')
                                    setSearchInitiated(false)
                                }
                            }}
                            placeholder="Select Suburb"
                        /> */}
                    <SuburbInput />
                    {/* <Select
                        name="rto"
                        options={rtoOptions}
                        label={'RTO'}
                        loading={rtosList?.isLoading || rtosList?.isFetching}
                        onChange={(e: any) => {
                            if (e?.value) {
                                setRto(e?.value)
                                setSearchInitiated(true)
                            } else {
                                setRto('')
                                setSearchInitiated(false)
                            }
                        }}
                        placeholder="Select RTO"
                    /> */}
                    <Select
                        name="sector"
                        options={sectorsOptions}
                        label={'Sector'}
                        onChange={(e: any) => {
                            if (e?.value) {
                                setSector(e.value)
                                setSearchInitiated(true)
                            } else {
                                setSector('')
                                setSearchInitiated(false)
                            }
                        }}
                        placeholder="Select Sector"
                    />
                    {/* <Select
                            name="workplaceType"
                            options={[
                                {
                                    label: 'Placement Started',
                                    value: 'placementStarted',
                                },
                                // {
                                //     label: 'Student Provided',
                                //     value: 'studentProvided',
                                // },
                                {
                                    label: 'Placement Completed',
                                    value: 'completed',
                                },
                                {
                                    label: 'Placement Terminated',
                                    value: 'terminated',
                                },
                                {
                                    label: 'No Workplace',
                                    value: 'nowp',
                                },
                            ]}
                            label={'Workplace Type'}
                            onChange={(e: any) => {
                                if (e?.value) {
                                    setWorkplaceType(e?.value)
                                    setSearchInitiated(true)
                                } else {
                                    setWorkplaceType('')
                                    setSearchInitiated(false)
                                }
                            }}
                            placeholder="Workplace Type"
                        /> */}
                    <div className="pt-4">
                        <Checkbox
                            name="workplaceType"
                            label={'No Workplace'}
                            onChange={(e: any) => {
                                if (e?.target?.checked) {
                                    setWorkplaceType('no')
                                    setSearchInitiated(true)
                                } else {
                                    setWorkplaceType('all')
                                    setSearchInitiated(false)
                                }
                            }}
                        />
                    </div>
                </div>
            </Card>

            {/* </form>
            </FormProvider> */}

            {/* <SubAdminDashboardMapDetail /> */}
        </div>
    )
}
