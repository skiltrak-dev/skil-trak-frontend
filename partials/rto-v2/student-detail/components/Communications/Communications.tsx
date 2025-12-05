import {
    MessageSquare,
    Mail,
    Phone,
    Video,
    Send,
    Calendar,
    Paperclip,
    Filter,
} from 'lucide-react'
import { Button, Badge, TextArea } from '@components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { Student } from '@types'
import { CallLogTab, QuickActions, StudentEmailMessages } from './components'

const messages = [
    {
        id: 1,
        type: 'email',
        from: 'Sarah Mitchell',
        role: 'Workplace Supervisor',
        subject: 'Great progress this week!',
        message:
            "Hi Hema, I wanted to reach out and let you know you're doing an excellent job this week. Your interactions with clients have been professional and caring. Keep up the great work!",
        timestamp: '2 hours ago',
        read: false,
        priority: 'normal',
    },
    {
        id: 2,
        type: 'sms',
        from: 'Daniel',
        role: 'ITEC Coordinator',
        subject: 'Reminder: Document submission',
        message:
            'Hi Hema, gentle reminder to submit your workplace log for this week by Friday. Let me know if you need any help!',
        timestamp: '1 day ago',
        read: true,
        priority: 'high',
    },
    {
        id: 3,
        type: 'email',
        from: 'Training Department',
        role: 'ITEC International',
        subject: 'New training module available',
        message:
            "A new training module 'Advanced Communication Skills' is now available in your learning portal. This will complement your current studies in Individual Support.",
        timestamp: '3 days ago',
        read: true,
        priority: 'normal',
    },
    {
        id: 4,
        type: 'phone',
        from: 'Hale Foundation HR',
        role: 'Workplace',
        subject: 'Call Summary: Orientation Follow-up',
        message:
            'Discussed progress in first month of placement. Reviewed workplace policies and answered questions about rostering. Next check-in scheduled for next week.',
        timestamp: '1 week ago',
        read: true,
        priority: 'normal',
    },
]

const callHistory = [
    {
        date: 'Nov 18, 2025',
        time: '2:30 PM',
        with: 'Sarah Mitchell',
        duration: '12 min',
        type: 'Outgoing',
        outcome: 'Discussed weekly progress',
    },
    {
        date: 'Nov 15, 2025',
        time: '10:15 AM',
        with: 'Daniel',
        duration: '8 min',
        type: 'Incoming',
        outcome: 'Document submission reminder',
    },
    {
        date: 'Nov 12, 2025',
        time: '4:45 PM',
        with: 'Hale Foundation HR',
        duration: '25 min',
        type: 'Incoming',
        outcome: 'Monthly check-in completed',
    },
    {
        date: 'Nov 8, 2025',
        time: '11:00 AM',
        with: 'Sarah Mitchell',
        duration: '15 min',
        type: 'Outgoing',
        outcome: 'Placement questions resolved',
    },
]

export function Communications({ student }: { student: Student }) {
    return (
        <div className="space-y-6 ">
            {/* Quick Actions Bar */}
            <QuickActions student={student} />

            {/* Communications Tabs */}

            <Tabs defaultValue="messages" className="space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-slate-900">
                                Communication History
                            </h3>
                            <p className="text-sm text-slate-600 mt-1">
                                View and manage all communications
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            outline
                            text="Filter"
                            Icon={Filter}
                        />
                    </div>

                    <TabsList className="w-full justify-start bg-slate-100">
                        <TabsTrigger value="messages">
                            Messages & Emails
                        </TabsTrigger>
                        <TabsTrigger value="calls">Call History</TabsTrigger>
                    </TabsList>
                </div>

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-4">
                    <StudentEmailMessages student={student} />
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`bg-white rounded-xl border shadow-sm p-6 transition-all hover:shadow-md ${
                                !msg.read
                                    ? 'border-[#F7A619] bg-[#F7A619]/5'
                                    : 'border-slate-200'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                            msg.type === 'email'
                                                ? 'bg-[#044866]/10'
                                                : msg.type === 'sms'
                                                ? 'bg-[#F7A619]/10'
                                                : 'bg-[#0D5468]/10'
                                        }`}
                                    >
                                        {msg.type === 'email' ? (
                                            <Mail
                                                className={`w-6 h-6 ${
                                                    msg.type === 'email'
                                                        ? 'text-[#044866]'
                                                        : 'text-slate-600'
                                                }`}
                                            />
                                        ) : msg.type === 'sms' ? (
                                            <MessageSquare className="w-6 h-6 text-[#F7A619]" />
                                        ) : (
                                            <Phone className="w-6 h-6 text-[#0D5468]" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-slate-900">
                                                {msg.from}
                                            </h4>
                                            <Badge
                                                variant="secondary"
                                                text={msg.role}
                                                className="text-xs"
                                            />
                                            {!msg.read && (
                                                <Badge
                                                    variant="warning"
                                                    text="Unread"
                                                    className="text-xs"
                                                />
                                            )}
                                            {msg.priority === 'high' && (
                                                <Badge
                                                    variant="error"
                                                    text="High Priority"
                                                    className="text-xs"
                                                />
                                            )}
                                        </div>
                                        <p className="text-slate-900 mb-2">
                                            {msg.subject}
                                        </p>
                                        <p className="text-slate-600 leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right ml-4">
                                    <p className="text-sm text-slate-500">
                                        {msg.timestamp}
                                    </p>
                                    <Badge
                                        variant="secondary"
                                        text={msg.type.toUpperCase()}
                                        className="mt-2 text-xs"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                <Button
                                    variant="primaryNew"
                                    outline
                                    text="Reply"
                                    Icon={MessageSquare}
                                    mini
                                />
                                <Button
                                    variant="secondary"
                                    outline
                                    text="Archive"
                                    mini
                                />
                            </div>
                        </div>
                    ))}
                </TabsContent>

                {/* Call History Tab */}
                <TabsContent value="calls">
                    <CallLogTab studentId={student?.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
