import moment from 'moment'

// components
import { Typography } from '@components'
import { AfterPlacementActions } from './components'

// query
import {
    useAgrementSignMutation,
    useStartPlacementMutation,
    useIndustryResponseMutation,
    useForwardWorkplaceToIndustryMutation,
} from '@queries'
import { Button } from '@components/buttons'

export const Actions = ({ appliedIndustry, workplaceId }: any) => {
    const [forwardToIndustry, forwardToIndustryResult] =
        useForwardWorkplaceToIndustryMutation()
    const [industryResponse, industryResponseResult] =
        useIndustryResponseMutation()
    const [agrementSign, agrementSignResult] = useAgrementSignMutation()
    const [startPlacement, startPlacementResult] = useStartPlacementMutation()

    return (
        <div className="mt-1.5 mb-2.5">
            {appliedIndustry?.industryResponse === 'approved' ? (
                <>
                    {!appliedIndustry.placementStarted && (
                        <div className="flex justify-between">
                            <div className="flex items-center flex-wrap gap-2">
                                {!appliedIndustry?.AgreementSigned && (
                                    <Button
                                        text={'SIGN AGREEMENT'}
                                        variant={'dark'}
                                        onClick={() => {
                                            agrementSign(appliedIndustry?.id)
                                        }}
                                        loading={agrementSignResult.isLoading}
                                        disabled={agrementSignResult.isLoading}
                                    />
                                )}
                                {!appliedIndustry.placementStarted && (
                                    <Button
                                        text={'START PLACEMENT'}
                                        variant={'primary'}
                                        onClick={() => {
                                            startPlacement(appliedIndustry?.id)
                                        }}
                                        loading={startPlacementResult.isLoading}
                                        disabled={
                                            startPlacementResult.isLoading
                                        }
                                    />
                                )}

                                <Button
                                    text={'Book Appointment'}
                                    variant={'info'}
                                />
                            </div>
                            <div className="flex gap-x-1">
                                <Typography variant={'xs'}>
                                    <span className="text-success bg-secondary px-1">
                                        APPROVED
                                    </span>
                                </Typography>
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-500'}
                                >
                                    <span className="whitespace-pre">
                                        5 Days ago
                                    </span>
                                </Typography>
                            </div>
                        </div>
                    )}

                    {/* Placement Started Message */}
                    {appliedIndustry?.placementStarted && (
                        <Typography variant={'xs'} color={'text-success'}>
                            Placement has successfully started at{' '}
                            {moment(
                                appliedIndustry?.placementStartedDate
                            ).format('Do MMM, YYYY')}
                        </Typography>
                    )}

                    {appliedIndustry?.AgreementSigned &&
                        appliedIndustry?.placementStarted &&
                        !appliedIndustry?.isCompleted &&
                        !appliedIndustry?.cancelled &&
                        !appliedIndustry?.terminated && (
                            <AfterPlacementActions
                                appliedIndustry={appliedIndustry}
                            />
                        )}
                    {/* Result */}
                    <div className="mt-2">
                        {(appliedIndustry?.isCompleted ||
                            appliedIndustry?.cancelled ||
                            appliedIndustry?.terminated) && (
                            <Typography
                                variant={'small'}
                                color={'text-gray-700'}
                            >
                                Status of student placement
                            </Typography>
                        )}
                        {appliedIndustry?.isCompleted && (
                            <Button
                                submit
                                variant={'success'}
                                text={
                                    'This Placement was COMPLETED by Sub-Admin/Industry'
                                }
                            />
                        )}

                        {appliedIndustry?.cancelled && (
                            <Button submit variant={'secondary'}>
                                <span className="text-red-800">
                                    This Placement was CANCELLED by
                                    Sub-Admin/Industry
                                </span>
                            </Button>
                        )}

                        {appliedIndustry?.terminated && (
                            <Button
                                submit
                                variant={'error'}
                                text={
                                    'This Placement was TERMINATED by Sub-Admin/Industry'
                                }
                            />
                        )}
                    </div>
                </>
            ) : appliedIndustry?.industryResponse !== 'noResponse' ? (
                <>
                    {appliedIndustry?.awaitingWorkplaceResponse && (
                        <div>
                            <Button
                                text={'NOT RESPONDED'}
                                variant={'dark'}
                                onClick={() => {
                                    industryResponse({
                                        industryId: appliedIndustry?.id,
                                        status: 'noResponse',
                                    })
                                }}
                                loading={industryResponseResult?.isLoading}
                                disabled={industryResponseResult?.isLoading}
                            />
                        </div>
                    )}

                    {!appliedIndustry?.awaitingWorkplaceResponse &&
                        appliedIndustry?.interview && (
                            <div className="mt-1.5 mb-2.5">
                                <Button
                                    text={'FORWARD TO INDUSTRY'}
                                    variant={'dark'}
                                    onClick={() => {
                                        forwardToIndustry({
                                            industryId: appliedIndustry?.id,
                                            id: workplaceId,
                                        })
                                    }}
                                    loading={forwardToIndustryResult?.isLoading}
                                    disabled={
                                        forwardToIndustryResult?.isLoading
                                    }
                                />
                            </div>
                        )}
                </>
            ) : null}
        </div>
    )
}
