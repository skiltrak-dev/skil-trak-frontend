import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { MailsCommunication } from '@partials/common/StudentProfileDetail/components'
import { Student } from '@types'
import { CallLogTab, QuickActions } from './components'

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
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-slate-900">
                                Communication History
                            </h3>
                            <p className="text-sm text-slate-600">
                                View and manage all communications
                            </p>
                        </div>
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
                    <div>
                        <MailsCommunication user={student} />
                    </div>
                </TabsContent>

                {/* Call History Tab */}
                <TabsContent value="calls">
                    <CallLogTab studentId={student?.id} />
                </TabsContent>
            </Tabs>
        </div>
    )
}
