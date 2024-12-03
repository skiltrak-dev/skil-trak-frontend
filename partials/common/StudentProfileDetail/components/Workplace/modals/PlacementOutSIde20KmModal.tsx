import {
    Button,
    GlobalModal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { useNotification, useWorkplace } from '@hooks'
import { useAddExistingIndustriesMutation, SubAdminApi } from '@queries'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { WorkplaceRequestWarningEnum } from '../enum'

export const PlacementOutSIde20KmModal = ({
    date1,
    date2,
    onCancel,
    industryId,
    workplaceId,
}: {
    date1: string
    date2: string
    industryId: number
    workplaceId: number
    onCancel: () => void
}) => {
    const [note, setNote] = useState('')

    const { notification } = useNotification()

    const { setWorkplaceData } = useWorkplace()

    const noteData = SubAdminApi.Workplace.placementAndInsuranceDocNote(
        {
            industryId,
            workplaceId,
            type: WorkplaceRequestWarningEnum.OutSideRadiusPlacement,
        },
        { skip: !industryId || !workplaceId }
    )
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

    useEffect(() => {
        if (noteData?.isSuccess && noteData?.data?.comment) {
            setNote(noteData?.data?.comment)
        }
    }, [noteData])

    const onApply = async () => {
        if (!note) {
            notification.error({
                title: 'Note is Required!',
                description: ' ',
            })
            return
        }
        const res: any = await addExistingIndustry({
            date1,
            date2,
            industryId,
            workplaceId,
            comment: note,
            type: WorkplaceRequestWarningEnum.OutSideRadiusPlacement,
        })
        if (res?.data) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })

            onCancel()
        }

        if (res?.error?.data?.message === 'docsMismatch') {
            setWorkplaceData({
                type: 'docsMismatch',
                dates: { date1, date2 },
                rtoName: res?.error?.data?.rtoName,
                missingDocuments: res?.error?.data?.missingDocuments,
            })
        }

        console.log({ res })
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-32">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <Image
                            src={'/images/workplace/map-location.png'}
                            alt={''}
                            width={81}
                            height={81}
                        />
                        <div className="mx-auto ">
                            <Typography variant="h4" center semibold>
                                Placement Outside 20 Km Radius
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                You are placing this student outside a 20 km
                                radius from their current location. Are you sure
                                you want to proceed with this placement?
                            </span>
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="mt-4">
                        <Typography variant="label" block center semibold>
                            If you want to proceed, please provide additional
                            Note regarding this placement.
                        </Typography>

                        {/*  */}
                        <div className="mt-2.5">
                            <Typography variant="label" block center medium>
                                Note
                            </Typography>
                            <TextArea
                                rows={3}
                                value={note}
                                name={'note'}
                                showError={false}
                                onChange={(e: any) => setNote(e?.target?.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-3 mt-5 mb-4">
                        <Button
                            text="Proceed"
                            onClick={() => {
                                onApply()
                            }}
                            loading={addExistingIndustryResult?.isLoading}
                            disabled={addExistingIndustryResult?.isLoading}
                        />
                        <Button
                            text="Cancel"
                            variant="dark"
                            onClick={() => {
                                onCancel()
                            }}
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
