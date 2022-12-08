export const isActiveRoute = (
    path: string,
    router: any,
    prefix: string,
    inverse: boolean = false
) => {
    const currentPath = router.pathname.replace(prefix, '')
    const trimmedPath = path.replace(prefix, '')

    if (!currentPath && !trimmedPath) {
        return true
    }

    if (currentPath && trimmedPath) {
        if (inverse) return currentPath.includes(trimmedPath)
        return trimmedPath.includes(currentPath)
    }
}
