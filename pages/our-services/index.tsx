import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { useHeaderWrapperTitle } from '@hooks'
import { LatestUpdates, OurServices } from '@partials/frontPages'
import { useEffect } from 'react'

const OurservicesPage = () => {
    const { setTitle } = useHeaderWrapperTitle()
    useEffect(() => {
        setTitle('Our Services')
    }, [])

    return (
        <div>
            <Navbar2 />
            <OurServices />
            <LatestUpdates />
            <Footer4 />
        </div>
    )
}

export default OurservicesPage
