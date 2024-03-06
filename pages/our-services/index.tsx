import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { LatestUpdates, OurServices } from '@partials/frontPages'

const OurservicesPage = () => {
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
