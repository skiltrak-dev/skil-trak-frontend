import { ReactElement, useEffect } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
//Types
import { NextPageWithLayout } from '@types'
// components
import { Button, HelpQuestionSet, ReactTable, RtoContextBarData, SidebarCalendar, Typography } from '@components'
// Link
import Link from 'next/link'

import Image from 'next/image'
import { useContextBar } from '@hooks'    

// query
import { useGetRtoMOUListQuery } from '@queries'
import { RtoMOUContainer } from '@components/sections'

import { useGetIndustriesListQuery } from '@queries'


type Props = {}

const RtoMoUs: NextPageWithLayout = (props: Props) => {

  const RelatedQuestions = [
    {
      text: `I have a workplace. What next?`,
      link: '#',
    },
    {
      text: `I don't have a workplace. What should I do?`,
      link: '#',
    },
    {
      text: `I want to book an appointment`,
      link: '#',
    },
    {
      text: `I want to look for a job`,
      link: '#',
    },
  ]

  const OtherQuestions = [
    {
      text: `I have a workplace. What next?`,
      link: '#',
    },
    {
      text: `I don't have a workplace. What should I do?`,
      link: '#',
    },
    {
      text: `I want to book an appointment`,
      link: '#',
    },
    {
      text: `I want to look for a job`,
      link: '#',
    },
  ]

  return (
    <>
      <RtoMOUContainer />
      <div className="mt-6 flex justify-between">
        {/* Related Questions */}
        <HelpQuestionSet
          title={'What you want to do here?'}
          questions={RelatedQuestions}
        />

        {/* Other Questions */}
        <HelpQuestionSet
          title={'What else you want to do?'}
          questions={OtherQuestions}
        />
      </div>
    </>
  )
}
RtoMoUs.getLayout = (page: ReactElement) => {
  return <RtoLayout title="MoUs">{page}</RtoLayout>
}

export default RtoMoUs
