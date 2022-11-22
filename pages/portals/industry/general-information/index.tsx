import { ReactElement, useEffect } from 'react'

import { IndustryLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { GeneralInfromationContainer } from '@components/sections/industry/GeneralInfromation'

const GeneralInformation: NextPageWithLayout = () => {
  return (
    <div>
      <GeneralInfromationContainer />
    </div>
  )
}

GeneralInformation.getLayout = (page: ReactElement) => {
  return <IndustryLayout>{page}</IndustryLayout>
}

export default GeneralInformation
