import type { NextPage } from 'next'

import { SignUpUtils } from '@utils'
import { AuthLayout } from '@layouts'
import { UserRoles } from '@constants'

import {
  Typography,
  BackButton,
  AuthBreadCrumb,
  StepIndicator,
  IndicatorStep,
} from '@components'

import { StudentSignUpForm } from '@components/forms'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { NotificationTypeForm } from '@partials/admin/student/form'

const FormSteps: IndicatorStep[] = [
  {
    label: 'Account Info',
    visited: true,
  },
  {
    label: 'Notification Type',
    visited: false,
  },
  {
    label: 'Review Info',
    visited: false,
  },
  {
    label: 'Wait For Approval',
    visited: false,
    last: true,
  },
]

const NotificationTypePage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState<IndicatorStep>(FormSteps[1])

  const onSubmit = (values: any) => {
    SignUpUtils.setValuesToStorage({
      ...values,
      role: UserRoles.STUDENT,
      location: '34.1506,73.2013',
    })

  }

  return (
    <AuthLayout type="sign-up">
      <div className="max-w-screen-xl mx-auto my-5 px-2 xl:px-0">
        <BackButton />

        <div>
          <Typography variant={'h3'}>
            Create Your Student Account
          </Typography>
          <AuthBreadCrumb
            breadcrumbs={[
              {
                link: '/auth/signup',
                text: 'Portal Selection',
              },
              {
                link: '#',
                text: 'create account',
                active: false,
              },
              {
                link: '#',
                text: 'Notification Type',
                active: true,
              },
            ]}
          />
        </div>

        <StepIndicator steps={FormSteps} currentStep={currentStep} horizontal />

        {/* <div>
					<div className="flex flex-col lg:flex-row items-center lg:items-start gap-y-6">
						<div className="w-full lg:w-[56%] pb-10 lg:pr-10 border-b lg:border-b-transparent lg:border-r border-secondary-dark">
							<SignUpForm onSubmit={onSubmit} />
						</div>
						<div className="w-full lg:w-[44%] ml-8 flex justify-center sticky top-2/4 -translate-y-2/4">
							<PortalDetail
								text={"Industry"}
								videoUrl={
									"https://www.youtube.com/watch?v=dNuo_OwO6dI"
								}
							/>
						</div>
					</div>
				</div> */}

        <div>
          <div className="w-full pb-10">
            <NotificationTypeForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default NotificationTypePage