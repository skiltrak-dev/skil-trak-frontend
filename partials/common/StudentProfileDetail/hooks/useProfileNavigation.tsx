import { useEffect, useState } from 'react'
import { ProfileIds } from '../types'

export const useProfileNavigation = (router: any, profile: any) => {
    const [selectedId, setSelectedId] = useState<string>('')
    const [quickSearch, setQuickSearch] = useState<boolean>(false)

    // Auto-clear selected section after 2 seconds
    useEffect(() => {
        let timer: any = null
        if (selectedId) {
            timer = setTimeout(() => {
                setSelectedId('')
            }, 2000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [selectedId])

    // Handle deep linking to specific sections
    useEffect(() => {
        if (
            Object.values(ProfileIds)?.includes(
                router?.query?.sectionId as ProfileIds
            ) &&
            profile?.isSuccess
        ) {
            setSelectedId(router?.query?.sectionId as ProfileIds)
            handleScroll(router?.query?.sectionId as ProfileIds)
        }
    }, [router, profile])

    const handleScroll = (id: string) => {
        const detailItem = document.getElementById(`student-profile-${id}`)
        if (detailItem) {
            detailItem.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handleSectionClick = (value: ProfileIds) => {
        handleScroll(value)
        setQuickSearch(false)
        setSelectedId(value)
    }

    const getActiveBorder = (key: ProfileIds) =>
        selectedId === key ? 'border-2 border-primary rounded-xl' : ''

    return {
        selectedId,
        setSelectedId,
        quickSearch,
        setQuickSearch,
        handleScroll,
        handleSectionClick,
        getActiveBorder,
    }
}
