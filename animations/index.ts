import noInternetConnection from "./common/no-connection.json";
import emptyBox from "./common/empty-box.json";
import shakeEmptyBox from "./common/shake-empty-box.json";
import loading from "./common/loading.json";

// Actions
import check from "./actions/check.json";
import info from "./actions/info.json";
import error from "./actions/error.json";

// General
import underConstruction from "./common/under-construction.json";

// Dashboard Animations
import requiredDocuments from "./dashboard/required-documents.json";
import requestVolunteer from "./dashboard/request-volunteer.json";

// Task Animations
import scheduling from "./my-tasks/scheduling.json";
import availableShift from "./my-tasks/available-shift.json";

// Job Animations
import advertiseJob from "./jobs/advertise.json";
import browseCandidate from "./jobs/browsing-candidate.json";

// Signup
import waiting from "./signup/waiting.json";
import rejected from "./signup/rejected.json";

// Login
import loginPopup from "./login/login-popup.json";
import loginSimple from "./login/login-simple.json";

// Communication Method Animations
import communication from "./signup/communication-method/communication.json";
import viaEmail from "./signup/communication-method/via-mail.json";
import viaSms from "./signup/communication-method/via-mobile.json";

// Usage Method
import workingOnComputer from "./signup/usage-method/working-on-computer.json";
import handshake from "./signup/usage-method/handshake.json";

// Industry - Students
import currentStudents from "./students/current-students.json";
import futureCandidates from "./students/future-candidates.json";
import appointment from "./students/appointment.json";

// Industry - General Info
import unitRequirements from "./general-info/requirements.json";
import placement from "./general-info/placement.json";
import IndustryConsultation from "./general-info/consultancy.json";
import Signature from "./general-info/mou.json";

export const Animations = {
	NoConnection: noInternetConnection,
	EmptyBox: emptyBox,
	ShakeEmptyBox: shakeEmptyBox,
	Loading: loading,

	Common: {
		UnderConstruction: underConstruction,
		Actions: {
			Success: check,
			Info: info,
			Error: error,
		},
	},

    Auth: {
        SignUp: {
			Waiting: waiting,
			Rejected: rejected,
		},

		Login: {
			Popup: loginPopup,
			Simple: loginSimple,
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
	},
};
