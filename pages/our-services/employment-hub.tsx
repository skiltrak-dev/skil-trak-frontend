import { Footer4 } from '@components/site'
import { Navbar2 } from '@components/site/navbar'
import { useHeaderWrapperTitle } from '@hooks'
import { EmploymentHub } from '@partials/frontPages'
import { useEffect } from 'react'

const EmploymentHubPage = () => {
    const { setTitle } = useHeaderWrapperTitle()

    useEffect(() => {
        setTitle('Employment Hub')
        return () => setTitle('')
    }, [])

    return (
        <div>
            <Navbar2 />
            <EmploymentHub />
            <Footer4 />
        </div>
    )
}

export default EmploymentHubPage
