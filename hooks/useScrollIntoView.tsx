import { useRouter } from 'next/router'
import { useEffect } from 'react'

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

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (profile && router.query.scrollId) {
    //             const { scrollId, ...queryWithoutScrollId } = router.query
    //             router.replace(
    //                 {
    //                     pathname: router.pathname,
    //                     query: queryWithoutScrollId,
    //                 },
    //                 undefined,
    //                 { shallow: true }
    //             )
    //             localStorage.removeItem('scrollId')
    //         }
    //     }

    //     // Add scroll event listener
    //     if (isBrowser()) {
    //         window.addEventListener('scroll', handleScroll)
    //     }

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         if (isBrowser()) {
    //             window.removeEventListener('scroll', handleScroll)
    //         }
    //     }
    // }, [profile, router])

    useEffect(() => {
        const handleScroll = () => {
            // Your scroll logic here

            // Remove scrollId from the router after scrolling
            if (profile && router.query.scrollId) {
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
        console.log({ divElement })
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
