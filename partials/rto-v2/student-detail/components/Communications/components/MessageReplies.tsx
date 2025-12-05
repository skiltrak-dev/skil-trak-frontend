import { useState } from 'react'
import { ChevronDown, ChevronUp, Reply } from 'lucide-react'
import { InitialAvatar, Typography } from '@components'

interface MessageReply {
    id: number
    subject: string
    message: string
    sender: {
        name: string
        email: string
        avatar?: string
    }
    createdAt: string
    status: string
}

interface RepliesProps {
    replies: MessageReply[]
}

export const MessageReplies = ({ replies }: RepliesProps) => {
    const [isOpen, setIsOpen] = useState(false)

    if (!replies || replies.length === 0) {
        return null
    }

    return (
        <div className="mt-6 border-t border-slate-200 pt-6">
            {/* View Replies Button */}

            {/* Replies List */}
            <div className="space-y-4">
                {replies.map((reply, index) => (
                    <div
                        key={reply.id}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200"
                    >
                        {/* Reply Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 flex-1">
                                {reply.sender.name && (
                                    <InitialAvatar
                                        name={reply.sender.name}
                                        imageUrl={reply.sender.avatar}
                                    />
                                )}
                                <div className="flex-1">
                                    <Typography
                                        variant="label"
                                        bold
                                        color="text-slate-900"
                                    >
                                        {reply.sender.name}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="text-slate-500"
                                    >
                                        {reply.sender.email}
                                    </Typography>
                                </div>
                            </div>

                            {/* Date */}
                            <Typography
                                variant="small"
                                color="text-slate-500"
                                className="ml-2"
                            >
                                {new Date(reply.createdAt).toLocaleDateString(
                                    'en-US',
                                    {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    }
                                )}
                            </Typography>
                        </div>

                        {/* Reply Subject */}
                        {reply.subject && (
                            <div className="mb-2">
                                <Typography
                                    variant="small"
                                    color="text-slate-600"
                                >
                                    <strong>Subject:</strong> {reply.subject}
                                </Typography>
                            </div>
                        )}

                        {/* Reply Message */}
                        <div className="bg-white rounded p-3 mb-3 border border-slate-100">
                            <div
                                className="text-sm text-slate-700 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: reply.message,
                                }}
                            />
                        </div>

                        {/* Reply Status */}
                        <div className="flex items-center gap-2 text-xs">
                            <span
                                className={`px-2 py-1 rounded ${
                                    reply.status === 'deliverd'
                                        ? 'bg-green-100 text-green-700'
                                        : reply.status === 'sent'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-yellow-100 text-yellow-700'
                                }`}
                            >
                                {reply.status.charAt(0).toUpperCase() +
                                    reply.status.slice(1)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
