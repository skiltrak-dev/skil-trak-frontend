import {
    Badge,
    Button,
    LoadingAnimation,
    NoData,
    Typography,
} from '@components'
import { CommonApi } from '@queries'
import { Student } from '@types'
import { Mail, MessageSquare, Phone } from 'lucide-react'
import moment from 'moment'
import { MessageReplies } from './MessageReplies'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { ReactElement, useState } from 'react'
import { ComposeEmailModal } from '../modal'

export const StudentEmailMessages = ({ student }: { student: Student }) => {
    const [isExpanded, setisExpanded] = useState<number>(-1)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const toggleReplies = (communicationId: number) => {
        setisExpanded(isExpanded === communicationId ? -1 : communicationId)
    }

    const communications = CommonApi.AllCommunication.useCommunications(
        {
            id: student?.user?.id,
            params: {
                type: 'emails',
            },
        },
        {
            skip: !student?.user?.id,
        }
    )

    const onCancelClicked = () => setModal(null)

    const onComposeMailClicked = (parentId?: number) => {
        setModal(
            <ComposeEmailModal
                onCancel={onCancelClicked}
                user={student?.user}
                parentId={parentId}
            />
        )
    }

    return (
        <div>
            {modal}{' '}
            {communications?.isError ? (
                <NoData isError text="There is some technical error!" />
            ) : null}
            {communications?.isLoading ? (
                <div className="flex justify-center py-10">
                    <LoadingAnimation />
                </div>
            ) : communications?.isSuccess &&
              communications?.data?.data &&
              communications?.data?.data?.length > 0 ? (
                <div className="space-y-3">
                    {communications?.data?.data?.map((communication: any) => (
                        <Collapsible
                            open={isExpanded === communication?.id}
                            onOpenChange={() =>
                                toggleReplies(communication?.id)
                            }
                        >
                            <div
                                key={communication.id}
                                className={`bg-white rounded-xl border shadow-sm p-3 transition-all hover:shadow-md ${
                                    !communication.read
                                        ? 'border-[#F7A619] bg-[#F7A619]/5'
                                        : 'border-slate-200'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-4 flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#044866]/10`}
                                        >
                                            <Mail
                                                className={`w-5 h-5 text-[#044866]`}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="label"
                                                    className="text-slate-900"
                                                >
                                                    {
                                                        communication?.sender
                                                            ?.name
                                                    }
                                                </Typography>
                                                <Badge
                                                    variant="secondary"
                                                    text={
                                                        communication?.sender
                                                            ?.role
                                                    }
                                                    className="text-xs"
                                                />
                                            </div>
                                            <p className="text-slate-900">
                                                {communication.subject}
                                            </p>
                                            <p
                                                className="text-slate-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: communication?.message,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right ml-4">
                                        <p className="text-sm text-slate-500">
                                            {moment(
                                                communication?.createdAt
                                            ).format('DD MMM, YYYY HH:mm a')}
                                        </p>
                                        <Badge
                                            variant="secondary"
                                            text={
                                                communication?.type?.toUpperCase() ||
                                                '---'
                                            }
                                            className="mt-2 text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-100">
                                    <Button
                                        variant="primaryNew"
                                        outline
                                        text="Reply"
                                        Icon={MessageSquare}
                                        onClick={() =>
                                            onComposeMailClicked(
                                                communication?.id
                                            )
                                        }
                                        className="rounded-none"
                                    />

                                    {communication?.replies &&
                                        communication?.replies?.length > 0 && (
                                            <CollapsibleTrigger asChild>
                                                <Button
                                                    variant="primaryNew"
                                                    outline
                                                    text="View Replies"
                                                    Icon={MessageSquare}
                                                    className="rounded-none"
                                                />
                                            </CollapsibleTrigger>
                                        )}
                                </div>{' '}
                                <CollapsibleContent>
                                    {/* Replies */}
                                    <MessageReplies
                                        replies={communication?.replies}
                                    />
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    ))}
                </div>
            ) : (
                communications?.isSuccess && (
                    <NoData text="No Call Logs Found!" />
                )
            )}
        </div>
    )
}
