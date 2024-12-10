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
import { useState } from 'react'
import { MdCancel, MdOutlineError } from 'react-icons/md'
import { WorkplaceRequestWarningEnum } from '../enum'

export const InsuranceDocMisMatchModal = ({
    date1,
    date2,
    rtoName,
    onCancel,
    industryId,
    workplaceId,
    industryName,
    missingDocuments,
}: {
    date1: string
    date2: string
    rtoName: string
    industryId: number
    workplaceId: number
    industryName: string
    onCancel: () => void
    missingDocuments: any
}) => {
    const [note, setNote] = useState('')

    const { notification } = useNotification()
    const { setWorkplaceData } = useWorkplace()

    const noteData = SubAdminApi.Workplace.placementAndInsuranceDocNote(
        {
            industryId,
            workplaceId,
            type: WorkplaceRequestWarningEnum.DocMissMatch,
        },
        { skip: !industryId || !workplaceId }
    )
    const [addExistingIndustry, addExistingIndustryResult] =
        useAddExistingIndustriesMutation()

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
            conditionSequence: 3,
            type: WorkplaceRequestWarningEnum.DocMissMatch,
        })
        if (res?.data) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })

            onCancel()
        }
        if (res?.error?.data?.message === 'tradingHoursNotFound') {
            setWorkplaceData({
                type: 'tradingHoursNotFound',
            })
        }
    }
    return (
        <GlobalModal>
            <ShowErrorNotifications result={addExistingIndustryResult} />
            <div className="max-w-4xl px-5 py-6 relative flex flex-col gap-y-2 h-[70vh] lg:h-[400px] xl:h-[500px] 2xl:h-[550px] overflow-auto custom-scrollbar">
                <MdCancel
                    onClick={onCancel}
                    className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
                />
                <div className="lg:px-32">
                    <div className="flex flex-col gap-y-3.5 justify-between items-center">
                        <Image
                            src={'/images/workplace/incomplete.png'}
                            alt={''}
                            width={51}
                            height={51}
                        />
                        <div className="mx-auto ">
                            <Typography variant="h4" center semibold>
                                Insurance Mismatch{' '}
                            </Typography>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                The <span className="font-bold">{rtoName}</span>{' '}
                                insurance and{' '}
                                <span className="font-bold">
                                    {industryName}
                                </span>{' '}
                                insurance do not match.
                            </span>
                        </Typography>
                        <Typography center>
                            <span className="text-[15px] leading-4 text-center">
                                Please verify that both insurance details are
                                correct before applying for the industry for
                                this student. Ensure all information aligns to
                                proceed.
                            </span>
                        </Typography>
                    </div>

                    <div className="flex flex-col gap-y-4 mt-2">
                        <Typography variant="label" block center semibold>
                            Insurance Documents
                        </Typography>

                        <div className="flex flex-col gap-y-2.5">
                            {missingDocuments?.map((docs: any) => (
                                <div
                                    key={docs?.id}
                                    className="border border-[#D9D9D9] rounded bg-[#D9D9D966] px-3.5 py-2.5 flex justify-between items-center"
                                >
                                    <Typography variant="label" center medium>
                                        {docs?.title}
                                    </Typography>
                                    <div className="flex items-center gap-x-7">
                                        <div className="flex items-center gap-x-2.5">
                                            <Typography
                                                variant="label"
                                                center
                                                semibold
                                            >
                                                RTO :{' '}
                                            </Typography>
                                            <Image
                                                src={`/images/workplace/${
                                                    docs?.docNotUploaded
                                                        ? 'insuranceCheckedCancel'
                                                        : 'insuranceChecked'
                                                }.png`}
                                                alt={''}
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                        <div className="flex items-center gap-x-2.5">
                                            <Typography
                                                variant="label"
                                                center
                                                semibold
                                            >
                                                Industry :{' '}
                                            </Typography>
                                            <Image
                                                src={
                                                    '/images/workplace/insuranceChecked.png'
                                                }
                                                alt={''}
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/*  */}
                    <div className="mt-4">
                        <Typography variant="label" block center semibold>
                            If you want to proceed without matching, please
                            provide additional Note.
                        </Typography>

                        {/*  */}
                        <div className="mt-2.5">
                            <Typography variant="label" block center medium>
                                Note
                            </Typography>
                            <TextArea
                                rows={3}
                                name={'note'}
                                showError={false}
                                placeholder="Please Enter Your Note....."
                                onChange={(e: any) => setNote(e?.target?.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-x-5 mt-5 mb-4">
                        <Button
                            text="Proceed"
                            onClick={() => {
                                onApply()
                            }}
                            loading={addExistingIndustryResult?.isLoading}
                            disabled={addExistingIndustryResult?.isLoading}
                        />
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
