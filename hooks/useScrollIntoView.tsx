import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export const useScrollIntoView = (profile: any) => {
    const router = useRouter()


    useEffect(() => {
        if (profile && router.query.scrollId) {
            const element = document.getElementById(
                String(router.query.scrollId)
            )
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                })
            }
        }
    }, [profile, router])
    return null
}
