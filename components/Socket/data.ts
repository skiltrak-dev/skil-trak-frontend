import { SocketNotificationsEvents } from './enum'

export const socketEventToTagMapping = {
    [SocketNotificationsEvents.NoteAdded]: ['Notes'],
    [SocketNotificationsEvents.EsignReceived]: ['E-Sign'],
    [SocketNotificationsEvents.MouNotification]: ['Mous'],
    [SocketNotificationsEvents.ExpiryReminder]: ['Reminders'],
    [SocketNotificationsEvents.MailNotification]: ['Messages'],
    [SocketNotificationsEvents.TicketNotification]: ['Tickets'],
    [SocketNotificationsEvents.PlacementStarted]: ['Workplace'],
    [SocketNotificationsEvents.FeedBackNotification]: ['Feedback'],
    [SocketNotificationsEvents.AppointmentReminder]: ['Appointments'],
    [SocketNotificationsEvents.EsignCompleted]: ['AssessmentEvidence'],
    [SocketNotificationsEvents.NewStudentAssigned]: ['SubAdminStudents'],
    [SocketNotificationsEvents.WorkplaceApproved]: ['SubAdminWorkplace'],
    [SocketNotificationsEvents.WorkplaceNotification]: ['SubAdminWorkplace'],
    [SocketNotificationsEvents.IndustryApprovedStudent]: ['SubAdminWorkplace'],
    [SocketNotificationsEvents.WorkplaceRequestApproved]: ['SubAdminWorkplace'],
    [SocketNotificationsEvents.StudentUnSnoozed]: [
        'Students',
        'SubAdminStudents',
    ],
    [SocketNotificationsEvents.StudentSnoozed]: [
        'Students',
        'SubAdminStudents',
    ],
    [SocketNotificationsEvents.StudentFlagged]: [
        'Students',
        'SubAdminStudents',
    ],
    [SocketNotificationsEvents.StudentNotContactable]: [
        'Students',
        'SubAdminStudents',
    ],
    [SocketNotificationsEvents.StudentDocumentsCompleted]: [
        'AssessmentEvidence',
    ],
    [SocketNotificationsEvents.NewStudentAdded]: ['Students'],
    [SocketNotificationsEvents.AgreementUploaded]: ['AssessmentEvidence'],
    [SocketNotificationsEvents.WorkplaceOptionsAvailable]: ['Workplace'],
    [SocketNotificationsEvents.StudentScheduleAdded]: ['IndustryWorkplace'],
}
