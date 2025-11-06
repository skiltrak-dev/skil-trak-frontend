import { useState } from 'react'
import {
    Sparkles,
    Send,
    Loader2,
    MessageCircle,
    Ticket,
    FileText,
} from 'lucide-react'
import { Badge, Button, Card, TextArea } from '@components'

interface AIQuestionPanelProps {
    onAskQuestion: (question: string) => void
    isLoading?: boolean
    answer?: string
    onCreateTicket?: () => void
    onAddNote?: () => void
}

const suggestedQuestions = [
    "What's the current status of this student's placement?",
    'Are there any blockers or issues I should know about?',
    'What are the next actions I need to take?',
    'When is their next appointment or shift?',
    'Has the student signed their placement agreement?',
    'Show me recent communications with this student',
]

export function AIQuestionPanel({
    onAskQuestion,
    isLoading,
    answer,
    onCreateTicket,
    onAddNote,
}: AIQuestionPanelProps) {
    const [question, setQuestion] = useState('')

    const handleSubmit = () => {
        if (question.trim()) {
            onAskQuestion(question)
            setQuestion('')
        }
    }

    const handleSuggestedQuestion = (q: string) => {
        setQuestion(q)
        onAskQuestion(q)
    }

    const handleAskAnother = () => {
        setQuestion('')
    }

    return (
        <Card
            noPadding
            className="overflow-hidden rounded-2xl border-2 shadow-xl"
        >
            <div className="p-5 border-b bg-gradient-to-br from-blue-100 via-blue-100 to-blue-100">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primaryNew/10 p-2">
                        <Sparkles className="h-6 w-6 text-primaryNew" />
                    </div>
                    <div>
                        <h3 className="text-xl">Ask AI About This Student</h3>
                        <p className="text-sm text-muted-foreground">
                            Get instant insights about placement status,
                            blockers, and next actions
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6 p-6">
                {/* Suggested Questions */}
                {!answer && (
                    <div className="space-y-3">
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
                                    onClick={() => handleSuggestedQuestion(q)}
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
                        disabled={!question.trim() || isLoading}
                        className="gap-20"
                        fullWidth
                        variant="info"
                    >
                        {isLoading ? (
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
                {answer && (
                    <div className="space-y-4">
                        <div className="space-y-3 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <h4 className="text-primary">AI Answer</h4>
                            </div>
                            <div className="prose prose-sm max-w-none dark:prose-invert">
                                <p className="whitespace-pre-line leading-relaxed">
                                    {answer}
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
                                    <span className="text-sm">Add Note</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}
