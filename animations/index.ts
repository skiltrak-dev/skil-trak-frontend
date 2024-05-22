import noInternetConnection from './common/no-connection.json'
import emptyBox from './common/empty-box.json'
import shakeEmptyBox from './common/shake-empty-box.json'
import loading from './common/loading.json'
import pageNotFound from './common/404.json'
import pageNotFound2 from './common/404-sleeping-cat.json'
import appointmentBox from './common/appointments.json'

import help from './common/help.json'
import help1 from './common/help1.json'

// Actions
import check from './actions/check.json'
import info from './actions/info.json'
import error from './actions/error.json'

// General
import underConstruction from './common/under-construction.json'
import emailSent from './common/email-sent.json'

// Dashboard Animations
import requiredDocuments from './dashboard/required-documents.json'
import requestVolunteer from './dashboard/request-volunteer.json'

// Task Animations
import scheduling from './my-tasks/scheduling.json'
import availableShift from './my-tasks/available-shift.json'

// Job Animations
import advertiseJob from './jobs/advertise.json'
import browseCandidate from './jobs/browsing-candidate.json'

// Signup
import waiting from './signup/waiting.json'
import rejected from './signup/rejected.json'

// Login
import loginPopup from './login/login-popup.json'
import loginSimple from './login/login-simple.json'
import forgotPassword from './login/forgot-password.json'
import resetPassword from './login/reset-password.json'

// Communication Method Animations
import communication from './signup/communication-method/communication.json'
import viaEmail from './signup/communication-method/via-mail.json'
import viaSms from './signup/communication-method/via-mobile.json'

// Usage Method
import workingOnComputer from './signup/usage-method/working-on-computer.json'
import handshake from './signup/usage-method/handshake.json'

// Industry - Students
import currentStudents from './students/current-students.json'
import futureCandidates from './students/future-candidates.json'
import appointment from './students/appointment.json'

// Industry - General Info
import unitRequirements from './general-info/requirements.json'
import placement from './general-info/placement.json'
import IndustryConsultation from './general-info/consultancy.json'
import Signature from './general-info/mou.json'

// Student Portal - Workplace
import myWorkplace from './students/working.json'
import appointments from './students/appointments.json'
import browseJobs from './students/browse-jobs.json'

// Student Portal - Assessment
import assessment from './students/assessment.json'
import assessmentTool from './students/assessment-tools.json'
import esign from './students/sign.json'

// Student Portal - Notifications
import emails from './students/emails.json'
import discussion from './students/discussion.json'
//RTo portal- User- Student
import student from './students/student.json'

import consultation from './jobs/consultation.json'

import rtoListing from './students/rto-listing.json'
import industryListing from './students/industry-listing.json'
import myStudentsReport from './students/my-student-report.json'
import appointmentsSec from './students/appointments-sec.json'
import submissions from './students/submissions.json'
import workplace from './students/workplace.json'

export const ANIM_ERROR = error
export const ANIM_PAGE_NOT_FOUND = pageNotFound
export const Animations = {
    Common: {
        NoConnection: noInternetConnection,
        EmptyBox: emptyBox,
        ShakeEmptyBox: shakeEmptyBox,
        Loading: loading,
        Appointment: appointmentBox,
        UnderConstruction: underConstruction,
        Actions: {
            Success: check,
            Info: info,
            Error: error,
        },
        EmailSent: emailSent,
        PageNotFound: pageNotFound,
        PageNotFound2: pageNotFound2,
        Help: help,
        Help1: help1,
    },

    Auth: {
        SignUp: {
            Waiting: waiting,
            Rejected: rejected,
            CommunicationMethod: {
                Communication: communication,
                ViaEmail: viaEmail,
                ViaSMS: viaSms,
            },
        },

        Login: {
            Popup: loginPopup,
            Simple: loginSimple,
            ForgotPassword: forgotPassword,
            ResetPassword: resetPassword,
        },
    },

    Industry: {
        Dashboard: {
            RequiredDocuments: requiredDocuments,
            RequestVolunteer: requestVolunteer,
        },

        MyTasks: {
            Scheduling: scheduling,
            AvailableShift: availableShift,
        },

        Jobs: {
            Advertise: advertiseJob,
            BrowseCandidate: browseCandidate,
        },

        CommunicationMethod: {
            Communication: communication,
            ViaEmail: viaEmail,
            ViaSMS: viaSms,
        },

        UsageMethod: {
            Once: workingOnComputer,
            Partner: handshake,
        },

        Students: {
            CurrentStudents: currentStudents,
            FutureCandidates: futureCandidates,
            Appointment: appointment,
        },

        GeneralInfo: {
            UnitRequirements: unitRequirements,
            Placement: placement,
            IndustryConsultation,
            Signature,
        },
        Consultation: {
            Consultation: consultation,
        },
    },

    Student: {
        Workplace: {
            MyWorkplace: myWorkplace,
            Appointments: appointments,
            Jobs: browseJobs,
            Student: student,
        },

        Appointments: {
            AssessmentEvidence: assessment,
            AssessmentTool: assessmentTool,
            Esign: esign,
            RtoListing: rtoListing,
            IndustryListing: industryListing,
            MyStudentsReport: myStudentsReport,
            AppointmentsSec: appointmentsSec,
            Submissions: submissions,
            Workplace: workplace,
        },
        Notifications: {
            Emails: emails,
            Discussion: discussion,
        },
    },
}
