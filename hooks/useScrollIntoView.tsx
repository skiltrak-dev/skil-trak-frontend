import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const useScrollIntoView = (profile: any) => {
    const router = useRouter()

    console.log({ profile })

    useEffect(() => {
        if (profile && router.query.scrollId) {
            const element = document.getElementById(
                String(router.query.scrollId)
            )
            console.log('element Outer', element, router.query.scrollId)
            if (element) {
                console.log('element', element)
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }
    }, [profile, router])
    return null
}
