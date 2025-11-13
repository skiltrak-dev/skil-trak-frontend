import { Button, NoData, ShowErrorNotifications, TextInput } from '@components'
import { RtoV2Api } from '@queries'
import { CheckCircle2, Plus } from 'lucide-react'
import { EligibleWpTypeCard } from './card'
import { useState } from 'react'
import { useNotification } from '@hooks'

export const EligibleWpTypes = ({ courseId }: { courseId: number }) => {
    const [key, setKey] = useState(0)
    const [newEligibleKeyword, setNewEligibleKeyword] = useState('')

    const { notification } = useNotification()

    const { data, isLoading, isError } =
        RtoV2Api.Courses.useCourseWorkplaceTypes(courseId, {
            skip: !courseId,
        })

    const [createRtoWpType, createRtoWpTypeResult] =
        RtoV2Api.Courses.createRtoWpType()

    const onSubmit = async () => {
        const res: any = await createRtoWpType({
            id: courseId,
            name: newEligibleKeyword,
        })

        if (res?.data) {
            notification.success({
                title: 'Type Added',
                description: 'Type Added Successfully',
            })
            setKey((key) => key + 1)
            setNewEligibleKeyword('')
        }
    }

    return (
        <div>
            <ShowErrorNotifications result={createRtoWpTypeResult} />
            <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                </div>
                <h3 className="font-semibold text-base">
                    Eligible Workplace Types
                </h3>
            </div>
            {isError && <NoData isError />}
            {data && data?.length > 0 ? (
                <>
                    <div className="bg-gradient-to-br from-success/5 to-success/10 rounded-xl p-5 border border-success/20">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {data?.map((type: any, index: number) => (
                                <EligibleWpTypeCard
                                    key={type?.id}
                                    type={type}
                                    courseId={courseId}
                                />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <TextInput
                                key={key}
                                name="newEligibleKeyword"
                                value={newEligibleKeyword}
                                onChange={(e: any) =>
                                    setNewEligibleKeyword(e.target.value)
                                }
                                placeholder="Add keyword"
                                className="h-9 flex-1 text-sm bg-background/50"
                                // onKeyDown={(e) => {
                                //     if (e.key === 'Enter') handleAddEligibleKeyword(course.id);
                                // }}
                                showError={false}
                            />
                            <Button
                                variant="primary"
                                Icon={Plus}
                                text="Add Keyword"
                                outline
                                loading={createRtoWpTypeResult?.isLoading}
                                disabled={createRtoWpTypeResult?.isLoading}
                                className="whitespace-pre"
                                onClick={() => onSubmit()}
                            />
                        </div>
                    </div>
                </>
            ) : (
                !isError && <NoData text="No workplace type found" />
            )}
        </div>
    )
}
