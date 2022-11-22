import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
//Types
import { NextPageWithLayout } from '@types'
// components
import { Button, HelpQuestionSet, ReactTable, Typography } from '@components'
// Link
import Link from 'next/link'
import Image from 'next/image'

// query
import { useGetRtoMOUListQuery } from '@queries'
import { RTOMOUDetail } from '@components/sections'

type Props = {}

const MouDetail: NextPageWithLayout = (props: Props) => {
  return (
    <>
      <RTOMOUDetail />
    </>
  )
}
MouDetail.getLayout = (page: ReactElement) => {
  return <RtoLayout title="MoUs">{page}</RtoLayout>
}

export default MouDetail
