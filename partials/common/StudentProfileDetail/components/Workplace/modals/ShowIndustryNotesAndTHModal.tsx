import {
    Button,
    Checkbox,
    GlobalModal,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification, useWorkplace } from '@hooks'
import { IndustryShiftingHours } from '@partials/common/IndustryProfileDetail/components'
import { ReactElement, useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { IndustryPinnedNotes } from '../components'
import { SelectAppointDateModal } from './SelectAppointDateModal'
import { useAddExistingIndustriesMutation } from '@queries'
import { PlacementOutSIde20KmModal } from './PlacementOutSIde20KmModal'
import { InsuranceDocMisMatchModal } from './InsuranceDocMisMatchModal'
import { calculateDistance } from '@utils'

export const ShowIndustryNotesAndTHModal = ({
    industryUserName,
    onCancel,
    industryUserId,
    workplaceId,
    industryId,
}: {
    industryUserName: string
    industryUserId: number
    industryId: number
    workplaceId: number
    onCancel: (val?: boolean) => void
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isWithoutAppointmentDates, setIsWithoutAppointmentDates] =
        useState<boolean>(false)

    const { notification } = useNotification()
    const {
        workplaceData,
        studentLocation,
        industryLocation,
        setWorkplaceData,
    } = useWorkplace()

    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    const stdLocation = studentLocation?.split(',')?.map((a) => Number(a))
    const indLocation = industryLocation?.split(',')?.map((a) => Number(a))

    const dist = calculateDistance(
        stdLocation?.[0],
        stdLocation?.[1],
        indLocation?.[0],
        indLocation?.[1]
    )

    console.log({ distdistdist: dist })

    console.log({ studentLocation, industryLocation })

    useEffect(() => {
        if (workplaceData?.type === 'docsMismatch') {
            setModal(
                <InsuranceDocMisMatchModal
                    {...workplaceData?.dates}
                    {...{ workplaceId, industryId }}
                    onCancel={() => setModal(null)}
                    industryName={industryUserName}
                    rtoName={workplaceData?.rtoName}
                    missingDocuments={workplaceData?.missingDocuments}
                />
            )
            setWorkplaceData(null)
        }
        if (workplaceData?.type === 'placementOutSide20Km') {
            setModal(
                <PlacementOutSIde20KmModal
                    {...workplaceData?.dates}
                    {...{ workplaceId, industryId }}
                    onCancel={() => setModal(null)}
                    industryName={industryUserName}
                    rtoName={workplaceData?.rtoName}
                    missingDocuments={workplaceData?.missingDocuments}
                />
            )
            setWorkplaceData(null)
        }
    }, [workplaceData])

    const onCancelClicked = () => setModal(null)

    const onApply = async () => {
        if (dist <= 20) {
            const res: any = await addExistingIndustry({
                workplaceId,
                industryId,
            })
            if (res?.data) {
                notification.success({
                    title: 'Industry Added Successfully',
                    description: 'Industry Added Successfully',
                })

                onCancel()
            }

            if (res?.error?.data?.message === 'limitExceed') {
                setWorkplaceData({
                    name: industryUserName,
                    type: 'limitExceed',
                })
            }
            if (res?.error?.data?.message === 'docsMismatch') {
                setWorkplaceData({
                    type: 'docsMismatch',
                    rtoName: res?.error?.data?.rtoName,
                    missingDocuments: res?.error?.data?.missingDocuments,
                })
            }
            console.log({ res })
        } else {
            setWorkplaceData({
                type: 'placementOutSide20Km',
            })
        }
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <GlobalModal>
                <div className="relative w-full lg:max-w-5xl h-full p-2">
                    <MdCancel
                        onClick={() => {
                            onCancel()
                        }}
                        className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                    <div className="py-2 border-b">
                        <Typography bold>{industryUserName}</Typography>
                    </div>
                    <div className="grid grid-cols-5 divide-x-2 h-[380px] overflow-auto custom-scrollbar">
                        <div className="col-span-3">
                            <IndustryShiftingHours
                                showTitle={false}
                                industryUserId={industryUserId}
                            />
                        </div>
                        <div className="col-span-2">
                            <IndustryPinnedNotes
                                industryUserId={industryUserId}
                            />
                        </div>
                    </div>

                    {/*  */}
                    <div className="py-3 flex flex-col gap-y-2">
                        <Checkbox
                            name="check"
                            onChange={(e: any) => {
                                setIsChecked(e?.target?.checked)
                            }}
                            label={
                                <>
                                    I hereby confirm that I have thoroughly
                                    reviewed and understood all pinned notes and
                                    the official trading hours of{' '}
                                    <strong>{industryUserName}</strong>.
                                </>
                            }
                            showError={false}
                        />
                        <Checkbox
                            name="appointmentDates"
                            onChange={(e: any) => {
                                setIsWithoutAppointmentDates(e?.target?.checked)
                            }}
                            label={<>Continue without appointment dates</>}
                            showError={false}
                        />
                        <div className={'flex items-center gap-x-4  '}>
                            <Button
                                text="Cancel"
                                variant="error"
                                onClick={() => {
                                    onCancel()
                                }}
                            />

                            <Button
                                text={'Proceed'}
                                variant="success"
                                onClick={() => {
                                    if (isWithoutAppointmentDates) {
                                        onApply()
                                    } else {
                                        setModal(
                                            <SelectAppointDateModal
                                                dist={dist}
                                                onCancel={onCancelClicked}
                                                industryId={industryId}
                                                industryUserName={
                                                    industryUserName
                                                }
                                                workplaceId={workplaceId}
                                            />
                                        )
                                    }
                                }}
                                loading={addExistingIndustryResult?.isLoading}
                                disabled={
                                    addExistingIndustryResult?.isLoading ||
                                    !isChecked
                                }
                            />
                        </div>
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
