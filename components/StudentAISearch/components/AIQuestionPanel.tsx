import {
    Badge,
    Button,
    Card,
    GlobalModal,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { CreateStudentNote } from '@partials/common/Notes/forms'
import { CommonApi } from '@queries'
import { Student } from '@types'
import {
    FileText,
    Loader2,
    MessageCircle,
    Send,
    Sparkles,
    Ticket,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

interface AIQuestionPanelProps {
    student: Student
}

const suggestedQuestions = [
    "What's the current status of this student's placement?",
    'Are there any blockers or issues I should know about?',
    'What are the next actions I need to take?',
    'When is their next appointment or shift?',
    'Has the student signed their placement agreement?',
    'Show me recent communications with this student',
]

export function AIQuestionPanel({ student }: AIQuestionPanelProps) {
    const [question, setQuestion] = useState('')
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()

    const [aiAssisstant, aiAssisstantResult] =
        CommonApi.AiAssistant.askAiAboutStudent()

    const onSubmit = async (q: string) => {
        const res: any = await aiAssisstant({
            studentId: student?.id,
            question: q,
        })

        if (res?.data) {
            setQuestion('')
        }
    }

    const handleSubmit = () => {
        if (question.trim()) {
            onSubmit(question)
        }
    }

    const handleSuggestedQuestion = (q: string) => {
        onSubmit(q)
        setQuestion(q)
    }

    const handleAskAnother = () => {
        setQuestion('')
    }

    const onCancel = () => setModal(null)

    const onCreateTicket = () => {
        router.push(`/portals/rto/tickets/add-ticket?student=${student?.id}`)
    }

    const onAddNote = () => {
        setModal(
            <GlobalModal className="!overflow-hidden">
                <div className="!h-[88vh] !overflow-auto !custom-scrollbar">
                    <CreateStudentNote
                        studentId={student?.id}
                        receiverId={Number(student?.user?.id)}
                        onCancel={onCancel}
                    />
                </div>
            </GlobalModal>
        )
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={aiAssisstantResult} />
            <Card
                noPadding
                className="overflow-hidden rounded-2xl border-2 shadow-xl"
            >
                <div className="p-2.5 border-b bg-gradient-to-br from-blue-100 via-blue-100 to-blue-100">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-primaryNew/10 p-2">
                            <Sparkles className="h-4 w-4 text-primaryNew" />
                        </div>
                        <div>
                            <Typography variant="subtitle" semibold>
                                Ask AI About This Student
                            </Typography>
                            <Typography variant="small" color="text-gray-700">
                                Get instant insights about placement status,
                                blockers, and next actions
                            </Typography>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 p-3">
                    {/* Suggested Questions */}
                    {!aiAssisstantResult?.data?.response && (
                        <div className="space-y-1.5">
                            <p className="text-sm text-muted-foreground">
                                Try asking:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((q, idx) => (
                                    <Badge
                                        key={idx}
                                        text={q}
                                        variant="primaryNew"
                                        outline
                                        onClick={() =>
                                            handleSuggestedQuestion(q)
                                        }
                                    ></Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Question Input */}
                    <div className="space">
                        <TextArea
                            name="message"
                            value={question}
                            onChange={(e: any) => setQuestion(e.target.value)}
                            placeholder="Type your question here..."
                            rows={5}
                            // onKeyDown={(e) => {
                            //     if (e.key === 'Enter' && !e.shiftKey) {
                            //         e.preventDefault()
                            //         handleSubmit()
                            //     }
                            // }}
                        />
                        <Button
                            onClick={handleSubmit}
                            disabled={
                                !question.trim() || aiAssisstantResult.isLoading
                            }
                            className="gap-20"
                            fullWidth
                            variant="info"
                        >
                            {aiAssisstantResult?.isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    AI is thinking...
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    Ask AI
                                </>
                            )}
                        </Button>
                    </div>

                    {/* AI Answer */}
                    {aiAssisstantResult?.data?.response && (
                        <div className="space-y-4">
                            <div className="space-y-3 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primaryNew" />
                                    <h4 className="text-primaryNew">
                                        AI Answer
                                    </h4>
                                </div>
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <p className="whitespace-pre-line leading-relaxed">
                                        {aiAssisstantResult?.data?.response}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                    What would you like to do next?
                                </p>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    <Button
                                        variant="secondary"
                                        className="h-auto flex-col gap-2 rounded-xl py-4 transition-all hover:border-primary hover:bg-primary/5"
                                        onClick={handleAskAnother}
                                    >
                                        <MessageCircle className="h-5 w-5 text-primary" />
                                        <span className="text-sm">
                                            Ask Another Question
                                        </span>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="h-auto flex-col gap-2 rounded-xl py-4 transition-all hover:border-primary hover:bg-primary/5"
                                        onClick={onCreateTicket}
                                    >
                                        <Ticket className="h-5 w-5 text-primary" />
                                        <span className="text-sm">
                                            Create Ticket
                                        </span>
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="h-auto flex-col gap-2 rounded-xl py-4 transition-all hover:border-primary hover:bg-primary/5"
                                        onClick={onAddNote}
                                    >
                                        <FileText className="h-5 w-5 text-primary" />
                                        <span className="text-sm">
                                            Add Note
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </>
    )
}
