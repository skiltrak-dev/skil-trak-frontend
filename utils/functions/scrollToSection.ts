export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (!element) return

    // Find the scrollable parent container (the one with overflow-y-scroll)
    let scrollContainer: HTMLElement | null = element.parentElement
    while (scrollContainer) {
        const overflowY = window.getComputedStyle(scrollContainer).overflowY
        if (overflowY === 'scroll' || overflowY === 'auto') {
            break
        }
        scrollContainer = scrollContainer.parentElement
    }

    if (scrollContainer) {
        // Calculate element position relative to the scroll container
        const containerRect = scrollContainer.getBoundingClientRect()
        const elementRect = element.getBoundingClientRect()
        const relativeTop = elementRect.top - containerRect.top
        const scrollOffset = 150 // Offset for sticky headers

        // Scroll the container, not the window
        scrollContainer.scrollTo({
            top: scrollContainer.scrollTop + relativeTop - scrollOffset,
            behavior: 'smooth',
        })
    } else {
        // Fallback to scrollIntoView if no scrollable parent found
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
}
