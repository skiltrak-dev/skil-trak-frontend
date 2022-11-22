import { Button } from '@components/buttons'
import React from 'react'
import { AssessmentCourseCard } from '../AssessmentsEvidence'
import { WorkplaceAgreementDetail } from './components'
import { ESignTitleCards } from './ESignTitleCards'

type Props = {}

export const ESignatures = (props: Props) => {
  return (
    <>
      {/* <AssessmentCourseCard /> */}
      <div className="flex gap-x-2">
        <div className="w-[33%]">
          <ESignTitleCards />
        </div>
        <div className="w-[67%]">
          <WorkplaceAgreementDetail />
        </div>
      </div>
      <div className=" mt-3 flex gap-x-2 justify-end">
        <Button variant="error" outline text="Clear Signature" />
        <Button variant="success" text="SUBMIT" />
      </div>
    </>
  )
}
