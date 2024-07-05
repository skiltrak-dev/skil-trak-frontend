// src/components/MapComponent.tsx
import { Card, Checkbox, Select, TextInput } from '@components'
import { useEffect, useState } from 'react'

//
import { SubAdminApi } from '@queries'
import dynamic from 'next/dynamic'
import { fromAddress, setKey } from 'react-geocode'
const SubAdminDashboardMapDetail = dynamic(
    () => import('./SubAdminDashboardMapDetail')
)
export const SubAdminDashboardMap = ({ sectorsOptions }: any) => {
    // Select fields states
    const [sector, setSector] = useState('')
    const [workplaceType, setWorkplaceType] = useState<string | null>(null)
    const [rto, setRto] = useState('')
    const [suburbLocation, setSuburbLocation] = useState<any>(null)

    const [searchInitiated, setSearchInitiated] = useState(false)
    const [isDelay, setIsDelay] = useState(false)

    const rtosList = SubAdminApi.SubAdmin.useSubAdminRtosForMap()

    const rtoOptions = rtosList?.data?.map((rto: any) => ({
        label: rto?.user?.name,
        value: rto.id,
    }))

    useEffect(() => {
        setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)
        setTimeout(() => {
            setIsDelay(true)
        }, 1000)
    }, [])

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
                    <TextInput
                        label={'Suburb'}
                        name={'suburb'}
                        placeholder={'Suburb...'}
                        validationIcons
                        required
                        placesSuggetions
                        onChange={(e: any) => {
                            if (e?.target?.value?.length > 4) {
                                fromAddress(e?.target?.value)
                                    .then(({ results }: any) => {
                                        const { lat, lng } =
                                            results[0].geometry.location
                                        setSuburbLocation({ lat, lng })
                                    })
                                    .catch(console.error)
                            }
                        }}
                    />
                    <Select
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
                    />
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

            {isDelay ? (
                <div>
                    <SubAdminDashboardMapDetail
                        rto={rto}
                        sector={sector}
                        // location={location}
                        workplaceType={workplaceType}
                        suburbLocation={suburbLocation}
                        searchInitiated={searchInitiated}
                        setSearchInitiated={setSearchInitiated}
                    />
                </div>
            ) : null}
        </div>
    )
}
