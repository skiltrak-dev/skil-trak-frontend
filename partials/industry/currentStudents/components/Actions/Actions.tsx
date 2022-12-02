import moment from 'moment'

// components
import { Button, Typography } from '@components'

// query
import { useWorkplaceActionsMutation, useSignAgreementMutation } from '@queries'
import { useState } from 'react'
import { ChangeStatusAction } from './components'

export const Actions = ({ workplace, industry }: any) => {
    //  query
    const [workplaceActions, workplaceActionsResult] =
        useWorkplaceActionsMutation()
    const [signAgreement, signAgreementResult] = useSignAgreementMutation()

    return (
        <div className="flex items-center gap-x-2">
            {industry?.industryResponse === 'approved' ? (
                !industry?.terminated &&
                !industry?.isCompleted &&
                !industry?.cancelled &&
                !industry.AgreementSigned ? (
                    <>
                        <Typography variant={'xs'} color={'text-success'}>
                            Student was APPROVED on{' '}
                            {moment(industry?.industryResponseDate).format(
                                'Do MMM, YYYY'
                            )}
                        </Typography>
                        {!industry.AgreementSigned && (
                            <Button
                                variant={'primary'}
                                text={'Sign Agreement'}
                                onClick={() => {
                                    signAgreement(industry.id)
                                }}
                                loading={signAgreementResult?.isLoading}
                                disabled={signAgreementResult?.isLoading}
                            />
                        )}
                        <Button variant={'dark'} text={'ADD SCHEDULE'} />
                    </>
                ) : industry?.isCompleted ? (
                    <Typography variant={'small'} color={'text-white'}>
                        <span className="bg-success-dark px-3 py-0.5 rounded-full">
                            COMPLETED
                        </span>
                    </Typography>
                ) : industry?.terminated ? (
                    <Typography variant={'small'} color={'text-white'}>
                        <span className="bg-success-dark px-3 py-0.5 rounded-full">
                            TERMINATED
                        </span>
                    </Typography>
                ) : industry?.cancelled ? (
                    <Typography variant={'small'} color={'text-red-800'}>
                        <span className="bg-secondary px-3 py-0.5 rounded-full">
                            CANCELLED
                        </span>
                    </Typography>
                ) : (
                    <>
                        <ChangeStatusAction industry={industry} />
                        <Button variant={'action'}>
                            <span className="text-gray-800">FEEDBACK</span>
                        </Button>
                        <Button variant={'action'}>
                            <span className="text-error">REPORT</span>
                        </Button>
                    </>
                )
            ) : (
                <>
                    <Button text={'Book Appointment'} variant={'info'} />
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            workplaceActions({
                                id: industry.id,
                                status: 'approved',
                            })
                        }}
                        loading={workplaceActionsResult?.isLoading}
                        disabled={workplaceActionsResult?.isLoading}
                    >
                        <span className="text-success">Approve</span>
                    </Button>
                    <Button variant={'secondary'}>
                        <span className="text-error">Reject</span>
                    </Button>
                </>
            )}
        </div>
    )
}
