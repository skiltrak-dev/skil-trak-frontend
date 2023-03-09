import React from 'react'
import {
    CircularProgressbarWithChildren,
    buildStyles,
} from 'react-circular-progressbar'

// components
import { Typography } from 'components/Typography'
import { getThemeColors } from '@theme'

// Colors
const colors = getThemeColors()

export const ProfileCompletetionStatus = ({ profile }: any) => {
    console.log('profile', profile)
    // const values = {
    //     name: profile?.user?.name,
    //     email: profile?.user?.email,
    //     familyName: profile?.familyName,
    //     phone: profile?.phone,
    //     rto: profile?.rto,
    //     studentId: profile?.studentId,
    //     dob: profile?.dob,
    //     emergencyPerson: profile?.emergencyPerson,
    //     emergencyPersonPhone: profile?.emergencyPersonPhone,
    //     suburb: profile?.suburb,
    //     state: profile?.state,
    //     zipCode: profile?.zipCode,
    //     addressLine1: profile?.addressLine1,
    //     courses: profile?.courses,
    // }

    const values = { ...profile, ...profile?.user }
    const keys = [
        'name',
        'email',
        'familyName',
        'phone',
        'rto',
        'studentId',
        'dob',
        'emergencyPerson',
        'emergencyPersonPhone',
        'suburb',
        'state',
        'zipCode',
        'addressLine1',
        'courses',
    ]
    // const keys = Object.keys(values)

    let totalValues = keys?.length
    let filledValues = 0
    keys.forEach((key) => {
        const keyValue = values[key as keyof typeof values]
        console.log('values[key as keyof typeof values]', keyValue)
        if (keyValue && keyValue != 'NA' && !Array.isArray(keyValue)) {
            filledValues++
        } else if (Array.isArray(keyValue) && keyValue?.length > 0) {
            filledValues++
        }
    })

    const profileCompletion = Math.floor((filledValues / totalValues) * 100)
    console.log('filledValues', totalValues, filledValues)
    return (
        <>
            <div className="flex justify-center items-center w-full">
                <CircularProgressbarWithChildren
                    value={profileCompletion}
                    styles={buildStyles({
                        pathColor: colors?.primary.DEFAULT,
                        trailColor: colors?.secondary.dark,
                        strokeLinecap: 'butt',
                    })}
                    className="w-full h-[170px]"
                >
                    <Typography variant={'small'}>Profile completed</Typography>
                    <Typography variant={'h4'}>{profileCompletion}%</Typography>
                </CircularProgressbarWithChildren>
            </div>
            {profileCompletion < 100 ? (
                <div className="mt-4">
                    <Typography variant={'subtitle'} center>
                        Complete your profile
                    </Typography>
                </div>
            ) : null}
        </>
    )
}
