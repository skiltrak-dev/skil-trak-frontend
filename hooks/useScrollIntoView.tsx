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

    useEffect(() => {
        const handleScroll = () => {
            if (router.query.scrollId) {
                const { scrollId, ...queryWithoutScrollId } = router.query
                router.replace(
                    {
                        pathname: router.pathname,
                        query: queryWithoutScrollId,
                    },
                    undefined,
                    { shallow: true }
                )
                sessionStorage.removeItem('scrollId')
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [profile, router])

    useEffect(() => {
        const handleScroll = () => {
            // Your scroll logic here

            // Remove scrollId from the router after scrolling
            if (router.query.scrollId) {
                const { scrollId, ...queryWithoutScrollId } = router.query
                router.replace(
                    {
                        pathname: router.pathname,
                        query: queryWithoutScrollId,
                    },
                    undefined,
                    { shallow: true }
                )
                sessionStorage.removeItem('scrollId')
            }
        }

        // Add scroll event listener
        const divElement = document.getElementById('studentScrollId')
        if (divElement) {
            divElement.addEventListener('scroll', handleScroll)

            // Call the scroll handler immediately when the component mounts
            handleScroll()
        }
        // Clean up the event listener when the component unmounts
        return () => {
            divElement && divElement.removeEventListener('scroll', handleScroll)
        }
    }, [profile, router])

    return null
}
