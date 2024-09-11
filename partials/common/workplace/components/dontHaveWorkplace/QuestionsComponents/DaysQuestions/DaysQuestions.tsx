import { TextInput, Typography } from '@components'
import React, { useEffect, useState } from 'react'
import { fromAddress, geocode, GeocodeOptions, setKey } from 'react-geocode'
import { weekdaysShort } from 'moment'
import { useFormContext } from 'react-hook-form'
import { workplaceQuestions } from '../../questionListData'
import { WeekDays } from './WeekDays'

export const DaysQuestions = ({
    ques,
    index,
    textTypeLength,
}: {
    ques: any
    index: number
    textTypeLength: number
}) => {
    const formMethods = useFormContext()

    const [selectedQuestion, setSelectedQuestion] = useState<string>('')

    useEffect(() => {
        setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)
    }, [])

    return (
        <>
            <div
                className={`${
                    ques?.fullWidth ? 'col-span-2' : ''
                } flex flex-col gap-y-1`}
            >
                <div>
                    <Typography variant="label" semibold block>
                        {ques?.index}. {ques?.title}
                    </Typography>

                    <Typography variant="label" block>
                        {
                            workplaceQuestions[
                                ques?.name as keyof typeof workplaceQuestions
                            ]
                        }
                    </Typography>
                </div>
                {ques?.inputValues && ques?.inputValues?.length > 0 ? (
                    <div
                        className={`grid grid-cols-1 ${
                            ques?.inputValues?.length > 1
                                ? 'lg:grid-cols-2'
                                : 'lg:grid-cols-1'
                        }  gap-3`}
                    >
                        {ques?.inputValues?.map((inp: any) => (
                            <div className="mt-1">
                                <Typography variant="label" medium>
                                    {inp?.label}
                                </Typography>
                                <WeekDays
                                    onClick={(day: string) => {
                                        formMethods.setValue(inp?.name, day)
                                    }}
                                />
                            </div>
                        ))}
                        {/* {ques?.inputValues?.map((inp: any) => (
                            <TextInput
                                name={inp?.name}
                                label={inp?.label}
                                placeholder={inp?.placeholder}
                                required
                                type={inp?.type as any}
                                placesSuggetions={inp?.name === 'suburb'}
                                onChange={(e: any) => {
                                    if (inp?.name === 'suburb') {
                                        if (e?.target?.value?.length > 4) {
                                            fromAddress(e?.target?.value)
                                                .then(({ results }: any) => {
                                                    const { lat, lng } =
                                                        results[0].geometry
                                                            .location
                                                    geocode(
                                                        'latlng',
                                                        `${lat},${lng}`,
                                                        {
                                                            key: process.env
                                                                .NEXT_PUBLIC_MAP_KEY,
                                                        } as GeocodeOptions
                                                    )
                                                        .then((response) => {
                                                            const addressComponents =
                                                                response
                                                                    .results[0]
                                                                    .address_components

                                                            for (let component of addressComponents) {
                                                                if (
                                                                    component.types.includes(
                                                                        'postal_code'
                                                                    )
                                                                ) {
                                                                    formMethods.setValue(
                                                                        'zip',
                                                                        component.long_name
                                                                    )

                                                                    break
                                                                }
                                                            }
                                                        })
                                                        .catch((error) => {
                                                            console.error({
                                                                error,
                                                            })
                                                        })
                                                })
                                                .catch(console.error)
                                        }
                                    }
                                }}
                            />
                        ))} */}
                    </div>
                ) : null}
            </div>
            {textTypeLength % 2 === 1 && index === textTypeLength - 1 ? (
                <div />
            ) : null}
        </>
    )
}
