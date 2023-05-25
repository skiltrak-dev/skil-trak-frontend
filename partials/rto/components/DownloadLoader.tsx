import { LoadingAnimation, Typography } from '@components'

export const DownloadLoader = () => {
    return (
        <>
            <LoadingAnimation size={100} width="40" height="40" />
            <Typography variant="title" color="text-gray-500">
                Generating Report
            </Typography>
            <Typography variant="subtitle" color="text-gray-300">
                Please wait it may take a while
            </Typography>
        </>
    )
}
