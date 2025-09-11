'use server'

export const getGoogleDirection = async ({
    studentLocationCoordinates,
    industryLocationCoordinates,
}: {
    studentLocationCoordinates: any
    industryLocationCoordinates: any
}) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${studentLocationCoordinates.latitude},${studentLocationCoordinates.longitude}&destination=${industryLocationCoordinates.latitude},${industryLocationCoordinates.longitude}&mode=transit&key=${process.env.NEXT_PUBLIC_MAP_KEY}`
    )

    return await response.json()
}
