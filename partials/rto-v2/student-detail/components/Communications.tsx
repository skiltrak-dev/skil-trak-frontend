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

export function Communications() {
    return (
        <div className="space-y-6">
            {/* Quick Actions Bar */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button
                        variant="primaryNew"
                        text="Send Email"
                        Icon={Mail}
                        className="h-auto py-4"
                    />
                    <Button
                        variant="primaryNew"
                        text="Send SMS"
                        Icon={MessageSquare}
                        className="h-auto py-4"
                    />
                    <Button
                        variant="info"
                        text="Make Call"
                        Icon={Phone}
                        className="h-auto py-4"
                    />
                    <Button
                        variant="primaryNew"
                        outline
                        text="Video Meeting"
                        Icon={Video}
                        className="h-auto py-4"
                    />
                </div>
            </div>

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
                        <TabsTrigger value="compose">Compose New</TabsTrigger>
                    </TabsList>
                </div>

                {/* Messages Tab */}
                <TabsContent value="messages" className="space-y-4">
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
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Date
                                        </th>
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Time
                                        </th>
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Contact
                                        </th>
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Duration
                                        </th>
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Type
                                        </th>
                                        <th className="text-left py-3 px-4 text-slate-900">
                                            Outcome
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {callHistory.map((call, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >
                                            <td className="py-4 px-4 text-slate-700">
                                                {call.date}
                                            </td>
                                            <td className="py-4 px-4 text-slate-600">
                                                {call.time}
                                            </td>
                                            <td className="py-4 px-4 text-slate-900">
                                                {call.with}
                                            </td>
                                            <td className="py-4 px-4 text-slate-600">
                                                {call.duration}
                                            </td>
                                            <td className="py-4 px-4">
                                                <Badge
                                                    variant={
                                                        call.type === 'Incoming'
                                                            ? 'success'
                                                            : 'info'
                                                    }
                                                    text={call.type}
                                                    outline
                                                />
                                            </td>
                                            <td className="py-4 px-4 text-slate-600">
                                                {call.outcome}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                {/* Compose Tab */}
                <TabsContent value="compose">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                        <h4 className="text-slate-900 mb-6">
                            Compose New Message
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                    Recipient
                                </label>
                                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]">
                                    <option>Select recipient...</option>
                                    <option>
                                        Sarah Mitchell - Workplace Supervisor
                                    </option>
                                    <option>Daniel - ITEC Coordinator</option>
                                    <option>Hale Foundation HR</option>
                                    <option>Training Department</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter subject..."
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#044866]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-slate-700 mb-2">
                                    Message
                                </label>
                                <TextArea
                                    name="message"
                                    placeholder="Type your message here..."
                                    className="min-h-[200px]"
                                />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                <Button
                                    variant="secondary"
                                    outline
                                    text="Attach File"
                                    Icon={Paperclip}
                                />
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        outline
                                        text="Save Draft"
                                    />
                                    <Button
                                        variant="primaryNew"
                                        text="Send Message"
                                        Icon={Send}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
