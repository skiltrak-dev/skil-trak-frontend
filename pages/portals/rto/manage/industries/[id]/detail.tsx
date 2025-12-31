import { RtoLayoutV2 } from '@layouts'
import { IndustryProfileDetail } from '@partials'
import { Building2 } from 'lucide-react'
import { ReactElement } from 'react'

const IndustryDetailPage = () => {
    return (
        <div>
            {/* <RtoIndustries /> */}
            <IndustryProfileDetail />
        </div>
    )
}

IndustryDetailPage.getLayout = (page: ReactElement) => {
    return (
        <RtoLayoutV2
            titleProps={{
                Icon: Building2,
                title: 'Industries',
                description: 'Manage all your Industries',
            }}
        >
            {page}
        </RtoLayoutV2>
    )
}

export default IndustryDetailPage
