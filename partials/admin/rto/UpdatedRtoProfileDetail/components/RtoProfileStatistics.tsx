import React from 'react'
import { ProfileCounts } from './ProfileCounts'
import { RtoProfileProgress } from './RtoProfileProgress'
import { Card } from '@components'
import { AdminApi } from '@queries'

export const RtoProfileStatistics = ({ rtoUserId }: { rtoUserId: number }) => {
    const statisticsCount = AdminApi.Rtos.useStatisticsCount(
        Number(rtoUserId),
        { skip: !rtoUserId }
    )
    const abc = [
        {
            id: 4436,
            createdAt: '2023-11-16T23:41:45.200Z',
            familyName: 'Singh',
            studentId: '21892',
            phone: '432644675',
            suburb: 'Tarneit VIC, Australia',
            expiryDate: '2024-07-06T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6990,
                name: 'Avtar',
                email: 'avtar.vic@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 31452,
                    isActive: true,
                    createdAt: '2024-03-14T00:44:02.882Z',
                    updatedAt: '2024-03-14T00:44:02.882Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 76,
                user: {
                    name: 'Haris Abdullah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1119,
                    businessName: 'Annecto',
                    suburb: 'Maddingley VIC, Australia',
                    user: {
                        id: 3620,
                        name: 'Annecto Melton',
                        email: 'Loran.Cressey@annecto.org.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 3632,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 9166,
                            applied: true,
                            appliedDate: '2023-11-20T23:26:53.497Z',
                            caseOfficerAssignedDate: '2023-11-21T23:58:49.712Z',
                            interviewDate: '2023-11-20T23:27:00.940Z',
                            awaitingWorkplaceResponseDate:
                                '2023-11-21T23:58:49.712Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-21T23:58:49.717Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-14T11:45:01.322Z',
                            placementStartedDate: '2024-03-14T11:44:44.602Z',
                            industry: {
                                id: 1119,
                                businessName: 'Annecto',
                                phoneNumber: '0353663000/+61399712118',
                                suburb: 'Maddingley VIC, Australia',
                                user: {
                                    id: 3620,
                                    name: 'Annecto Melton',
                                    email: 'Loran.Cressey@annecto.org.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4367,
            createdAt: '2023-11-13T04:49:51.471Z',
            familyName: 'Ng',
            studentId: '21871',
            phone: '+61430004571',
            suburb: 'Kensington VIC, Australia',
            expiryDate: '2024-06-02T19:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6869,
                name: 'Justin Ng',
                email: 'justin.ekin.current@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 15951,
                    isActive: true,
                    createdAt: '2023-11-14T02:29:31.974Z',
                    updatedAt: '2023-11-14T02:38:05.962Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 80,
                user: {
                    name: 'Billy Otis',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 1657,
                    businessName: null,
                    suburb: 'Sunshine North VIC, Australia',
                    user: {
                        id: 4950,
                        name: 'Cumberland Manor',
                        email: 'info@cumberlandmanor.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3539,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 9046,
                            applied: true,
                            appliedDate: '2023-11-16T23:37:28.225Z',
                            caseOfficerAssignedDate: '2023-11-16T23:39:21.449Z',
                            interviewDate: '2023-11-16T23:38:17.925Z',
                            awaitingWorkplaceResponseDate:
                                '2023-11-16T23:39:21.449Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-29T05:32:05.882Z',
                            AgreementSignedDate: '2023-11-29T05:32:05.882Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-05T04:52:29.987Z',
                            placementStartedDate: '2023-11-29T05:32:53.665Z',
                            industry: {
                                id: 1657,
                                businessName: null,
                                phoneNumber: '03 9311 7079',
                                suburb: 'Sunshine North VIC, Australia',
                                user: {
                                    id: 4950,
                                    name: 'Cumberland Manor',
                                    email: 'info@cumberlandmanor.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4316,
            createdAt: '2023-11-10T02:38:04.171Z',
            familyName: 'Drewe',
            studentId: '21799',
            phone: '402999296',
            suburb: 'Point Cook VIC, Australia',
            expiryDate: '2025-03-12T19:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6790,
                name: 'Kylie ',
                email: 'Kizykat82@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 34609,
                    isActive: true,
                    createdAt: '2024-04-05T01:02:28.651Z',
                    updatedAt: '2024-04-05T01:02:28.651Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 2965,
                    businessName: null,
                    suburb: 'Shepparton VIC, Australia',
                    user: {
                        id: 8230,
                        name: 'Villa Maria Catholic Homes',
                        email: 'vmch@vmch.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3710,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 93,
                        user: {
                            name: 'Simon',
                        },
                    },
                    industries: [
                        {
                            id: 13399,
                            applied: true,
                            appliedDate: '2024-04-18T14:12:46.127Z',
                            caseOfficerAssignedDate: '2024-04-18T14:13:52.478Z',
                            interviewDate: '2024-04-18T14:13:17.608Z',
                            awaitingWorkplaceResponseDate:
                                '2024-04-18T14:13:52.478Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-04-18T14:13:52.542Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-18T14:14:37.647Z',
                            placementStartedDate: '2024-04-18T14:14:23.997Z',
                            industry: {
                                id: 2965,
                                businessName: null,
                                phoneNumber: '611300650615',
                                suburb: 'Shepparton VIC, Australia',
                                user: {
                                    id: 8230,
                                    name: 'Villa Maria Catholic Homes',
                                    email: 'vmch@vmch.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4271,
            createdAt: '2023-11-06T02:25:51.891Z',
            familyName: 'Chien',
            studentId: '21787',
            phone: '+61476888839',
            suburb: 'Doncaster East VIC, Australia',
            expiryDate: '2024-07-08T12:24:48.323Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6727,
                name: 'kaien',
                email: 'chien.kaien48@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 37389,
                    isActive: true,
                    createdAt: '2024-04-23T05:53:05.753Z',
                    updatedAt: '2024-04-23T05:53:05.753Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 82,
                user: {
                    name: 'Layla Ballard ',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 3202,
                    businessName: null,
                    suburb: 'Abbotsford VIC, Australia',
                    user: {
                        id: 15372,
                        name: 'Care Connect',
                        email: 'info@careconnect.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 5433,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 13498,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-04-24T11:11:20.111Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-04-24T11:11:20.111Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-04-24T11:12:28.142Z',
                            AgreementSignedDate: '2024-04-24T11:12:28.142Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-04-24T11:13:36.475Z',
                            placementStartedDate: null,
                            industry: {
                                id: 3202,
                                businessName: null,
                                phoneNumber: '+61 1800 692 464',
                                suburb: 'Abbotsford VIC, Australia',
                                user: {
                                    id: 15372,
                                    name: 'Care Connect',
                                    email: 'info@careconnect.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4194,
            createdAt: '2023-10-30T08:13:39.366Z',
            familyName: 'Kaur',
            studentId: '20982',
            phone: '+61430736000',
            suburb: 'Melton South VIC, Australia',
            expiryDate: '2024-05-30T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6628,
                name: 'Ramandeep',
                email: 'raman.maan@y7mail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 33628,
                    isActive: true,
                    createdAt: '2024-03-27T03:12:14.802Z',
                    updatedAt: '2024-03-27T03:12:14.802Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 2678,
                    businessName: null,
                    suburb: 'Werribee VIC, Australia',
                    user: {
                        id: 7525,
                        name: 'Beyond Barriers Care',
                        email: 'admin@bbcare.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 4124,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 10217,
                            applied: true,
                            appliedDate: '2024-01-04T06:30:15.333Z',
                            caseOfficerAssignedDate: '2024-01-04T06:30:45.219Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-01-04T06:30:45.219Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-01-04T06:31:02.440Z',
                            AgreementSignedDate: '2024-01-04T06:31:02.440Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T06:31:15.977Z',
                            placementStartedDate: '2024-01-04T06:31:07.259Z',
                            industry: {
                                id: 2678,
                                businessName: null,
                                phoneNumber: '611300190023',
                                suburb: 'Werribee VIC, Australia',
                                user: {
                                    id: 7525,
                                    name: 'Beyond Barriers Care',
                                    email: 'admin@bbcare.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4087,
            createdAt: '2023-10-11T05:15:44.215Z',
            familyName: 'Magele ',
            studentId: '21666',
            phone: '412685804',
            suburb: 'Melbourne VIC, Australia',
            expiryDate: '2024-12-28T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6391,
                name: 'Gloria ',
                email: 'magelegloria@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 17235,
                    isActive: true,
                    createdAt: '2023-11-22T03:34:20.890Z',
                    updatedAt: '2023-11-22T03:34:20.890Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 80,
                user: {
                    name: 'Billy Otis',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2484,
                    businessName: null,
                    suburb: 'Carrum VIC, Australia',
                    user: {
                        id: 7142,
                        name: 'HOPE PATTERSON LAKES PTY LTD',
                        email: 'hope@gmail.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3753,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 9405,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-11-30T05:02:31.709Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-11-30T05:02:31.709Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-30T05:02:49.382Z',
                            AgreementSignedDate: '2023-11-30T05:02:49.382Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-30T05:03:12.630Z',
                            placementStartedDate: '2023-11-30T05:02:56.366Z',
                            industry: {
                                id: 2484,
                                businessName: null,
                                phoneNumber: '+61 3 9776 0808',
                                suburb: 'Carrum VIC, Australia',
                                user: {
                                    id: 7142,
                                    name: 'HOPE PATTERSON LAKES PTY LTD',
                                    email: 'hope@gmail.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4081,
            createdAt: '2023-10-11T05:15:02.026Z',
            familyName: 'Adhikari Mudiyanselage',
            studentId: '18524',
            phone: '444570562',
            suburb: 'Clyde North VIC, Australia',
            expiryDate: '2023-11-25T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6385,
                name: 'Iroshini Adhikari',
                email: 'iroshiniadhikari@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 15617,
                    isActive: true,
                    createdAt: '2023-11-13T02:55:35.904Z',
                    updatedAt: '2023-11-21T07:06:52.099Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 44,
                    code: 'CHC50121  ',
                    title: 'Diploma of Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2326,
                    businessName: null,
                    suburb: 'Clyde North VIC, Australia',
                    user: {
                        id: 6634,
                        name: 'Aspire Childcare Centre Clyde North',
                        email: 'clydenorth@aspireearlyeducation.vic.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3343,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 92,
                        user: {
                            name: 'Nora Marshall',
                        },
                    },
                    industries: [
                        {
                            id: 8400,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-11-16T23:54:37.945Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-10-31T04:26:40.410Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-17T00:02:24.219Z',
                            AgreementSignedDate: '2023-11-17T00:02:24.219Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-17T00:03:16.492Z',
                            placementStartedDate: '2023-11-17T00:01:20.688Z',
                            industry: {
                                id: 2326,
                                businessName: null,
                                phoneNumber: '+61 1800 978 429',
                                suburb: 'Clyde North VIC, Australia',
                                user: {
                                    id: 6634,
                                    name: 'Aspire Childcare Centre Clyde North',
                                    email: 'clydenorth@aspireearlyeducation.vic.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4050,
            createdAt: '2023-10-10T02:22:49.795Z',
            familyName: 'Kanneh ',
            studentId: '21657',
            phone: '0415543396',
            suburb: 'North Melbourne VIC, Australia',
            expiryDate: '2024-05-29T19:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6336,
                name: 'Massa ',
                email: 'massamsk38@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 42664,
                    isActive: true,
                    createdAt: '2024-05-22T00:53:26.439Z',
                    updatedAt: '2024-05-22T00:53:29.450Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 82,
                user: {
                    name: 'Layla Ballard ',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 2107,
                    businessName: null,
                    suburb: 'Reservoir VIC, Australia',
                    user: {
                        id: 6225,
                        name: 'Sunshine Supported Service',
                        email: 'northern.terrace@outlook.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 4257,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 82,
                        user: {
                            name: 'Layla Ballard ',
                        },
                    },
                    industries: [
                        {
                            id: 12778,
                            applied: true,
                            appliedDate: '2024-03-18T16:54:13.632Z',
                            caseOfficerAssignedDate: '2024-04-18T16:18:36.802Z',
                            interviewDate: '2024-03-18T16:54:52.662Z',
                            awaitingWorkplaceResponseDate:
                                '2024-03-18T16:55:40.105Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-05-09T15:12:38.638Z',
                            AgreementSignedDate: '2024-05-09T15:12:38.638Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-05-22T00:52:19.223Z',
                            placementStartedDate: '2024-05-09T15:12:38.405Z',
                            industry: {
                                id: 2107,
                                businessName: null,
                                phoneNumber: '0394693300',
                                suburb: 'Reservoir VIC, Australia',
                                user: {
                                    id: 6225,
                                    name: 'Sunshine Supported Service',
                                    email: 'northern.terrace@outlook.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 4030,
            createdAt: '2023-10-03T00:25:27.596Z',
            familyName: 'Lellupitiya ',
            studentId: '21624',
            phone: '0424107273',
            suburb: 'Hallam VIC, Australia',
            expiryDate: '2024-12-12T13:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6244,
                name: ' Uresha  ',
                email: 'keeshani98@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 13268,
                    isActive: true,
                    createdAt: '2023-10-23T05:29:23.722Z',
                    updatedAt: '2023-10-23T05:29:27.354Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 80,
                user: {
                    name: 'Billy Otis',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2154,
                    businessName: null,
                    suburb: 'Clayton VIC, Australia',
                    user: {
                        id: 6284,
                        name: 'Monash Children centre',
                        email: 'childerns.centre@monash.edu',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3099,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 7796,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-10-24T01:52:07.555Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-10-24T01:52:07.555Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-24T01:52:25.702Z',
                            AgreementSignedDate: '2023-10-24T01:52:25.702Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-24T01:52:48.950Z',
                            placementStartedDate: '2023-10-24T01:52:33.935Z',
                            industry: {
                                id: 2154,
                                businessName: null,
                                phoneNumber: '0399053062',
                                suburb: 'Clayton VIC, Australia',
                                user: {
                                    id: 6284,
                                    name: 'Monash Children centre',
                                    email: 'childerns.centre@monash.edu',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3968,
            createdAt: '2023-09-13T03:57:34.456Z',
            familyName: 'KIM',
            studentId: '21562',
            phone: '0425173046',
            suburb: 'Melton South VIC, Australia',
            expiryDate: '2024-10-14T19:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6107,
                name: 'Hee Un',
                email: 'humj0419@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 13793,
                    isActive: true,
                    createdAt: '2023-10-26T03:53:04.551Z',
                    updatedAt: '2023-10-26T03:56:16.170Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1802,
                    businessName: null,
                    suburb: 'Werribee VIC, Australia',
                    user: {
                        id: 5545,
                        name: 'Harmony Home and Community Care Pty Ltd',
                        email: 'sangeeta@hhacc.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2962,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 7522,
                            applied: true,
                            appliedDate: '2023-09-19T01:48:02.133Z',
                            caseOfficerAssignedDate: '2023-10-25T06:24:33.335Z',
                            interviewDate: '2023-09-20T00:43:10.241Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-25T06:24:33.335Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-06T00:22:29.408Z',
                            AgreementSignedDate: '2023-11-06T00:22:29.408Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-05T00:37:51.921Z',
                            placementStartedDate: '2023-11-06T00:22:32.022Z',
                            industry: {
                                id: 1802,
                                businessName: null,
                                phoneNumber: '+61 1300 063 718',
                                suburb: 'Werribee VIC, Australia',
                                user: {
                                    id: 5545,
                                    name: 'Harmony Home and Community Care Pty Ltd',
                                    email: 'sangeeta@hhacc.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3951,
            createdAt: '2023-09-13T03:25:29.015Z',
            familyName: 'Edwards',
            studentId: '21577',
            phone: '0404422326',
            suburb: 'NARRE WARREN SOUTH',
            expiryDate: '2024-08-26T19:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6089,
                name: 'Mark',
                email: 'markedwards244@gmail.com',
                status: 'approved',
                avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/1695207688067feb9497c-1ad0-4e0f-9be8-9913f7e2d91c_profile.png',
            },
            tickets: [],
            callLog: [
                {
                    id: 10108,
                    isActive: true,
                    createdAt: '2023-09-22T00:55:17.743Z',
                    updatedAt: '2023-09-22T00:56:07.832Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 2092,
                    businessName: null,
                    suburb: 'Ferntree Gully VIC, Australia',
                    user: {
                        id: 6179,
                        name: 'Mountain District Learning Centre',
                        email: 'alisonp@mdlc.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2995,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 7572,
                            applied: true,
                            appliedDate: '2024-01-16T00:09:48.930Z',
                            caseOfficerAssignedDate: '2023-09-22T02:00:03.770Z',
                            interviewDate: '2024-02-09T16:07:02.233Z',
                            awaitingWorkplaceResponseDate:
                                '2023-09-22T02:00:03.770Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-03T03:30:02.575Z',
                            AgreementSignedDate: '2023-10-03T03:30:02.575Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-02-09T16:07:17.272Z',
                            placementStartedDate: '2023-10-03T03:30:26.695Z',
                            industry: {
                                id: 2092,
                                businessName: null,
                                phoneNumber: '(03) 9758 7859',
                                suburb: 'Ferntree Gully VIC, Australia',
                                user: {
                                    id: 6179,
                                    name: 'Mountain District Learning Centre',
                                    email: 'alisonp@mdlc.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3943,
            createdAt: '2023-09-12T06:52:48.963Z',
            familyName: 'Pyritz',
            studentId: '21507',
            phone: '0490832291',
            suburb: 'Clyde North VIC, Australia',
            expiryDate: '2024-07-06T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6078,
                name: 'Maureen ',
                email: 'millypie09@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 9163,
                    isActive: true,
                    createdAt: '2023-09-14T01:38:57.131Z',
                    updatedAt: '2023-09-14T02:03:10.285Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1474,
                    businessName: null,
                    suburb: 'Cranbourne North VIC, Australia',
                    user: {
                        id: 4477,
                        name: ' Inspire Early Learning Journey Cranbourne',
                        email: 'Cranbourne@inspire.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2927,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 7450,
                            applied: true,
                            appliedDate: '2023-09-14T02:03:32.411Z',
                            caseOfficerAssignedDate: '2023-09-14T02:03:52.397Z',
                            interviewDate: '2023-09-14T02:03:32.399Z',
                            awaitingWorkplaceResponseDate:
                                '2023-09-14T02:03:52.397Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-04T07:12:15.594Z',
                            AgreementSignedDate: '2023-10-04T07:12:15.594Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-24T02:45:30.236Z',
                            placementStartedDate: '2023-10-04T07:12:25.641Z',
                            industry: {
                                id: 1474,
                                businessName: null,
                                phoneNumber: '03 9819 3999',
                                suburb: 'Cranbourne North VIC, Australia',
                                user: {
                                    id: 4477,
                                    name: ' Inspire Early Learning Journey Cranbourne',
                                    email: 'Cranbourne@inspire.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3941,
            createdAt: '2023-09-12T06:52:41.806Z',
            familyName: 'Patel',
            studentId: '21521',
            phone: '0457888490',
            suburb: 'Cranbourne West VIC, Australia',
            expiryDate: '2024-07-06T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6076,
                name: 'Mrugyabahen ',
                email: 'mrugya4u@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 13336,
                    isActive: true,
                    createdAt: '2023-10-24T00:38:16.105Z',
                    updatedAt: '2023-10-24T00:39:00.761Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2055,
                    businessName: null,
                    suburb: 'Cranbourne VIC, Australia',
                    user: {
                        id: 6122,
                        name: 'Aussie Kindies Early Learning Cranbourne',
                        email: 'enrolments@affinityeducation.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2916,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 7423,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-09-14T02:28:44.604Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-09-14T02:28:44.604Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-27T04:16:40.551Z',
                            AgreementSignedDate: '2023-10-27T04:16:40.551Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-12-11T06:18:54.994Z',
                            placementStartedDate: '2023-10-27T04:19:25.809Z',
                            industry: {
                                id: 2055,
                                businessName: null,
                                phoneNumber: '+61 3 5996 6255',
                                suburb: 'Cranbourne VIC, Australia',
                                user: {
                                    id: 6122,
                                    name: 'Aussie Kindies Early Learning Cranbourne',
                                    email: 'enrolments@affinityeducation.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3916,
            createdAt: '2023-09-02T09:50:00.786Z',
            familyName: 'Gemeda',
            studentId: '20606',
            phone: '+61435716119',
            suburb: 'Noble Park VIC, Australia',
            expiryDate: '2023-12-06T01:12:12.223Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 6011,
                name: 'Olkeba',
                email: 'olkeba907@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 31922,
                    isActive: true,
                    createdAt: '2024-03-17T22:40:03.836Z',
                    updatedAt: '2024-03-17T22:40:03.836Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1057,
                    businessName: 'St James Terrace',
                    suburb: 'Cheltenham VIC, Australia',
                    user: {
                        id: 3558,
                        name: 'St James Terrace Aged Care Cheltenham',
                        email: 'hr@stjamesterrace.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2941,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 7479,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-09-15T06:28:37.142Z',
                            interviewDate: '2023-09-15T06:28:19.432Z',
                            awaitingWorkplaceResponseDate:
                                '2023-09-15T06:28:37.142Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T11:55:58.570Z',
                            placementStartedDate: '2023-11-07T23:27:45.400Z',
                            industry: {
                                id: 1057,
                                businessName: 'St James Terrace',
                                phoneNumber: '(03) 9583 9999/+61395839999',
                                suburb: 'Cheltenham VIC, Australia',
                                user: {
                                    id: 3558,
                                    name: 'St James Terrace Aged Care Cheltenham',
                                    email: 'hr@stjamesterrace.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3648,
            createdAt: '2023-08-08T04:21:18.441Z',
            familyName: 'Amanjit',
            studentId: '21651',
            phone: '0452293160 ',
            suburb: 'Tarneit VIC, Australia',
            expiryDate: '2023-11-29T19:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 5586,
                name: 'Mrs Kaur Amanjit',
                email: 'amanmaddy2015@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 13001,
                    isActive: true,
                    createdAt: '2023-10-20T01:57:35.563Z',
                    updatedAt: '2023-10-20T01:59:09.264Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 48,
                user: {
                    name: 'Saad Shah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1164,
                    businessName: 'Arete care',
                    suburb: '',
                    user: {
                        id: 3665,
                        name: 'Arete care',
                        email: 'laxmi.thapa@aretecare.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2525,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 6687,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-08-11T05:46:29.758Z',
                            interviewDate: '2023-08-11T05:46:11.172Z',
                            awaitingWorkplaceResponseDate:
                                '2023-08-11T05:46:29.758Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-23T01:10:16.150Z',
                            AgreementSignedDate: '2023-10-23T01:10:16.150Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T11:57:10.122Z',
                            placementStartedDate: '2023-10-23T01:10:27.638Z',
                            industry: {
                                id: 1164,
                                businessName: 'Arete care',
                                phoneNumber: '0447147703',
                                suburb: '',
                                user: {
                                    id: 3665,
                                    name: 'Arete care',
                                    email: 'laxmi.thapa@aretecare.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3210,
            createdAt: '2023-06-22T01:58:19.018Z',
            familyName: 'Reyes',
            studentId: '21419',
            phone: '0424374581\t',
            suburb: 'Wyndham Vale VIC, Australia',
            expiryDate: '2024-08-06T15:49:41.171Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4970,
                name: 'Ruby Monnette ',
                email: 'rubymoneth.reyes@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 25711,
                    isActive: true,
                    createdAt: '2024-01-29T04:23:04.430Z',
                    updatedAt: '2024-01-29T04:24:45.310Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2687,
                    businessName: null,
                    suburb: 'Wyndham Vale VIC, Australia',
                    user: {
                        id: 7541,
                        name: 'Nido Early School Wyndham Vale',
                        email: 'wyndhamvale@nido.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 4087,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 10291,
                            applied: true,
                            appliedDate: '2024-01-09T04:17:09.829Z',
                            caseOfficerAssignedDate: '2024-01-17T05:56:30.308Z',
                            interviewDate: '2024-01-17T04:30:14.812Z',
                            awaitingWorkplaceResponseDate:
                                '2024-01-17T05:56:30.308Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-01-29T23:03:15.572Z',
                            AgreementSignedDate: '2024-01-29T23:03:15.572Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-05-01T10:24:57.870Z',
                            placementStartedDate: '2024-01-29T23:03:51.851Z',
                            industry: {
                                id: 2687,
                                businessName: null,
                                phoneNumber: '+61370199398',
                                suburb: 'Wyndham Vale VIC, Australia',
                                user: {
                                    id: 7541,
                                    name: 'Nido Early School Wyndham Vale',
                                    email: 'wyndhamvale@nido.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3181,
            createdAt: '2023-06-15T05:41:58.046Z',
            familyName: 'Rizo',
            studentId: '21474',
            phone: '412385602',
            suburb: 'Lalor VIC, Australia',
            expiryDate: '2024-05-22T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4922,
                name: 'Ritchel Rizo',
                email: 'ritchelrizo62@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 31460,
                    isActive: true,
                    createdAt: '2024-03-14T00:55:03.185Z',
                    updatedAt: '2024-03-14T00:57:32.739Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 82,
                user: {
                    name: 'Layla Ballard ',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 3047,
                    businessName: null,
                    suburb: 'Reservoir VIC, Australia',
                    user: {
                        id: 8460,
                        name: 'Northern Terrace SRS',
                        email: 'northern.terrace@outlook.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 5087,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 12674,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-03-14T12:21:10.636Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-03-14T12:21:10.636Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-03-14T12:21:10.697Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-05-06T16:28:05.594Z',
                            placementStartedDate: '2024-03-14T12:21:19.501Z',
                            industry: {
                                id: 3047,
                                businessName: null,
                                phoneNumber: ' 03 9469 3300',
                                suburb: 'Reservoir VIC, Australia',
                                user: {
                                    id: 8460,
                                    name: 'Northern Terrace SRS',
                                    email: 'northern.terrace@outlook.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3148,
            createdAt: '2023-06-14T04:27:30.338Z',
            familyName: 'Molel chandy',
            studentId: '21467',
            phone: '490405710',
            suburb: 'na',
            expiryDate: '2024-11-17T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4887,
                name: 'Sunilmon ',
                email: 'sunilmonmc@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 4976,
                    isActive: true,
                    createdAt: '2023-08-02T05:25:05.593Z',
                    updatedAt: '2023-08-02T05:25:05.593Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 53,
                user: {
                    name: 'Basit Ali',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1788,
                    businessName: null,
                    suburb: 'Keysborough VIC, Australia',
                    user: {
                        id: 5487,
                        name: 'Pulse for life Home care services',
                        email: 'info@pulse4life.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2402,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 53,
                        user: {
                            name: 'Basit Ali',
                        },
                    },
                    industries: [
                        {
                            id: 6270,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-08-28T00:22:14.677Z',
                            interviewDate: '2023-07-31T06:46:56.577Z',
                            awaitingWorkplaceResponseDate:
                                '2023-08-28T00:22:14.677Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-28T00:22:26.884Z',
                            AgreementSignedDate: '2023-08-28T00:22:26.884Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-28T00:23:16.652Z',
                            placementStartedDate: '2023-08-28T00:23:06.173Z',
                            industry: {
                                id: 1788,
                                businessName: null,
                                phoneNumber: '0434586283',
                                suburb: 'Keysborough VIC, Australia',
                                user: {
                                    id: 5487,
                                    name: 'Pulse for life Home care services',
                                    email: 'info@pulse4life.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3076,
            createdAt: '2023-05-29T01:41:00.881Z',
            familyName: 'Karki ',
            studentId: '21375',
            phone: '432422503',
            suburb: 'Cranbourne West VIC, Australia',
            expiryDate: '2024-09-15T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4730,
                name: 'Arjun ',
                email: '247evergreen@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 5182,
                    isActive: true,
                    createdAt: '2023-08-07T01:38:22.596Z',
                    updatedAt: '2023-08-07T01:38:22.596Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 53,
                user: {
                    name: 'Basit Ali',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [],
            workplace: [
                {
                    id: 2325,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 53,
                        user: {
                            name: 'Basit Ali',
                        },
                    },
                    industries: [
                        {
                            id: 6053,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: null,
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-07-21T01:23:53.697Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-27T12:34:03.421Z',
                            placementStartedDate: null,
                            industry: {
                                id: 1384,
                                businessName: null,
                                phoneNumber: '0432826660',
                                suburb: 'Dandenong',
                                user: {
                                    id: 4055,
                                    name: 'Life Health Services',
                                    email: 'hr@lifehealthservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3074,
            createdAt: '2023-05-29T01:40:57.069Z',
            familyName: 'Kaur',
            studentId: '21461',
            phone: '451994987',
            suburb: 'Clyde north',
            expiryDate: '2024-05-06T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4728,
                name: 'Parvinkal',
                email: 'pinkskaur11@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 6722,
                    isActive: true,
                    createdAt: '2023-08-24T06:20:23.747Z',
                    updatedAt: '2023-08-24T06:22:29.104Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1638,
                    businessName: null,
                    suburb: 'Cranbourne VIC, Australia',
                    user: {
                        id: 4884,
                        name: 'Merinda Park',
                        email: 'admin@merindapark.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2181,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5813,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-07-12T05:33:43.444Z',
                            interviewDate: '2023-07-12T05:33:29.655Z',
                            awaitingWorkplaceResponseDate:
                                '2023-07-12T05:33:43.444Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-08-24T06:22:49.864Z',
                            placementStartedDate: '2023-08-24T06:22:35.673Z',
                            industry: {
                                id: 1638,
                                businessName: null,
                                phoneNumber: '0359969056',
                                suburb: 'Cranbourne VIC, Australia',
                                user: {
                                    id: 4884,
                                    name: 'Merinda Park',
                                    email: 'admin@merindapark.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3066,
            createdAt: '2023-05-29T01:35:29.828Z',
            familyName: 'Ranasinghe Arachchilage',
            studentId: '21459',
            phone: '416741619',
            suburb: 'Clyde north',
            expiryDate: '2024-04-26T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: true,
            isHighPriority: false,
            user: {
                id: 4720,
                name: 'Madhushani Sewwandi',
                email: 'smadushani522@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 11246,
                    isActive: true,
                    createdAt: '2023-10-04T05:15:22.137Z',
                    updatedAt: '2023-10-04T05:18:07.957Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 983,
                    businessName: 'Kids On Aspen',
                    suburb: 'Clyde North VIC, Australia',
                    user: {
                        id: 3484,
                        name: 'Kids On Aspen',
                        email: 'info@kidsonaspen.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2121,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5535,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-27T04:17:12.836Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-27T04:17:22.954Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: null,
                            placementStartedDate: '2023-06-27T04:17:31.310Z',
                            industry: {
                                id: 983,
                                businessName: 'Kids On Aspen',
                                phoneNumber: '0387518068',
                                suburb: 'Clyde North VIC, Australia',
                                user: {
                                    id: 3484,
                                    name: 'Kids On Aspen',
                                    email: 'info@kidsonaspen.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3065,
            createdAt: '2023-05-29T01:35:26.290Z',
            familyName: 'Patel',
            studentId: '21424',
            phone: '410156380',
            suburb: 'Thornhill Park',
            expiryDate: '2024-04-26T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4719,
                name: 'Sneha Patel',
                email: 'snehapatel471@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 1135,
                    isActive: true,
                    createdAt: '2023-06-14T03:14:49.782Z',
                    updatedAt: '2023-06-14T03:14:49.782Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1570,
                    businessName: null,
                    suburb: 'Melton South VIC, Australia',
                    user: {
                        id: 4776,
                        name: 'Melton South Early School',
                        email: 'info@meltonsouthes.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2009,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5266,
                            applied: true,
                            appliedDate: '2023-06-07T06:45:56.772Z',
                            caseOfficerAssignedDate: '2023-06-09T02:39:23.259Z',
                            interviewDate: '2023-06-07T06:48:08.606Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-09T02:39:23.259Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-12T02:57:19.632Z',
                            AgreementSignedDate: '2023-07-12T02:57:19.632Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-25T01:02:08.588Z',
                            placementStartedDate: '2023-07-12T02:57:31.290Z',
                            industry: {
                                id: 1570,
                                businessName: null,
                                phoneNumber: '61390878600',
                                suburb: 'Melton South VIC, Australia',
                                user: {
                                    id: 4776,
                                    name: 'Melton South Early School',
                                    email: 'info@meltonsouthes.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3063,
            createdAt: '2023-05-29T01:35:19.382Z',
            familyName: 'Kaur',
            studentId: '21426',
            phone: '460526966',
            suburb: 'Mambourin ',
            expiryDate: '2024-04-26T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4717,
                name: 'Gurwinderpal ',
                email: 'Gurwinderkaur1990@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 1277,
                    isActive: true,
                    createdAt: '2023-06-15T06:36:31.360Z',
                    updatedAt: '2023-06-15T06:36:31.360Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1651,
                    businessName: null,
                    suburb: 'Wyndham Vale VIC, Australia',
                    user: {
                        id: 4938,
                        name: 'Sparrow Early Learning Manor Lakes',
                        email: 'manorlakes@sparrow.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2075,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5416,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-16T04:57:18.924Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-16T04:57:18.924Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-15T04:26:50.407Z',
                            AgreementSignedDate: '2023-08-15T04:26:50.407Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-15T04:28:23.893Z',
                            placementStartedDate: '2023-08-15T04:27:00.168Z',
                            industry: {
                                id: 1651,
                                businessName: null,
                                phoneNumber: '0397425033',
                                suburb: 'Wyndham Vale VIC, Australia',
                                user: {
                                    id: 4938,
                                    name: 'Sparrow Early Learning Manor Lakes',
                                    email: 'manorlakes@sparrow.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3060,
            createdAt: '2023-05-29T01:35:06.996Z',
            familyName: 'Njoto',
            studentId: '21304',
            phone: '0402811172',
            suburb: 'Melton South',
            expiryDate: '2024-01-23T23:27:09.824Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4714,
                name: 'Linda',
                email: 'lnjoto@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 193,
                    isActive: true,
                    createdAt: '2023-06-02T04:51:22.316Z',
                    updatedAt: '2023-06-02T05:10:31.637Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1570,
                    businessName: null,
                    suburb: 'Melton South VIC, Australia',
                    user: {
                        id: 4776,
                        name: 'Melton South Early School',
                        email: 'info@meltonsouthes.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1877,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5052,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-31T03:38:42.210Z',
                            interviewDate: '2023-05-31T03:37:49.478Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-31T03:38:42.210Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-02T05:08:53.491Z',
                            AgreementSignedDate: '2023-06-02T05:08:53.491Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T02:36:11.748Z',
                            placementStartedDate: '2023-06-06T03:44:41.129Z',
                            industry: {
                                id: 1570,
                                businessName: null,
                                phoneNumber: '61390878600',
                                suburb: 'Melton South VIC, Australia',
                                user: {
                                    id: 4776,
                                    name: 'Melton South Early School',
                                    email: 'info@meltonsouthes.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3057,
            createdAt: '2023-05-29T01:34:56.694Z',
            familyName: 'Zhang',
            studentId: '21215',
            phone: '456822777',
            suburb: 'Doncaster',
            expiryDate: '2024-07-02T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4711,
                name: 'Qitian ',
                email: 'qitian.z16@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 17605,
                    isActive: true,
                    createdAt: '2023-11-24T03:38:20.181Z',
                    updatedAt: '2023-11-24T03:39:01.973Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 867,
                    businessName: 'Aurora Early Education Doncaster',
                    suburb: 'Doncaster VIC, Australia',
                    user: {
                        id: 1894,
                        name: 'Aurora Early Education Doncaster',
                        email: 'doncaster@auroraearlyeducation.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2670,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 6941,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-08-21T06:31:52.970Z',
                            interviewDate: '2023-08-21T06:31:36.614Z',
                            awaitingWorkplaceResponseDate:
                                '2023-08-21T06:31:52.970Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-11-30T03:13:17.247Z',
                            placementStartedDate: '2023-10-09T00:08:55.104Z',
                            industry: {
                                id: 867,
                                businessName:
                                    'Aurora Early Education Doncaster',
                                phoneNumber: '0388208400',
                                suburb: 'Doncaster VIC, Australia',
                                user: {
                                    id: 1894,
                                    name: 'Aurora Early Education Doncaster',
                                    email: 'doncaster@auroraearlyeducation.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3052,
            createdAt: '2023-05-29T01:17:35.352Z',
            familyName: 'Shi',
            studentId: '21382',
            phone: '426505785',
            suburb: 'Bentleigh East ',
            expiryDate: '2024-04-04T01:17:34.800Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4706,
                name: 'Shi Lyuyin',
                email: 'Greeninsay@163.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 12995,
                    isActive: true,
                    createdAt: '2023-10-20T01:46:05.442Z',
                    updatedAt: '2023-10-20T01:46:42.430Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 26,
                    code: 'CHC43515',
                    title: 'Certificate IV in Mental Health Peer Work',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1355,
                    businessName: 'Elgar Home Supported Residential Service',
                    suburb: 'Box Hill North VIC, Australia',
                    user: {
                        id: 3883,
                        name: 'Elgar Home Supported Residential Service',
                        email: 'seelan23@optusnet.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2226,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5837,
                            applied: true,
                            appliedDate: '2023-10-09T03:27:06.905Z',
                            caseOfficerAssignedDate: '2023-10-25T05:53:16.228Z',
                            interviewDate: '2023-10-09T03:27:06.857Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-25T05:53:16.228Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-25T05:53:54.842Z',
                            AgreementSignedDate: '2023-10-25T05:53:54.842Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-12-21T01:42:07.128Z',
                            placementStartedDate: '2023-10-25T05:54:06.041Z',
                            industry: {
                                id: 1355,
                                businessName:
                                    'Elgar Home Supported Residential Service',
                                phoneNumber: '0398988566',
                                suburb: 'Box Hill North VIC, Australia',
                                user: {
                                    id: 3883,
                                    name: 'Elgar Home Supported Residential Service',
                                    email: 'seelan23@optusnet.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 3044,
            createdAt: '2023-05-28T00:07:24.298Z',
            familyName: 'Lin',
            studentId: '21263',
            phone: '+61481278896',
            suburb: 'Boxhill',
            expiryDate: '2024-06-15T12:04:31.784Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4697,
                name: 'Jing',
                email: 'im7enny1@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 4427,
                    isActive: true,
                    createdAt: '2023-07-26T02:35:53.365Z',
                    updatedAt: '2023-07-26T02:38:05.501Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 69,
                user: {
                    name: 'Harry Thompson',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1502,
                    businessName: null,
                    suburb: 'Dandenong North VIC, Australia',
                    user: {
                        id: 4531,
                        name: ' Change Life Australia',
                        email: 'info@changelifeaustralia.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1855,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5316,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-21T00:28:53.270Z',
                            interviewDate: '2023-06-08T06:45:03.603Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-21T00:28:53.270Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-07T00:58:31.842Z',
                            AgreementSignedDate: '2023-08-07T00:58:31.842Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-18T03:44:33.000Z',
                            placementStartedDate: '2023-08-07T00:58:38.171Z',
                            industry: {
                                id: 1502,
                                businessName: null,
                                phoneNumber: '1300 68 68 58',
                                suburb: 'Dandenong North VIC, Australia',
                                user: {
                                    id: 4531,
                                    name: ' Change Life Australia',
                                    email: 'info@changelifeaustralia.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2997,
            createdAt: '2023-05-26T06:48:53.601Z',
            familyName: 'Majamanda',
            studentId: '21438',
            phone: '449660865',
            suburb: 'Cranbourne ',
            expiryDate: '2024-06-15T12:09:39.903Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4650,
                name: 'Simbarashe ',
                email: 'majamsim@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 12571,
                    isActive: true,
                    createdAt: '2023-10-17T04:19:45.698Z',
                    updatedAt: '2023-10-17T04:19:45.698Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1587,
                    businessName: null,
                    suburb: 'Epping VIC, Australia',
                    user: {
                        id: 4797,
                        name: 'Health and Community Services',
                        email: 'saiful@healthandcommunityservices.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1942,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 76,
                        user: {
                            name: 'Haris Abdullah',
                        },
                    },
                    industries: [
                        {
                            id: 5190,
                            applied: true,
                            appliedDate: '2024-01-29T02:21:48.999Z',
                            caseOfficerAssignedDate: '2024-02-13T10:32:19.412Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-10-17T04:41:22.657Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-17T04:41:37.844Z',
                            AgreementSignedDate: '2023-10-17T04:41:37.844Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-02-13T10:34:12.195Z',
                            placementStartedDate: '2023-10-17T04:41:42.625Z',
                            industry: {
                                id: 1587,
                                businessName: null,
                                phoneNumber: '0415565425',
                                suburb: 'Epping VIC, Australia',
                                user: {
                                    id: 4797,
                                    name: 'Health and Community Services',
                                    email: 'saiful@healthandcommunityservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2976,
            createdAt: '2023-05-26T04:39:54.031Z',
            familyName: 'NA',
            studentId: '21409',
            phone: '451129162',
            suburb: 'NA',
            expiryDate: '2024-06-15T13:00:03.817Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4628,
                name: 'Tanya Terzakis',
                email: 'tanyat@outlook.com.au',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 7274,
                    isActive: true,
                    createdAt: '2023-08-30T03:33:18.555Z',
                    updatedAt: '2023-08-30T03:33:18.555Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1567,
                    businessName: null,
                    suburb: 'Malvern East VIC, Australia',
                    user: {
                        id: 4773,
                        name: 'SENDAYO AUSTRALIA PTY LTD',
                        email: 'support@sendayo.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1883,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 48,
                        user: {
                            name: 'Saad Shah',
                        },
                    },
                    industries: [
                        {
                            id: 5021,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-01T04:15:25.138Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-01T04:15:25.138Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-27T13:16:29.324Z',
                            placementStartedDate: '2023-08-30T03:32:59.273Z',
                            industry: {
                                id: 1567,
                                businessName: null,
                                phoneNumber: '+610385648436',
                                suburb: 'Malvern East VIC, Australia',
                                user: {
                                    id: 4773,
                                    name: 'SENDAYO AUSTRALIA PTY LTD',
                                    email: 'support@sendayo.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2866,
            createdAt: '2023-04-20T23:43:53.267Z',
            familyName: 'NA',
            studentId: '21189',
            phone: '0422678114',
            suburb: 'NA',
            expiryDate: '2024-06-15T12:59:27.407Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4422,
                name: 'Mziwethu Sithole',
                email: 'Coachmzi96@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 31419,
                    isActive: true,
                    createdAt: '2024-03-13T22:10:27.926Z',
                    updatedAt: '2024-03-13T22:11:08.222Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 1500,
                    businessName: null,
                    suburb: 'Doncaster East VIC, Australia',
                    user: {
                        id: 4529,
                        name: 'Calvary Millward Residential Aged Care',
                        email: 'joy.ncube@calvarycare.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1765,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4732,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-18T03:58:21.558Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-18T03:58:21.558Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-08-24T07:26:33.592Z',
                            placementStartedDate: '2023-08-24T07:26:21.037Z',
                            industry: {
                                id: 1500,
                                businessName: null,
                                phoneNumber: '+61398411600',
                                suburb: 'Doncaster East VIC, Australia',
                                user: {
                                    id: 4529,
                                    name: 'Calvary Millward Residential Aged Care',
                                    email: 'joy.ncube@calvarycare.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2820,
            createdAt: '2023-04-05T01:20:15.254Z',
            familyName: 'Sohtra',
            studentId: '17569',
            phone: '423710305',
            suburb: 'surrey hills',
            expiryDate: '2023-07-06T01:20:14.289Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4348,
                name: 'Shah Nawaz',
                email: 'shah_shafaq@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 53,
                user: {
                    name: 'Basit Ali',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1480,
                    businessName: null,
                    suburb: 'Dandenong',
                    user: {
                        id: 4493,
                        name: 'Wayss Limited',
                        email: 'melissaa@wayss.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1782,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 53,
                        user: {
                            name: 'Basit Ali',
                        },
                    },
                    industries: [
                        {
                            id: 4789,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-22T04:48:15.355Z',
                            interviewDate: '2023-05-22T05:56:25.792Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-22T05:56:39.998Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-12T12:59:08.564Z',
                            placementStartedDate: '2023-06-12T04:19:33.360Z',
                            industry: {
                                id: 1480,
                                businessName: null,
                                phoneNumber: '+61 3 9791 6111',
                                suburb: 'Dandenong',
                                user: {
                                    id: 4493,
                                    name: 'Wayss Limited',
                                    email: 'melissaa@wayss.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2809,
            createdAt: '2023-04-03T07:13:55.853Z',
            familyName: 'Yang',
            studentId: '21207',
            phone: '0415601553',
            suburb: 'Carnegie ',
            expiryDate: '2024-03-26T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4332,
                name: 'Huiyi',
                email: 'christiana.yang@hotmail.com',
                status: 'archived',
                avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/183profile.jpeg',
            },
            tickets: [],
            callLog: [
                {
                    id: 11016,
                    isActive: true,
                    createdAt: '2023-10-02T23:24:18.955Z',
                    updatedAt: '2023-10-02T23:25:37.156Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1057,
                    businessName: 'St James Terrace',
                    suburb: 'Cheltenham VIC, Australia',
                    user: {
                        id: 3558,
                        name: 'St James Terrace Aged Care Cheltenham',
                        email: 'hr@stjamesterrace.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 3038,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 7686,
                            applied: true,
                            appliedDate: '2023-10-02T05:46:48.200Z',
                            caseOfficerAssignedDate: '2023-11-14T23:30:58.488Z',
                            interviewDate: '2023-10-02T05:46:48.183Z',
                            awaitingWorkplaceResponseDate:
                                '2023-11-14T23:30:58.488Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-12-27T05:26:19.491Z',
                            AgreementSignedDate: '2023-12-27T05:26:19.491Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-12-27T05:26:41.055Z',
                            placementStartedDate: '2023-12-27T05:26:24.859Z',
                            industry: {
                                id: 1057,
                                businessName: 'St James Terrace',
                                phoneNumber: '(03) 9583 9999/+61395839999',
                                suburb: 'Cheltenham VIC, Australia',
                                user: {
                                    id: 3558,
                                    name: 'St James Terrace Aged Care Cheltenham',
                                    email: 'hr@stjamesterrace.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2807,
            createdAt: '2023-04-03T07:07:40.317Z',
            familyName: 'Velendhi',
            studentId: '21212',
            phone: '432138366',
            suburb: 'Noble park',
            expiryDate: '2023-09-30T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4330,
                name: 'Sridar ',
                email: 'vesridhar2000@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1776,
                    businessName: null,
                    suburb: 'Cranbourne East VIC, Australia',
                    user: {
                        id: 5465,
                        name: 'Integrity Care Ltd',
                        email: 'info@integritycareltd.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1717,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 103,
                        user: {
                            name: 'Jake Tillman',
                        },
                    },
                    industries: [
                        {
                            id: 6480,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-31T12:53:12.229Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-08-07T00:49:34.773Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-07T00:50:07.242Z',
                            AgreementSignedDate: '2023-08-07T00:50:07.242Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-31T12:53:34.902Z',
                            placementStartedDate: '2023-08-07T00:50:36.998Z',
                            industry: {
                                id: 1776,
                                businessName: null,
                                phoneNumber: '0430 488 041',
                                suburb: 'Cranbourne East VIC, Australia',
                                user: {
                                    id: 5465,
                                    name: 'Integrity Care Ltd',
                                    email: 'info@integritycareltd.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2801,
            createdAt: '2023-04-03T06:38:08.507Z',
            familyName: 'Liu',
            studentId: '21173',
            phone: '0447936605',
            suburb: 'Maribyrnong',
            expiryDate: '2024-06-01T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4324,
                name: 'Fei',
                email: 'dior916@hotmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 29989,
                    isActive: true,
                    createdAt: '2024-03-04T04:28:56.049Z',
                    updatedAt: '2024-03-04T04:28:56.049Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 847,
                    businessName: 'Casey Aged Care',
                    suburb: 'Coburg VIC, Australia',
                    user: {
                        id: 1859,
                        name: 'Casey Aged Care',
                        email: 'cacadmin@maacg.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 4524,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 93,
                        user: {
                            name: 'Simon',
                        },
                    },
                    industries: [
                        {
                            id: 12180,
                            applied: true,
                            appliedDate: '2024-03-04T15:38:14.347Z',
                            caseOfficerAssignedDate: '2024-03-04T15:38:54.985Z',
                            interviewDate: '2024-03-04T15:38:24.811Z',
                            awaitingWorkplaceResponseDate:
                                '2024-03-04T15:38:54.985Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-04-13T14:07:28.534Z',
                            AgreementSignedDate: '2024-04-13T14:07:28.534Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-04-15T11:12:49.565Z',
                            placementStartedDate: '2024-03-04T17:01:56.034Z',
                            industry: {
                                id: 847,
                                businessName: 'Casey Aged Care',
                                phoneNumber: '0397054200',
                                suburb: 'Coburg VIC, Australia',
                                user: {
                                    id: 1859,
                                    name: 'Casey Aged Care',
                                    email: 'cacadmin@maacg.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2788,
            createdAt: '2023-04-03T05:44:22.508Z',
            familyName: 'na',
            studentId: '21287',
            phone: '0430590980',
            suburb: 'Noble Park  ',
            expiryDate: '2024-06-15T12:04:17.407Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4310,
                name: 'Polina Lim',
                email: 'Thaytan168@yahoo.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 7950,
                    isActive: true,
                    createdAt: '2023-09-05T05:52:56.083Z',
                    updatedAt: '2023-09-05T05:54:54.849Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 48,
                user: {
                    name: 'Saad Shah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1384,
                    businessName: null,
                    suburb: 'Dandenong',
                    user: {
                        id: 4055,
                        name: 'Life Health Services',
                        email: 'hr@lifehealthservices.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2079,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 5422,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-16T09:26:15.892Z',
                            interviewDate: '2023-06-16T09:25:52.235Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-16T09:26:15.892Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-27T12:31:59.703Z',
                            placementStartedDate: '2023-09-18T00:40:52.902Z',
                            industry: {
                                id: 1384,
                                businessName: null,
                                phoneNumber: '0432826660',
                                suburb: 'Dandenong',
                                user: {
                                    id: 4055,
                                    name: 'Life Health Services',
                                    email: 'hr@lifehealthservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2775,
            createdAt: '2023-04-03T05:41:27.747Z',
            familyName: 'NA',
            studentId: '20991',
            phone: '0452463628',
            suburb: 'Maribyrnong',
            expiryDate: '2024-10-28T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4297,
                name: 'Chaulagain Shiksha',
                email: 'shikshyachaulagain586@gmail.com',
                status: 'approved',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 34825,
                    isActive: true,
                    createdAt: '2024-04-08T03:21:31.995Z',
                    updatedAt: '2024-04-08T03:22:12.799Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
                {
                    id: 44,
                    code: 'CHC50121  ',
                    title: 'Diploma of Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 969,
                    businessName: 'Guardian Childcare & Education Essendon',
                    suburb: 'Essendon VIC, Australia',
                    user: {
                        id: 3470,
                        name: 'Guardian Childcare & Education Essendon',
                        email: 'Essendon@guardian.edu.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1792,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4816,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-07T01:54:22.752Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-07T01:54:22.752Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-06T03:43:28.307Z',
                            AgreementSignedDate: '2023-06-06T03:43:28.307Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-13T04:41:09.008Z',
                            placementStartedDate: '2023-07-21T03:45:01.824Z',
                            industry: {
                                id: 969,
                                businessName:
                                    'Guardian Childcare & Education Essendon',
                                phoneNumber: '0393797740',
                                suburb: 'Essendon VIC, Australia',
                                user: {
                                    id: 3470,
                                    name: 'Guardian Childcare & Education Essendon',
                                    email: 'Essendon@guardian.edu.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2768,
            createdAt: '2023-04-03T05:39:36.073Z',
            familyName: ' Uwahen',
            studentId: '21270',
            phone: '0469764514',
            suburb: 'Geelong VIC, Australia',
            expiryDate: '2024-06-15T12:11:33.622Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4290,
                name: 'Ikponmwosa Oden',
                email: 'odeh42@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 4548,
                    isActive: true,
                    createdAt: '2023-07-27T04:32:59.331Z',
                    updatedAt: '2023-07-27T04:32:59.331Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1704,
                    businessName: null,
                    suburb: 'North Geelong VIC, Australia',
                    user: {
                        id: 5185,
                        name: 'Gateways Geelong',
                        email: 'students@gateways.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2242,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 48,
                        user: {
                            name: 'Saad Shah',
                        },
                    },
                    industries: [
                        {
                            id: 5881,
                            applied: true,
                            appliedDate: '2023-07-20T00:49:00.968Z',
                            caseOfficerAssignedDate: '2023-07-28T04:28:26.538Z',
                            interviewDate: '2023-07-28T04:27:53.847Z',
                            awaitingWorkplaceResponseDate:
                                '2023-07-28T04:28:26.538Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-28T04:30:21.919Z',
                            AgreementSignedDate: '2023-07-28T04:30:21.919Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-29T22:14:42.683Z',
                            placementStartedDate: '2023-08-10T01:51:46.972Z',
                            industry: {
                                id: 1704,
                                businessName: null,
                                phoneNumber: '0352212984',
                                suburb: 'North Geelong VIC, Australia',
                                user: {
                                    id: 5185,
                                    name: 'Gateways Geelong',
                                    email: 'students@gateways.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2761,
            createdAt: '2023-04-03T05:39:02.140Z',
            familyName: 'McNee',
            studentId: '21180',
            phone: '0468883460',
            suburb: 'Narre Warren South',
            expiryDate: '2023-11-04T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4283,
                name: 'Ethan Wade ',
                email: 'ethan.mcnee@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 7281,
                    isActive: true,
                    createdAt: '2023-08-30T03:52:08.182Z',
                    updatedAt: '2023-08-30T03:52:08.182Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 48,
                user: {
                    name: 'Saad Shah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1471,
                    businessName: null,
                    suburb: 'Blind Bight VIC, Australia',
                    user: {
                        id: 4472,
                        name: 'Amethyst Care and Services Pty Ltd',
                        email: 'Amethystcareandservices@outlook.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1649,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 48,
                        user: {
                            name: 'Saad Shah',
                        },
                    },
                    industries: [
                        {
                            id: 4498,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-30T00:20:42.722Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-01-30T00:20:42.722Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-01-30T00:20:42.727Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T15:10:51.516Z',
                            placementStartedDate: '2024-01-30T00:20:47.781Z',
                            industry: {
                                id: 1471,
                                businessName: null,
                                phoneNumber: '0404533007',
                                suburb: 'Blind Bight VIC, Australia',
                                user: {
                                    id: 4472,
                                    name: 'Amethyst Care and Services Pty Ltd',
                                    email: 'Amethystcareandservices@outlook.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2750,
            createdAt: '2023-04-03T05:19:03.508Z',
            familyName: 'amin',
            studentId: '21264',
            phone: '0424086046',
            suburb: 'wyandhamvale ',
            expiryDate: '2023-07-28T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4271,
                name: 'afrina',
                email: 'afrinaminb@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 997,
                    businessName: 'Adventurers Education',
                    suburb: 'Wyndham Vale VIC, Australia',
                    user: {
                        id: 3498,
                        name: 'Adventurers Education',
                        email: 'Wyndham@adventurers.vic.edu.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1555,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4214,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-04-26T04:24:48.676Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-04-26T04:24:59.634Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-05T04:14:15.547Z',
                            AgreementSignedDate: '2023-07-05T04:14:15.547Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-08T01:55:07.358Z',
                            placementStartedDate: '2023-07-05T04:14:19.075Z',
                            industry: {
                                id: 997,
                                businessName: 'Adventurers Education',
                                phoneNumber: '0390880620',
                                suburb: 'Wyndham Vale VIC, Australia',
                                user: {
                                    id: 3498,
                                    name: 'Adventurers Education',
                                    email: 'Wyndham@adventurers.vic.edu.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2749,
            createdAt: '2023-04-03T05:18:58.838Z',
            familyName: 'Amarathunga Arachchige ',
            studentId: '21258',
            phone: '0403938223',
            suburb: 'Clyde North',
            expiryDate: '2024-02-19T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4270,
                name: 'Buddhishika Chathurani ',
                email: 'bcamaratunga@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 22222,
                    isActive: true,
                    createdAt: '2024-01-04T00:30:45.734Z',
                    updatedAt: '2024-01-04T00:35:01.039Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 80,
                user: {
                    name: 'Billy Otis',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2721,
                    businessName: null,
                    suburb: 'Berwick VIC, Australia',
                    user: {
                        id: 7640,
                        name: 'Berwick Twinkle Star Early Learning Centre',
                        email: 'Contact@BerwickTwinklestarELC.vic.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 4328,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 10697,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-19T02:54:12.429Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-01-19T02:54:12.429Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-01-19T02:56:21.161Z',
                            AgreementSignedDate: '2024-01-19T02:56:21.161Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-19T02:59:19.089Z',
                            placementStartedDate: '2024-01-19T02:56:27.562Z',
                            industry: {
                                id: 2721,
                                businessName: null,
                                phoneNumber: '(03) 9705 2211',
                                suburb: 'Berwick VIC, Australia',
                                user: {
                                    id: 7640,
                                    name: 'Berwick Twinkle Star Early Learning Centre',
                                    email: 'Contact@BerwickTwinklestarELC.vic.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2739,
            createdAt: '2023-04-03T05:15:28.341Z',
            familyName: 'na',
            studentId: '21218',
            phone: '451199567',
            suburb: 'NA',
            expiryDate: '2024-04-04T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4260,
                name: 'Soweeta Ghowsi',
                email: 'ssoweet@ymail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 31423,
                    isActive: true,
                    createdAt: '2024-03-13T22:44:46.900Z',
                    updatedAt: '2024-03-13T22:46:14.135Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 3056,
                    businessName: null,
                    suburb: 'Templestowe VIC, Australia',
                    user: {
                        id: 8470,
                        name: 'Sun House Family Day Care',
                        email: 'info@sunhousefamilydaycare.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 5100,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 92,
                        user: {
                            name: 'Nora Marshall',
                        },
                    },
                    industries: [
                        {
                            id: 12696,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-03-14T16:03:22.268Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2024-03-14T16:03:22.268Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-03-14T16:05:01.276Z',
                            AgreementSignedDate: '2024-03-14T16:05:01.276Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-14T16:08:32.377Z',
                            placementStartedDate: '2024-03-14T16:05:38.292Z',
                            industry: {
                                id: 3056,
                                businessName: null,
                                phoneNumber: '0470509043',
                                suburb: 'Templestowe VIC, Australia',
                                user: {
                                    id: 8470,
                                    name: 'Sun House Family Day Care',
                                    email: 'info@sunhousefamilydaycare.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2732,
            createdAt: '2023-04-03T05:06:20.660Z',
            familyName: 'Kular',
            studentId: '21276',
            phone: '468767621',
            suburb: 'Cobblebank',
            expiryDate: '2024-06-15T12:03:34.721Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4252,
                name: 'Manpreet Kaur ',
                email: 'manpreetkular0891@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 1239,
                    isActive: true,
                    createdAt: '2023-06-15T04:52:26.013Z',
                    updatedAt: '2023-06-15T04:57:09.583Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1119,
                    businessName: 'Annecto',
                    suburb: 'Maddingley VIC, Australia',
                    user: {
                        id: 3620,
                        name: 'Annecto Melton',
                        email: 'Loran.Cressey@annecto.org.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1871,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 4990,
                            applied: true,
                            appliedDate: '2023-09-22T02:18:57.678Z',
                            caseOfficerAssignedDate: '2023-05-31T05:20:08.942Z',
                            interviewDate: '2023-11-22T04:45:39.274Z',
                            awaitingWorkplaceResponseDate:
                                '2023-11-22T04:46:01.176Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-22T00:27:24.726Z',
                            AgreementSignedDate: '2023-06-22T00:27:24.726Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-22T04:46:30.642Z',
                            placementStartedDate: '2023-06-22T00:27:32.542Z',
                            industry: {
                                id: 1119,
                                businessName: 'Annecto',
                                phoneNumber: '0353663000/+61399712118',
                                suburb: 'Maddingley VIC, Australia',
                                user: {
                                    id: 3620,
                                    name: 'Annecto Melton',
                                    email: 'Loran.Cressey@annecto.org.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2730,
            createdAt: '2023-04-03T05:04:49.365Z',
            familyName: 'Yang',
            studentId: '21221',
            phone: '0412714743',
            suburb: 'Balwyn',
            expiryDate: '2024-06-15T13:01:35.262Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4250,
                name: 'Jingjing ',
                email: 'cucumber-828@163.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 11973,
                    isActive: true,
                    createdAt: '2023-10-11T01:55:17.676Z',
                    updatedAt: '2023-10-11T01:56:25.434Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 48,
                user: {
                    name: 'Saad Shah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1702,
                    businessName: null,
                    suburb: 'Preston VIC, Australia',
                    user: {
                        id: 5182,
                        name: 'Holistic Futures',
                        email: 'elly@holisticfutures.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2233,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5858,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-07-14T00:28:32.882Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-07-14T00:28:32.882Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-14T00:29:05.142Z',
                            AgreementSignedDate: '2023-07-14T00:29:05.142Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-07-14T00:29:27.539Z',
                            placementStartedDate: '2023-07-14T00:29:12.904Z',
                            industry: {
                                id: 1702,
                                businessName: null,
                                phoneNumber: '0490 065 296',
                                suburb: 'Preston VIC, Australia',
                                user: {
                                    id: 5182,
                                    name: 'Holistic Futures',
                                    email: 'elly@holisticfutures.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2729,
            createdAt: '2023-04-03T05:04:44.710Z',
            familyName: 'na',
            studentId: '21227',
            phone: '433438028',
            suburb: ' Burwood',
            expiryDate: '2024-06-15T13:01:08.667Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4249,
                name: 'JINGYAN Wei',
                email: 'weijingyan10@hotmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 2750,
                    isActive: true,
                    createdAt: '2023-07-10T06:21:37.621Z',
                    updatedAt: '2023-07-10T06:24:56.035Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 103,
                user: {
                    name: 'Jake Tillman',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1401,
                    businessName: null,
                    suburb: 'Wantirna South VIC, Australia',
                    user: {
                        id: 4087,
                        name: 'Adare Aged Care',
                        email: 'yvonne@adarecare.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1605,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 4520,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-09T01:12:32.286Z',
                            interviewDate: '2023-05-09T01:11:54.056Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-09T01:12:32.286Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-09T01:13:06.702Z',
                            AgreementSignedDate: '2023-05-09T01:13:06.702Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-24T02:05:40.156Z',
                            placementStartedDate: '2023-05-09T01:13:17.899Z',
                            industry: {
                                id: 1401,
                                businessName: null,
                                phoneNumber: '1300 540 275/ 0481433498',
                                suburb: 'Wantirna South VIC, Australia',
                                user: {
                                    id: 4087,
                                    name: 'Adare Aged Care',
                                    email: 'yvonne@adarecare.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2728,
            createdAt: '2023-04-03T05:04:40.597Z',
            familyName: 'na',
            studentId: '21208',
            phone: '412505741',
            suburb: 'Frankston',
            expiryDate: '2024-06-15T12:58:17.871Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4248,
                name: 'Tammy Shephard',
                email: 'tammytuppance@gmail.com',
                status: 'blocked',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1374,
                    businessName: null,
                    suburb: 'Cranbourne South VIC, Australia',
                    user: {
                        id: 4026,
                        name: 'Link Assist',
                        email: 'bianca@mylinkassist.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1620,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 103,
                        user: {
                            name: 'Jake Tillman',
                        },
                    },
                    industries: [
                        {
                            id: 4426,
                            applied: true,
                            appliedDate: '2023-05-03T17:22:10.362Z',
                            caseOfficerAssignedDate: '2024-02-01T16:01:25.276Z',
                            interviewDate: '2023-05-03T17:23:46.815Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-03T17:24:15.031Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-05T09:48:39.870Z',
                            AgreementSignedDate: '2023-05-05T09:48:39.870Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-02-01T16:01:41.448Z',
                            placementStartedDate: '2023-05-05T01:23:47.701Z',
                            industry: {
                                id: 1374,
                                businessName: null,
                                phoneNumber: '03 9789 8424',
                                suburb: 'Cranbourne South VIC, Australia',
                                user: {
                                    id: 4026,
                                    name: 'Link Assist',
                                    email: 'bianca@mylinkassist.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2727,
            createdAt: '2023-04-03T05:04:35.240Z',
            familyName: 'Cameron ',
            studentId: '21232',
            phone: '0406403103',
            suburb: 'Noble Park, VIC, 3174',
            expiryDate: '2023-10-31T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4247,
                name: 'Karen Li ',
                email: 'chkaren_2000@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 1350,
                    isActive: true,
                    createdAt: '2023-06-19T01:21:02.336Z',
                    updatedAt: '2023-06-19T01:21:02.336Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1502,
                    businessName: null,
                    suburb: 'Dandenong North VIC, Australia',
                    user: {
                        id: 4531,
                        name: ' Change Life Australia',
                        email: 'info@changelifeaustralia.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1887,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5028,
                            applied: true,
                            appliedDate: '2023-05-30T07:03:57.936Z',
                            caseOfficerAssignedDate: '2023-05-30T07:04:32.975Z',
                            interviewDate: '2023-05-30T07:03:55.330Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-30T07:04:32.975Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-05T00:22:39.854Z',
                            AgreementSignedDate: '2023-07-05T00:22:39.854Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-12T13:37:34.867Z',
                            placementStartedDate: '2023-07-05T00:22:50.473Z',
                            industry: {
                                id: 1502,
                                businessName: null,
                                phoneNumber: '1300 68 68 58',
                                suburb: 'Dandenong North VIC, Australia',
                                user: {
                                    id: 4531,
                                    name: ' Change Life Australia',
                                    email: 'info@changelifeaustralia.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2726,
            createdAt: '2023-04-03T04:56:47.439Z',
            familyName: 'na',
            studentId: '21211',
            phone: '432915006',
            suburb: 'NA',
            expiryDate: '2023-11-30T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4246,
                name: 'Kuldip Singh',
                email: 'kuldeep_singh_intouch@yahoo.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 13747,
                    isActive: true,
                    createdAt: '2023-10-25T05:58:55.447Z',
                    updatedAt: '2023-10-25T05:59:48.541Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 2117,
                    businessName: null,
                    suburb: 'Werribee VIC, Australia',
                    user: {
                        id: 6239,
                        name: 'Felicity Holistic Care',
                        email: 'admin@felicitycare.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3063,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 82,
                        user: {
                            name: 'Layla Ballard ',
                        },
                    },
                    industries: [
                        {
                            id: 7748,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-11-21T03:20:06.876Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-10-02T03:42:31.087Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-21T03:19:08.417Z',
                            AgreementSignedDate: '2023-11-21T03:19:08.417Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-27T23:44:36.046Z',
                            placementStartedDate: '2023-11-21T03:20:29.152Z',
                            industry: {
                                id: 2117,
                                businessName: null,
                                phoneNumber: '+61 1300 589 176',
                                suburb: 'Werribee VIC, Australia',
                                user: {
                                    id: 6239,
                                    name: 'Felicity Holistic Care',
                                    email: 'admin@felicitycare.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2695,
            createdAt: '2023-03-27T22:38:23.493Z',
            familyName: 'Liu',
            studentId: '21214',
            phone: '+61433921331',
            suburb: 'Viewbank',
            expiryDate: '2024-07-02T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4196,
                name: 'Xiu ',
                email: 'xiuliu2010@hotmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 45,
                    code: 'CHC30121',
                    title: 'Certificate III in Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1491,
                    businessName: null,
                    suburb: 'Fitzroy North VIC, Australia',
                    user: {
                        id: 4517,
                        name: 'Kids on Queens Parade Child Care Centre and Registered Kindergarten',
                        email: 'kidsonqueens@gmail.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1742,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4676,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-07T02:01:51.280Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-07T02:01:51.280Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-11-15T00:37:25.133Z',
                            placementStartedDate: '2023-06-26T02:54:24.864Z',
                            industry: {
                                id: 1491,
                                businessName: null,
                                phoneNumber: '94893405',
                                suburb: 'Fitzroy North VIC, Australia',
                                user: {
                                    id: 4517,
                                    name: 'Kids on Queens Parade Child Care Centre and Registered Kindergarten',
                                    email: 'kidsonqueens@gmail.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2601,
            createdAt: '2023-03-19T23:57:04.753Z',
            familyName: 'Panebio',
            studentId: '20751',
            phone: '+61405887432',
            suburb: 'Melbourne',
            expiryDate: '2023-06-20T23:57:03.901Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4075,
                name: 'Nina Christine',
                email: 'ninachristinepanebio@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
                {
                    id: 121,
                    code: 'CHC52021',
                    title: 'Diploma Community Services ',
                    sector: {
                        name: 'Community Services',
                    },
                },
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1454,
                    businessName: null,
                    suburb: 'Hallam VIC, Australia',
                    user: {
                        id: 4443,
                        name: 'My Sensory Gym',
                        email: 'info@mysensorygym.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1574,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 4266,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-03T03:09:03.673Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-03T03:09:03.673Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-03T03:09:21.048Z',
                            AgreementSignedDate: '2023-05-03T03:09:21.048Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-12T13:45:14.587Z',
                            placementStartedDate: '2023-05-03T03:09:30.326Z',
                            industry: {
                                id: 1454,
                                businessName: null,
                                phoneNumber: '03 91347527',
                                suburb: 'Hallam VIC, Australia',
                                user: {
                                    id: 4443,
                                    name: 'My Sensory Gym',
                                    email: 'info@mysensorygym.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2600,
            createdAt: '2023-03-19T23:51:49.198Z',
            familyName: 'Domingo',
            studentId: '17301',
            phone: '+61450080286',
            suburb: 'Tarneit',
            expiryDate: '2023-06-27T03:05:49.198Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4074,
                name: 'Enrico III ',
                email: 'e3domingoworks@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1406,
                    businessName: null,
                    suburb: 'Bentleigh VIC, Australia',
                    user: {
                        id: 4151,
                        name: 'Namron Housing Disability Supports',
                        email: 'operations@namronsupports.org',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1342,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3724,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-27T06:04:47.026Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-27T06:04:47.026Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-03-30T22:57:15.401Z',
                            AgreementSignedDate: '2023-03-30T22:57:15.401Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-24T02:18:59.722Z',
                            placementStartedDate: '2023-03-30T22:56:57.694Z',
                            industry: {
                                id: 1406,
                                businessName: null,
                                phoneNumber: '0412921457',
                                suburb: 'Bentleigh VIC, Australia',
                                user: {
                                    id: 4151,
                                    name: 'Namron Housing Disability Supports',
                                    email: 'operations@namronsupports.org',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2594,
            createdAt: '2023-03-15T07:26:15.061Z',
            familyName: 'NA',
            studentId: '20219',
            phone: '0402527835',
            suburb: 'NA',
            expiryDate: '2023-06-16T07:26:14.165Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4053,
                name: 'Ajaykumar Ramanbhai',
                email: 'ajayau@gmail.com',
                status: 'archived',
                avatar: null,
            },
            tickets: [],
            callLog: [
                {
                    id: 11827,
                    isActive: true,
                    createdAt: '2023-10-10T04:12:24.615Z',
                    updatedAt: '2023-10-10T04:21:08.778Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1052,
                    businessName: 'Avocadocare',
                    suburb: 'Sunshine VIC, Australia',
                    user: {
                        id: 3553,
                        name: 'Avocadocare',
                        email: 'info@avocadocare.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1299,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 82,
                        user: {
                            name: 'Layla Ballard ',
                        },
                    },
                    industries: [
                        {
                            id: 3650,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-05-15T05:31:10.628Z',
                            interviewDate: '2023-03-17T07:24:30.043Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-17T07:24:55.265Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T15:15:31.476Z',
                            placementStartedDate: '2023-10-15T23:54:00.170Z',
                            industry: {
                                id: 1052,
                                businessName: 'Avocadocare',
                                phoneNumber: '0412360825',
                                suburb: 'Sunshine VIC, Australia',
                                user: {
                                    id: 3553,
                                    name: 'Avocadocare',
                                    email: 'info@avocadocare.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2540,
            createdAt: '2023-03-03T10:45:56.114Z',
            familyName: 'Guo',
            studentId: '21120',
            phone: '455383008',
            suburb: 'Balwyn',
            expiryDate: '2023-12-22T03:36:52.243Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4008,
                name: 'Kaipeng Guo',
                email: 'guokaipeng88@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 1756,
                    isActive: true,
                    createdAt: '2023-06-23T02:50:35.840Z',
                    updatedAt: '2023-06-23T02:50:35.840Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
                {
                    id: 26,
                    code: 'CHC43515',
                    title: 'Certificate IV in Mental Health Peer Work',
                    sector: {
                        name: 'Mental Health',
                    },
                },
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1502,
                    businessName: null,
                    suburb: 'Dandenong North VIC, Australia',
                    user: {
                        id: 4531,
                        name: ' Change Life Australia',
                        email: 'info@changelifeaustralia.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1930,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5265,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-15T03:38:59.824Z',
                            interviewDate: '2023-06-07T06:38:02.847Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-15T03:38:59.824Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-23T05:34:35.197Z',
                            AgreementSignedDate: '2023-06-23T05:34:35.197Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-07-28T08:30:09.441Z',
                            placementStartedDate: '2023-06-23T05:34:44.152Z',
                            industry: {
                                id: 1502,
                                businessName: null,
                                phoneNumber: '1300 68 68 58',
                                suburb: 'Dandenong North VIC, Australia',
                                user: {
                                    id: 4531,
                                    name: ' Change Life Australia',
                                    email: 'info@changelifeaustralia.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2538,
            createdAt: '2023-03-03T10:45:50.290Z',
            familyName: ' Taylor',
            studentId: '20714',
            phone: '412929321',
            suburb: 'Cook',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4006,
                name: 'Kirsty Lee Taylor',
                email: 'kirstyleetaylor06@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 12484,
                    isActive: true,
                    createdAt: '2023-10-16T05:20:11.541Z',
                    updatedAt: '2023-10-16T05:28:45.143Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 26,
                    code: 'CHC43515',
                    title: 'Certificate IV in Mental Health Peer Work',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1633,
                    businessName: null,
                    suburb: 'Thornbury VIC, Australia',
                    user: {
                        id: 4875,
                        name: 'Yooralla Ventilator Accommodation Support Service (VASS)',
                        email: 'yooralla@yooralla.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3258,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 8161,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-10-24T23:32:16.937Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-10-24T23:32:16.937Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-24T23:32:23.794Z',
                            AgreementSignedDate: '2023-10-24T23:32:23.794Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-24T23:32:40.036Z',
                            placementStartedDate: '2023-10-24T23:32:28.431Z',
                            industry: {
                                id: 1633,
                                businessName: null,
                                phoneNumber: '03 9666 4500',
                                suburb: 'Thornbury VIC, Australia',
                                user: {
                                    id: 4875,
                                    name: 'Yooralla Ventilator Accommodation Support Service (VASS)',
                                    email: 'yooralla@yooralla.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2536,
            createdAt: '2023-03-03T10:45:44.114Z',
            familyName: ' Sun',
            studentId: '21098',
            phone: '0426840080',
            suburb: 'RINGWOOD EAST',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 4004,
                name: 'Yu',
                email: 'cindysun1224@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1498,
                    businessName: null,
                    suburb: 'Tuggerah NSW, Australia',
                    user: {
                        id: 4525,
                        name: 'My Home Care Group',
                        email: 'info@myhomecare.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1939,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 53,
                        user: {
                            name: 'Basit Ali',
                        },
                    },
                    industries: [
                        {
                            id: 5187,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-05T02:46:39.013Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-05T02:46:47.680Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-02-14T11:50:52.816Z',
                            placementStartedDate: '2023-07-04T03:29:14.558Z',
                            industry: {
                                id: 1498,
                                businessName: null,
                                phoneNumber: '1300203903',
                                suburb: 'Tuggerah NSW, Australia',
                                user: {
                                    id: 4525,
                                    name: 'My Home Care Group',
                                    email: 'info@myhomecare.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2511,
            createdAt: '2023-03-03T10:44:25.674Z',
            familyName: null,
            studentId: '21059',
            phone: '424729619',
            suburb: '',
            expiryDate: null,
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3979,
                name: 'Victoria Politis',
                email: 'victoriapolitis2000@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 25201,
                    isActive: true,
                    createdAt: '2024-01-23T03:13:42.952Z',
                    updatedAt: '2024-01-23T03:17:12.534Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1554,
                    businessName: null,
                    suburb: 'Melbourne VIC, Australia',
                    user: {
                        id: 4610,
                        name: 'Villa maria catholic homes',
                        email: 'jaxon.billett@vmch.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1845,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 93,
                        user: {
                            name: 'Simon',
                        },
                    },
                    industries: [
                        {
                            id: 4904,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-23T03:24:12.520Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-01T05:17:31.678Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2024-02-21T16:53:34.592Z',
                            AgreementSignedDate: '2024-02-21T16:53:34.592Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-18T16:52:20.249Z',
                            placementStartedDate: '2024-02-21T16:52:04.538Z',
                            industry: {
                                id: 1554,
                                businessName: null,
                                phoneNumber: '1300 698 624 ',
                                suburb: 'Melbourne VIC, Australia',
                                user: {
                                    id: 4610,
                                    name: 'Villa maria catholic homes',
                                    email: 'jaxon.billett@vmch.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2509,
            createdAt: '2023-03-03T10:44:19.962Z',
            familyName: 'Jose',
            studentId: '18826',
            phone: '450917024',
            suburb: 'Wantirna ',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3977,
                name: 'Emelyn ',
                email: 'emelyn.jose87@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 32927,
                    isActive: true,
                    createdAt: '2024-03-22T01:33:10.718Z',
                    updatedAt: '2024-03-22T01:33:10.718Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 1554,
                    businessName: null,
                    suburb: 'Melbourne VIC, Australia',
                    user: {
                        id: 4610,
                        name: 'Villa maria catholic homes',
                        email: 'jaxon.billett@vmch.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1708,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 53,
                        user: {
                            name: 'Basit Ali',
                        },
                    },
                    industries: [
                        {
                            id: 5184,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-09-25T06:04:56.063Z',
                            interviewDate: '2023-06-06T06:42:52.552Z',
                            awaitingWorkplaceResponseDate:
                                '2023-09-25T06:04:56.063Z',
                            appointmentBookedDate: '2023-06-06T06:42:58.561Z',
                            awaitingAgreementSignedDate:
                                '2024-01-19T03:44:42.697Z',
                            AgreementSignedDate: '2024-01-19T03:44:42.697Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-19T03:45:24.275Z',
                            placementStartedDate: '2024-01-19T03:45:13.187Z',
                            industry: {
                                id: 1554,
                                businessName: null,
                                phoneNumber: '1300 698 624 ',
                                suburb: 'Melbourne VIC, Australia',
                                user: {
                                    id: 4610,
                                    name: 'Villa maria catholic homes',
                                    email: 'jaxon.billett@vmch.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2490,
            createdAt: '2023-03-03T10:43:13.386Z',
            familyName: 'Nanda',
            studentId: '21096',
            phone: '0452207380',
            suburb: 'ClCranbourne West',
            expiryDate: '2023-12-09T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3958,
                name: 'Isha Nanda',
                email: 'ishatalwar321@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 10944,
                    isActive: true,
                    createdAt: '2023-10-02T04:32:50.308Z',
                    updatedAt: '2023-10-02T04:35:35.293Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 48,
                user: {
                    name: 'Saad Shah',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1374,
                    businessName: null,
                    suburb: 'Cranbourne South VIC, Australia',
                    user: {
                        id: 4026,
                        name: 'Link Assist',
                        email: 'bianca@mylinkassist.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2048,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 5365,
                            applied: true,
                            appliedDate: '2023-06-22T01:14:02.033Z',
                            caseOfficerAssignedDate: '2023-06-23T06:03:59.250Z',
                            interviewDate: '2023-06-22T01:14:19.248Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-23T06:03:59.250Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T15:17:48.291Z',
                            placementStartedDate: '2023-10-03T00:13:38.911Z',
                            industry: {
                                id: 1374,
                                businessName: null,
                                phoneNumber: '03 9789 8424',
                                suburb: 'Cranbourne South VIC, Australia',
                                user: {
                                    id: 4026,
                                    name: 'Link Assist',
                                    email: 'bianca@mylinkassist.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2475,
            createdAt: '2023-03-03T10:42:26.282Z',
            familyName: null,
            studentId: '21153',
            phone: '0421798508',
            suburb: '',
            expiryDate: '2024-02-08T00:48:40.187Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3943,
                name: 'Qing Xu',
                email: 'qingxu1194666452@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 962,
                    businessName: 'Guardian Childcare & Education Box Hill',
                    suburb: 'Box Hill VIC, Australia',
                    user: {
                        id: 3463,
                        name: 'Guardian Childcare & Education Box Hill',
                        email: 'BoxHill@guardian.edu.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1251,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3541,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-16T01:13:15.753Z',
                            interviewDate: '2023-05-16T01:10:55.307Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-16T01:13:15.753Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T02:46:07.650Z',
                            placementStartedDate: '2023-05-16T01:13:32.624Z',
                            industry: {
                                id: 962,
                                businessName:
                                    'Guardian Childcare & Education Box Hill',
                                phoneNumber: '0398904257',
                                suburb: 'Box Hill VIC, Australia',
                                user: {
                                    id: 3463,
                                    name: 'Guardian Childcare & Education Box Hill',
                                    email: 'BoxHill@guardian.edu.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2455,
            createdAt: '2023-03-03T10:41:24.538Z',
            familyName: null,
            studentId: '21097',
            phone: '0433873298',
            suburb: '',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3923,
                name: 'Ying Li',
                email: 'ly_tutu@hotmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 12925,
                    isActive: true,
                    createdAt: '2023-10-19T04:57:10.089Z',
                    updatedAt: '2023-10-19T05:00:28.879Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1779,
                    businessName: null,
                    suburb: 'South Kingsville VIC, Australia',
                    user: {
                        id: 5471,
                        name: 'Gateway Community Services',
                        email: 'negraa@gatewaycommunityservices.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1244,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 6213,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-08-08T03:01:30.777Z',
                            interviewDate: '2023-08-08T03:01:44.697Z',
                            awaitingWorkplaceResponseDate:
                                '2023-08-08T03:02:01.611Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-04T01:32:40.955Z',
                            AgreementSignedDate: '2023-08-04T01:32:40.955Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-19T02:55:21.663Z',
                            placementStartedDate: '2023-08-08T03:02:20.875Z',
                            industry: {
                                id: 1779,
                                businessName: null,
                                phoneNumber: '03 9399 3511',
                                suburb: 'South Kingsville VIC, Australia',
                                user: {
                                    id: 5471,
                                    name: 'Gateway Community Services',
                                    email: 'negraa@gatewaycommunityservices.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2450,
            createdAt: '2023-03-03T10:41:09.275Z',
            familyName: null,
            studentId: '21142',
            phone: '433447044',
            suburb: ' Deepdene',
            expiryDate: null,
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3918,
                name: 'Zirui Wang',
                email: 'ziruimm@hotmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 10420,
                    isActive: true,
                    createdAt: '2023-09-25T06:37:25.799Z',
                    updatedAt: '2023-09-25T06:40:26.618Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1463,
                    businessName: null,
                    suburb: 'Ascot Vale VIC, Australia',
                    user: {
                        id: 4460,
                        name: 'Wingate Avenue Community Centre',
                        email: 'angeline@wingateave.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1606,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 4375,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-03T04:55:49.769Z',
                            interviewDate: '2023-05-03T04:55:33.755Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-03T04:55:49.769Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-09-26T00:45:33.956Z',
                            AgreementSignedDate: '2023-09-26T00:45:33.956Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-09-26T00:46:01.612Z',
                            placementStartedDate: '2023-09-26T00:45:37.286Z',
                            industry: {
                                id: 1463,
                                businessName: null,
                                phoneNumber: '(03) 9212 0236',
                                suburb: 'Ascot Vale VIC, Australia',
                                user: {
                                    id: 4460,
                                    name: 'Wingate Avenue Community Centre',
                                    email: 'angeline@wingateave.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2449,
            createdAt: '2023-03-03T10:41:06.315Z',
            familyName: 'Thakur',
            studentId: '21138',
            phone: '404024340',
            suburb: 'Flora Hill',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3917,
                name: 'Aman ',
                email: 'thakuraman84@yahoo.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1390,
                    businessName: null,
                    suburb: 'Bendigo VIC 3550, Australia',
                    user: {
                        id: 4068,
                        name: 'Bendigo Justice Service Centre',
                        email: 'bendigoccs@justice.vic.gov.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1371,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3792,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-31T03:30:09.848Z',
                            interviewDate: '2023-03-31T03:29:54.304Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-31T03:30:09.848Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-03-31T03:30:28.281Z',
                            AgreementSignedDate: '2023-03-31T03:30:28.281Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-27T05:41:55.838Z',
                            placementStartedDate: '2023-03-31T03:30:35.059Z',
                            industry: {
                                id: 1390,
                                businessName: null,
                                phoneNumber: '+61 3 5440 6100',
                                suburb: 'Bendigo VIC 3550, Australia',
                                user: {
                                    id: 4068,
                                    name: 'Bendigo Justice Service Centre',
                                    email: 'bendigoccs@justice.vic.gov.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2446,
            createdAt: '2023-03-03T10:40:56.475Z',
            familyName: 'Feng',
            studentId: '21139',
            phone: '414084827',
            suburb: 'Chadstone',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3914,
                name: 'Ji Feng',
                email: 'peggyfengji@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 10433,
                    isActive: true,
                    createdAt: '2023-09-25T07:05:47.296Z',
                    updatedAt: '2023-09-25T07:05:49.692Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1132,
                    businessName: 'Marriott Community Services',
                    suburb: 'McKinnon VIC 3204, Australia',
                    user: {
                        id: 3633,
                        name: 'Marriott Community Services',
                        email: 'kellie.carruthers@marriott.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1612,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 7697,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-09-28T06:03:29.438Z',
                            interviewDate: '2023-09-28T06:03:14.346Z',
                            awaitingWorkplaceResponseDate:
                                '2023-09-28T06:03:29.438Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-09-28T06:03:41.899Z',
                            AgreementSignedDate: '2023-09-28T06:03:41.899Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-09-28T06:04:13.437Z',
                            placementStartedDate: '2023-09-28T06:04:03.023Z',
                            industry: {
                                id: 1132,
                                businessName: 'Marriott Community Services',
                                phoneNumber: '0455829313',
                                suburb: 'McKinnon VIC 3204, Australia',
                                user: {
                                    id: 3633,
                                    name: 'Marriott Community Services',
                                    email: 'kellie.carruthers@marriott.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2442,
            createdAt: '2023-03-03T10:40:43.586Z',
            familyName: null,
            studentId: '21161',
            phone: '0469874175',
            suburb: '',
            expiryDate: null,
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3910,
                name: 'Tayeba Mobalegh',
                email: 'tayebamobalegh@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 13708,
                    isActive: true,
                    createdAt: '2023-10-25T04:34:41.052Z',
                    updatedAt: '2023-10-25T04:36:14.125Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 2192,
                    businessName: null,
                    suburb: 'Dandenong VIC, Australia',
                    user: {
                        id: 6348,
                        name: 'Haisey Home Care',
                        email: 'madina.forogh@haiseyhomecare.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1242,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 7900,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-10-11T00:46:30.192Z',
                            interviewDate: '2023-10-11T00:46:09.058Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-11T00:46:30.192Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-11T00:47:16.590Z',
                            AgreementSignedDate: '2023-10-11T00:47:16.590Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-11T00:47:34.322Z',
                            placementStartedDate: '2023-10-11T00:47:22.240Z',
                            industry: {
                                id: 2192,
                                businessName: null,
                                phoneNumber: '(03) 8904 8623',
                                suburb: 'Dandenong VIC, Australia',
                                user: {
                                    id: 6348,
                                    name: 'Haisey Home Care',
                                    email: 'madina.forogh@haiseyhomecare.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2436,
            createdAt: '2023-03-03T10:40:23.924Z',
            familyName: 'Najmi',
            studentId: '20757',
            phone: '0401075143',
            suburb: 'Truganina ',
            expiryDate: '2024-06-15T15:12:00.489Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3904,
                name: 'Sabah',
                email: 'sabakamran97@yahoo.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1563,
                    businessName: null,
                    suburb: 'Hoppers Crossing VIC, Australia',
                    user: {
                        id: 4760,
                        name: 'Montessori Beginnings Hoppers Crossing',
                        email: 'HoppersCrossing@Mbegin.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1865,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4970,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-07T01:53:31.208Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-07T01:53:31.208Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: null,
                            placementStartedDate: '2023-05-29T06:49:50.093Z',
                            industry: {
                                id: 1563,
                                businessName: null,
                                phoneNumber: '0391310721',
                                suburb: 'Hoppers Crossing VIC, Australia',
                                user: {
                                    id: 4760,
                                    name: 'Montessori Beginnings Hoppers Crossing',
                                    email: 'HoppersCrossing@Mbegin.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2430,
            createdAt: '2023-02-22T06:00:34.301Z',
            familyName: null,
            studentId: '19765',
            phone: '0434942555',
            suburb: '',
            expiryDate: '2023-06-03T11:57:05.299Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3867,
                name: 'Viktor Taranov',
                email: 'viktortaranov@yahoo.com.au',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 1619,
                    isActive: true,
                    createdAt: '2023-06-21T06:27:37.490Z',
                    updatedAt: '2023-06-21T06:28:56.709Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
            ],
            industries: [
                {
                    id: 847,
                    businessName: 'Casey Aged Care',
                    suburb: 'Coburg VIC, Australia',
                    user: {
                        id: 1859,
                        name: 'Casey Aged Care',
                        email: 'cacadmin@maacg.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1262,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 103,
                        user: {
                            name: 'Jake Tillman',
                        },
                    },
                    industries: [
                        {
                            id: 3579,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-24T02:54:14.569Z',
                            interviewDate: '2023-03-17T07:31:28.694Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-17T07:31:41.523Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-05T06:18:32.164Z',
                            AgreementSignedDate: '2023-05-05T06:18:32.164Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-24T02:54:30.560Z',
                            placementStartedDate: '2023-05-05T06:17:14.527Z',
                            industry: {
                                id: 847,
                                businessName: 'Casey Aged Care',
                                phoneNumber: '0397054200',
                                suburb: 'Coburg VIC, Australia',
                                user: {
                                    id: 1859,
                                    name: 'Casey Aged Care',
                                    email: 'cacadmin@maacg.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2426,
            createdAt: '2023-02-20T04:09:05.013Z',
            familyName: 'Kaur',
            studentId: '20098',
            phone: '0426925589',
            suburb: 'Mickleham VIC, Australia',
            expiryDate: '2023-12-28T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3858,
                name: 'Taranjot ',
                email: 'taranjot.kaur54@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 29849,
                    isActive: true,
                    createdAt: '2024-03-04T01:44:58.294Z',
                    updatedAt: '2024-03-04T01:49:23.259Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1309,
                    businessName:
                        'Health and Community services Empowerment, Support and Choices',
                    suburb: 'Epping VIC, Australia',
                    user: {
                        id: 3819,
                        name: 'Health and Community services Empowerment, Support and Choices',
                        email: 'admin@healthandcommunityservices.com.au',
                        avatar: '',
                    },
                },
                {
                    id: 1587,
                    businessName: null,
                    suburb: 'Epping VIC, Australia',
                    user: {
                        id: 4797,
                        name: 'Health and Community Services',
                        email: 'saiful@healthandcommunityservices.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3779,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 9868,
                            applied: true,
                            appliedDate: '2023-12-12T05:04:11.739Z',
                            caseOfficerAssignedDate: '2023-12-12T05:04:42.850Z',
                            interviewDate: '2023-12-12T05:04:21.902Z',
                            awaitingWorkplaceResponseDate:
                                '2023-12-12T05:04:42.850Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-12-12T05:04:42.853Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-04T15:28:15.661Z',
                            placementStartedDate: '2024-03-05T11:17:32.901Z',
                            industry: {
                                id: 1587,
                                businessName: null,
                                phoneNumber: '0415565425',
                                suburb: 'Epping VIC, Australia',
                                user: {
                                    id: 4797,
                                    name: 'Health and Community Services',
                                    email: 'saiful@healthandcommunityservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2418,
            createdAt: '2023-01-31T08:25:50.952Z',
            familyName: null,
            studentId: '21080',
            phone: '0450384002',
            suburb: '',
            expiryDate: '2024-08-03T15:33:13.787Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3462,
                name: 'Shella Habiling',
                email: 'shellahabiling123@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 846,
                    businessName: 'Northern Gardens Aged Care',
                    suburb: 'Coburg North VIC, Australia',
                    user: {
                        id: 1857,
                        name: 'Northern Gardens Aged Care',
                        email: 'ngclinical@maacg.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1834,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4869,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-24T04:41:51.032Z',
                            interviewDate: '2023-05-24T04:41:25.752Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-24T04:41:51.032Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-05T01:41:15.234Z',
                            AgreementSignedDate: '2023-06-05T01:41:15.234Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-15T06:20:26.111Z',
                            placementStartedDate: '2023-06-07T01:54:14.102Z',
                            industry: {
                                id: 846,
                                businessName: 'Northern Gardens Aged Care',
                                phoneNumber: '61393505033',
                                suburb: 'Coburg North VIC, Australia',
                                user: {
                                    id: 1857,
                                    name: 'Northern Gardens Aged Care',
                                    email: 'ngclinical@maacg.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2395,
            createdAt: '2023-01-31T08:24:11.217Z',
            familyName: null,
            studentId: '17849',
            phone: '0432826660',
            suburb: 'Tarneit',
            expiryDate: '2023-06-23T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3439,
                name: 'Shane Portia Abainza',
                email: 'shaneabainza@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 25605,
                    isActive: true,
                    createdAt: '2024-01-25T06:52:06.249Z',
                    updatedAt: '2024-01-25T06:52:06.249Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [],
            workplace: [
                {
                    id: 1285,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3627,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-30T23:00:32.374Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-30T23:00:32.374Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-03-27T12:34:59.559Z',
                            placementStartedDate: null,
                            industry: {
                                id: 1384,
                                businessName: null,
                                phoneNumber: '0432826660',
                                suburb: 'Dandenong',
                                user: {
                                    id: 4055,
                                    name: 'Life Health Services',
                                    email: 'hr@lifehealthservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2389,
            createdAt: '2023-01-31T08:23:47.801Z',
            familyName: 'Klair',
            studentId: '20829',
            phone: '0406884927',
            suburb: 'Hoppers Crossing VIC, Australia',
            expiryDate: '2025-10-01T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3433,
                name: 'Ratinder ',
                email: 'ratinder18sangha@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 24085,
                    isActive: true,
                    createdAt: '2024-01-15T05:44:56.686Z',
                    updatedAt: '2024-01-15T05:44:56.686Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 44,
                    code: 'CHC50121  ',
                    title: 'Diploma of Early Childhood Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1563,
                    businessName: null,
                    suburb: 'Hoppers Crossing VIC, Australia',
                    user: {
                        id: 4760,
                        name: 'Montessori Beginnings Hoppers Crossing',
                        email: 'HoppersCrossing@Mbegin.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2140,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5605,
                            applied: true,
                            appliedDate: '2023-07-04T03:25:54.358Z',
                            caseOfficerAssignedDate: '2023-08-22T00:57:04.237Z',
                            interviewDate: '2023-07-04T03:25:54.338Z',
                            awaitingWorkplaceResponseDate:
                                '2023-08-22T00:57:04.237Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-08-22T00:57:23.926Z',
                            AgreementSignedDate: '2023-08-22T00:57:23.926Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-22T00:57:41.037Z',
                            placementStartedDate: '2023-08-22T00:57:29.090Z',
                            industry: {
                                id: 1563,
                                businessName: null,
                                phoneNumber: '0391310721',
                                suburb: 'Hoppers Crossing VIC, Australia',
                                user: {
                                    id: 4760,
                                    name: 'Montessori Beginnings Hoppers Crossing',
                                    email: 'HoppersCrossing@Mbegin.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2346,
            createdAt: '2023-01-31T08:20:42.982Z',
            familyName: null,
            studentId: '20860',
            phone: '0415621958',
            suburb: '',
            expiryDate: '2024-01-10T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3390,
                name: 'Tara Prasad Bhattarai',
                email: 'tarasharma238@yahoo.in',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 27569,
                    isActive: true,
                    createdAt: '2024-02-13T23:29:53.751Z',
                    updatedAt: '2024-02-13T23:29:53.751Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1633,
                    businessName: null,
                    suburb: 'Thornbury VIC, Australia',
                    user: {
                        id: 4875,
                        name: 'Yooralla Ventilator Accommodation Support Service (VASS)',
                        email: 'yooralla@yooralla.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2041,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5352,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-12T06:50:11.374Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-12T06:50:11.374Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-12T06:51:31.709Z',
                            AgreementSignedDate: '2023-06-12T06:51:31.709Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-06-12T06:51:52.377Z',
                            placementStartedDate: '2023-06-12T06:51:37.883Z',
                            industry: {
                                id: 1633,
                                businessName: null,
                                phoneNumber: '03 9666 4500',
                                suburb: 'Thornbury VIC, Australia',
                                user: {
                                    id: 4875,
                                    name: 'Yooralla Ventilator Accommodation Support Service (VASS)',
                                    email: 'yooralla@yooralla.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2343,
            createdAt: '2023-01-31T08:20:31.357Z',
            familyName: 'Koumassadouno',
            studentId: '20853',
            phone: '0424242347',
            suburb: 'Botanic Ridge',
            expiryDate: '2024-05-01T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3387,
                name: 'Joshua Sahr ',
                email: 'joshuasahr19@yahoo.com',
                status: 'archived',
                avatar: 'https://skiltrak.org/public/uploaded/img/students/dps/1143232999AC0224047907217_P.jpg',
            },
            tickets: [],
            callLog: [
                {
                    id: 1351,
                    isActive: true,
                    createdAt: '2023-06-19T01:22:39.434Z',
                    updatedAt: '2023-06-19T01:22:39.434Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1631,
                    businessName: null,
                    suburb: 'Officer VIC, Australia',
                    user: {
                        id: 4873,
                        name: 'BJ Care Services ',
                        email: 'marketing@bjcareservices.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2037,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5345,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-12T03:03:28.823Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-06-12T03:03:41.357Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-06-20T04:40:14.226Z',
                            AgreementSignedDate: '2023-06-20T04:40:14.226Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-07-11T04:17:43.128Z',
                            placementStartedDate: '2023-06-20T04:40:24.099Z',
                            industry: {
                                id: 1631,
                                businessName: null,
                                phoneNumber: '0452 087 440',
                                suburb: 'Officer VIC, Australia',
                                user: {
                                    id: 4873,
                                    name: 'BJ Care Services ',
                                    email: 'marketing@bjcareservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2339,
            createdAt: '2023-01-31T08:20:15.545Z',
            familyName: null,
            studentId: '16256',
            phone: '0405 409 943',
            suburb: '',
            expiryDate: '2024-05-30T00:00:00.000Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3383,
                name: 'Ivone Gbamy Flomo',
                email: 'Gbamyivone@gmail.com',
                status: 'approved',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 55,
                user: {
                    name: 'Saad Tariq',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1412,
                    businessName: null,
                    suburb: 'wantirna south',
                    user: {
                        id: 4229,
                        name: 'Annecto inc',
                        email: 'Mary.rekaris@annecto.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1607,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 4380,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-03T05:01:07.273Z',
                            interviewDate: '2023-05-03T05:00:52.401Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-03T05:01:07.273Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-03T05:01:24.240Z',
                            AgreementSignedDate: '2023-05-03T05:01:24.240Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-02-14T10:39:07.387Z',
                            placementStartedDate: '2023-05-03T05:01:31.173Z',
                            industry: {
                                id: 1412,
                                businessName: null,
                                phoneNumber: '0431 169 411',
                                suburb: 'wantirna south',
                                user: {
                                    id: 4229,
                                    name: 'Annecto inc',
                                    email: 'Mary.rekaris@annecto.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2336,
            createdAt: '2023-01-31T08:20:03.298Z',
            familyName: 'Wehyee',
            studentId: '18133',
            phone: '0477786008',
            suburb: ' St Albans',
            expiryDate: '2023-11-28T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3380,
                name: 'Rufus',
                email: 'rufusco@live.com.au',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 10441,
                    isActive: true,
                    createdAt: '2023-09-25T07:27:32.809Z',
                    updatedAt: '2023-09-25T07:28:42.519Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1328,
                    businessName: 'Permalink Clayton',
                    suburb: 'Clayton South VIC, Australia',
                    user: {
                        id: 3838,
                        name: 'Permalink Clayton',
                        email: 'ramneek.kaur@permalink.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1924,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5385,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-27T00:47:05.450Z',
                            interviewDate: '2023-06-14T07:19:56.249Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-27T00:47:05.450Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-10T06:29:46.606Z',
                            AgreementSignedDate: '2023-07-10T06:29:46.606Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-09-25T07:29:09.825Z',
                            placementStartedDate: '2023-07-10T06:29:53.328Z',
                            industry: {
                                id: 1328,
                                businessName: 'Permalink Clayton',
                                phoneNumber: '0434328785',
                                suburb: 'Clayton South VIC, Australia',
                                user: {
                                    id: 3838,
                                    name: 'Permalink Clayton',
                                    email: 'ramneek.kaur@permalink.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2334,
            createdAt: '2023-01-31T08:19:53.793Z',
            familyName: 'Addo',
            studentId: '18529',
            phone: '416616387',
            suburb: ' Craigieburn',
            expiryDate: '2023-09-29T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3378,
                name: 'Joshua Addo',
                email: 'addojoshua@hotmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 13972,
                    isActive: true,
                    createdAt: '2023-10-30T01:44:39.604Z',
                    updatedAt: '2023-10-30T01:46:43.381Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1495,
                    businessName: null,
                    suburb: 'Craigieburn VIC, Australia',
                    user: {
                        id: 4522,
                        name: 'Miracle Health Services',
                        email: 'info@miraclehealthservices.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1746,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 48,
                        user: {
                            name: 'Saad Shah',
                        },
                    },
                    industries: [
                        {
                            id: 4686,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-16T07:36:56.414Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-16T07:36:56.414Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-04-26T17:22:57.930Z',
                            placementStartedDate: '2023-05-16T07:37:02.548Z',
                            industry: {
                                id: 1495,
                                businessName: null,
                                phoneNumber: '0484273599',
                                suburb: 'Craigieburn VIC, Australia',
                                user: {
                                    id: 4522,
                                    name: 'Miracle Health Services',
                                    email: 'info@miraclehealthservices.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2251,
            createdAt: '2023-01-31T08:12:44.423Z',
            familyName: null,
            studentId: '21005',
            phone: '0423964660',
            suburb: '',
            expiryDate: '2024-03-12T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3295,
                name: 'Punita Singh',
                email: 'sheryl363636@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 19033,
                    isActive: true,
                    createdAt: '2023-12-05T03:32:30.638Z',
                    updatedAt: '2023-12-05T03:35:06.388Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1379,
                    businessName: null,
                    suburb: 'Point Cook VIC, Australia',
                    user: {
                        id: 4045,
                        name: 'AMIGA Montessori Point Cook',
                        email: 'pointcook@amiga-montessori.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1276,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3609,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-14T03:31:14.689Z',
                            interviewDate: '2023-03-14T03:30:22.440Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-14T03:31:14.689Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-12-05T03:38:47.745Z',
                            AgreementSignedDate: '2023-12-05T03:38:47.745Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-12-05T03:40:31.237Z',
                            placementStartedDate: '2023-12-05T03:38:55.864Z',
                            industry: {
                                id: 1379,
                                businessName: null,
                                phoneNumber: '(03) 8353-1299',
                                suburb: 'Point Cook VIC, Australia',
                                user: {
                                    id: 4045,
                                    name: 'AMIGA Montessori Point Cook',
                                    email: 'pointcook@amiga-montessori.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2250,
            createdAt: '2023-01-31T08:12:40.689Z',
            familyName: 'shen',
            studentId: '21025',
            phone: '0448547836',
            suburb: 'Abbotsford VIC, Australia',
            expiryDate: '2024-03-12T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3294,
                name: 'siyuan Shen',
                email: 'ssy0926@live.cn',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 934,
                    businessName: 'Guardian Childcare & Education Kew East',
                    suburb: 'Kew East VIC, Australia',
                    user: {
                        id: 2016,
                        name: 'Guardian Childcare & Education Kew East',
                        email: 'KewEast@guardian.edu.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1390,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3852,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-04-18T05:45:58.638Z',
                            interviewDate: '2023-04-03T03:33:18.391Z',
                            awaitingWorkplaceResponseDate:
                                '2023-04-18T05:45:58.638Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-04-03T03:33:41.849Z',
                            AgreementSignedDate: '2023-04-03T03:33:41.849Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-24T08:09:23.113Z',
                            placementStartedDate: '2023-04-03T03:34:17.066Z',
                            industry: {
                                id: 934,
                                businessName:
                                    'Guardian Childcare & Education Kew East',
                                phoneNumber: '0390884040',
                                suburb: 'Kew East VIC, Australia',
                                user: {
                                    id: 2016,
                                    name: 'Guardian Childcare & Education Kew East',
                                    email: 'KewEast@guardian.edu.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2246,
            createdAt: '2023-01-31T08:12:23.951Z',
            familyName: null,
            studentId: '21026',
            phone: '450946066',
            suburb: '',
            expiryDate: '2024-06-15T14:55:41.102Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3290,
                name: 'Shumaila Bashir',
                email: 'shumailaba22@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1383,
                    businessName: null,
                    suburb: 'Doncaster East VIC, Australia',
                    user: {
                        id: 4052,
                        name: 'Mykidz early learning center',
                        email: 'mykidzelc@gmail.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1283,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3625,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-16T05:45:21.246Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-16T05:45:21.246Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-08-24T08:08:57.452Z',
                            placementStartedDate: '2023-08-24T08:08:46.095Z',
                            industry: {
                                id: 1383,
                                businessName: null,
                                phoneNumber: 'Phone 03 9841 7974',
                                suburb: 'Doncaster East VIC, Australia',
                                user: {
                                    id: 4052,
                                    name: 'Mykidz early learning center',
                                    email: 'mykidzelc@gmail.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2240,
            createdAt: '2023-01-31T08:11:53.925Z',
            familyName: null,
            studentId: '20963',
            phone: '0430875955',
            suburb: '',
            expiryDate: '2024-06-15T15:09:15.678Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3284,
                name: 'Navdeep Kaur',
                email: 'navdeepkaurnahal@y7mail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2125,
                    businessName: null,
                    suburb: 'St Albans VIC, Australia',
                    user: {
                        id: 6250,
                        name: 'Shine Early Learning Centre St Albans',
                        email: 'saintalbans.ns@shinepreschool.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3251,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 8142,
                            applied: true,
                            appliedDate: '2023-10-24T05:20:47.014Z',
                            caseOfficerAssignedDate: '2023-10-24T05:21:25.608Z',
                            interviewDate: '2023-10-24T05:21:07.968Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-24T05:21:25.608Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-24T05:21:25.612Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-10-24T05:21:53.782Z',
                            placementStartedDate: '2023-10-24T05:21:30.364Z',
                            industry: {
                                id: 2125,
                                businessName: null,
                                phoneNumber: '61399889121',
                                suburb: 'St Albans VIC, Australia',
                                user: {
                                    id: 6250,
                                    name: 'Shine Early Learning Centre St Albans',
                                    email: 'saintalbans.ns@shinepreschool.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2234,
            createdAt: '2023-01-31T08:11:28.988Z',
            familyName: null,
            studentId: '21017',
            phone: '0451917577',
            suburb: '',
            expiryDate: '2024-08-03T15:43:51.083Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3278,
                name: 'TRACY V LIAN',
                email: 'tracyhnem@gmail.com',
                status: 'blocked',
                avatar: 'https://skiltrak.org/public/uploaded/img/students/dps/11030417330877598_d93f7a82cd_z.jpg',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1190,
                    businessName: 'Burwood Neighbourhood house',
                    suburb: 'Burwood VIC, Australia',
                    user: {
                        id: 3691,
                        name: 'Burwood Neighbourhood house',
                        email: 'burwoodn@bigpond.net.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1625,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 4442,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-04T03:26:37.551Z',
                            interviewDate: '2023-05-04T03:26:19.338Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-04T03:26:37.551Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-05T05:36:23.248Z',
                            AgreementSignedDate: '2023-05-05T05:36:23.248Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-18T02:34:43.722Z',
                            placementStartedDate: '2023-05-05T05:36:30.071Z',
                            industry: {
                                id: 1190,
                                businessName: 'Burwood Neighbourhood house',
                                phoneNumber: '(03) 9808 6292',
                                suburb: 'Burwood VIC, Australia',
                                user: {
                                    id: 3691,
                                    name: 'Burwood Neighbourhood house',
                                    email: 'burwoodn@bigpond.net.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2227,
            createdAt: '2023-01-31T08:11:00.568Z',
            familyName: null,
            studentId: '20995',
            phone: '0416618377',
            suburb: '',
            expiryDate: '2024-05-04T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3271,
                name: 'Hifza Hafeez Sheikh',
                email: 'hafeezhifza80@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 55,
                user: {
                    name: 'Saad Tariq',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1375,
                    businessName: null,
                    suburb: 'Corio VIC, Australia',
                    user: {
                        id: 4033,
                        name: 'cloverdalecommunitycentre',
                        email: 'issaradaim.ccc@gmail.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1255,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3596,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-21T04:28:03.972Z',
                            interviewDate: '2023-03-21T04:27:42.716Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-21T04:28:03.972Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-03-29T04:48:14.622Z',
                            AgreementSignedDate: '2023-03-29T04:48:14.622Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-07-18T05:37:28.674Z',
                            placementStartedDate: '2023-03-29T10:01:49.255Z',
                            industry: {
                                id: 1375,
                                businessName: null,
                                phoneNumber: '0352 754415',
                                suburb: 'Corio VIC, Australia',
                                user: {
                                    id: 4033,
                                    name: 'cloverdalecommunitycentre',
                                    email: 'issaradaim.ccc@gmail.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2223,
            createdAt: '2023-01-31T08:10:45.888Z',
            familyName: null,
            studentId: '21010',
            phone: '0437979087',
            suburb: ' Geelong ',
            expiryDate: '2024-05-04T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3267,
                name: 'Christine Cahill',
                email: 'christinecahill67@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 17807,
                    isActive: true,
                    createdAt: '2023-11-27T04:26:58.603Z',
                    updatedAt: '2023-11-27T04:26:58.603Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 24,
                    code: 'CHC53315',
                    title: 'Diploma of Mental Health',
                    sector: {
                        name: 'Mental Health',
                    },
                },
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1206,
                    businessName: 'Wathaurong Aboriginal Co-operative',
                    suburb: 'North Geelong VIC, Australia',
                    user: {
                        id: 3707,
                        name: 'Wathaurong Aboriginal Co-operative',
                        email: 'admin@wathaurong.org.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1630,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 9433,
                            applied: true,
                            appliedDate: '2023-11-27T04:51:07.421Z',
                            caseOfficerAssignedDate: '2023-11-27T04:52:35.458Z',
                            interviewDate: '2023-11-27T04:51:17.457Z',
                            awaitingWorkplaceResponseDate:
                                '2023-11-27T04:52:35.458Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-11-27T04:52:47.755Z',
                            AgreementSignedDate: '2023-11-27T04:52:47.755Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-11-27T04:53:06.552Z',
                            placementStartedDate: '2023-11-27T04:52:54.108Z',
                            industry: {
                                id: 1206,
                                businessName:
                                    'Wathaurong Aboriginal Co-operative',
                                phoneNumber: '03 5277 0044',
                                suburb: 'North Geelong VIC, Australia',
                                user: {
                                    id: 3707,
                                    name: 'Wathaurong Aboriginal Co-operative',
                                    email: 'admin@wathaurong.org.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2214,
            createdAt: '2023-01-31T08:10:10.780Z',
            familyName: null,
            studentId: '20979',
            phone: '0434 944 509',
            suburb: '',
            expiryDate: '2023-06-17T14:51:27.608Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3258,
                name: 'Sanjida Akhter',
                email: 'sanjidaakhtershoma@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 55,
                user: {
                    name: 'Saad Tariq',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1391,
                    businessName: null,
                    suburb: 'Epping Vic',
                    user: {
                        id: 4069,
                        name: 'Meadowglen Primary School Kindergarten by Kids First',
                        email: 'test@test.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1306,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3658,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-17T17:41:37.924Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-17T17:41:37.924Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-03-17T17:49:36.380Z',
                            AgreementSignedDate: '2023-03-17T17:49:36.380Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-04T17:36:31.312Z',
                            placementStartedDate: '2023-03-17T17:49:45.466Z',
                            industry: {
                                id: 1391,
                                businessName: null,
                                phoneNumber: '0434797543',
                                suburb: 'Epping Vic',
                                user: {
                                    id: 4069,
                                    name: 'Meadowglen Primary School Kindergarten by Kids First',
                                    email: 'test@test.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2208,
            createdAt: '2023-01-31T08:09:49.848Z',
            familyName: null,
            studentId: '3265',
            phone: '0400316514',
            suburb: '',
            expiryDate: '2024-01-04T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3252,
                name: 'Tania Deba',
                email: 'tania.deba@hotmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 22951,
                    isActive: true,
                    createdAt: '2024-01-09T00:25:19.503Z',
                    updatedAt: '2024-01-09T00:25:19.503Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1468,
                    businessName: null,
                    suburb: 'Clayton South VIC, Australia',
                    user: {
                        id: 4467,
                        name: 'Direct Care Assistance',
                        email: 'info@directcareassistance.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1637,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 103,
                        user: {
                            name: 'Jake Tillman',
                        },
                    },
                    industries: [
                        {
                            id: 4465,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-01-24T03:06:47.628Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-04T13:41:36.436Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-04T07:46:16.823Z',
                            AgreementSignedDate: '2023-05-04T07:46:16.823Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-24T03:07:01.576Z',
                            placementStartedDate: '2023-05-04T07:44:39.492Z',
                            industry: {
                                id: 1468,
                                businessName: null,
                                phoneNumber: '0424 808 214',
                                suburb: 'Clayton South VIC, Australia',
                                user: {
                                    id: 4467,
                                    name: 'Direct Care Assistance',
                                    email: 'info@directcareassistance.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2207,
            createdAt: '2023-01-31T08:09:46.234Z',
            familyName: null,
            studentId: '19952',
            phone: '0449299712',
            suburb: '',
            expiryDate: '2024-02-29T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3251,
                name: 'Kavitha Channabasappa Jayappa',
                email: 'kavithadinesh98@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 13705,
                    isActive: true,
                    createdAt: '2023-10-25T04:30:26.467Z',
                    updatedAt: '2023-10-25T04:36:42.114Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1754,
                    businessName: null,
                    suburb: 'Hallam VIC, Australia',
                    user: {
                        id: 5268,
                        name: 'Hallam Community Learning Center',
                        email: 'admin@hallamclc.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 2050,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 6035,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-07-27T00:39:15.430Z',
                            interviewDate: '2023-07-20T02:35:08.759Z',
                            awaitingWorkplaceResponseDate:
                                '2023-07-27T00:39:15.430Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-06T05:12:35.456Z',
                            AgreementSignedDate: '2023-10-06T05:12:35.456Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-06T05:13:04.858Z',
                            placementStartedDate: '2023-10-06T05:12:50.468Z',
                            industry: {
                                id: 1754,
                                businessName: null,
                                phoneNumber: '+61 3 9703 1688',
                                suburb: 'Hallam VIC, Australia',
                                user: {
                                    id: 5268,
                                    name: 'Hallam Community Learning Center',
                                    email: 'admin@hallamclc.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2197,
            createdAt: '2023-01-31T08:08:38.970Z',
            familyName: 'Chawla',
            studentId: '12510',
            phone: '450880001',
            suburb: 'Mulgrave ',
            expiryDate: '2024-08-10T12:04:47.803Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3241,
                name: 'Jasmeen Kaur',
                email: 'jassiarora1987@yahoo.in',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 25604,
                    isActive: true,
                    createdAt: '2024-01-25T06:50:40.498Z',
                    updatedAt: '2024-05-03T02:23:54.801Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1057,
                    businessName: 'St James Terrace',
                    suburb: 'Cheltenham VIC, Australia',
                    user: {
                        id: 3558,
                        name: 'St James Terrace Aged Care Cheltenham',
                        email: 'hr@stjamesterrace.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2371,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 76,
                        user: {
                            name: 'Haris Abdullah',
                        },
                    },
                    industries: [
                        {
                            id: 6180,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2024-05-01T15:42:00.999Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate: null,
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-05-10T12:04:11.132Z',
                            placementStartedDate: null,
                            industry: {
                                id: 1771,
                                businessName: null,
                                phoneNumber: '0420861066',
                                suburb: 'St. Kilda VIC, Australia',
                                user: {
                                    id: 5456,
                                    name: 'La Cabra Mexican',
                                    email: 'hawthorn@lacabramexican.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2176,
            createdAt: '2023-01-31T08:07:15.577Z',
            familyName: '-',
            studentId: '21011',
            phone: '424423070',
            suburb: '-',
            expiryDate: '2024-08-03T15:24:50.984Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3220,
                name: 'Shikshya Adhikari',
                email: 'Shikshya_125@hotmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 8775,
                    isActive: true,
                    createdAt: '2023-09-11T07:29:39.349Z',
                    updatedAt: '2023-09-11T07:31:33.071Z',
                    isAnswered: false,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 67,
                user: {
                    name: 'Adam Hillcrest',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
            ],
            industries: [
                {
                    id: 1332,
                    businessName: 'bascare',
                    suburb: 'Canterbury VIC, Australia',
                    user: {
                        id: 3842,
                        name: 'bascare',
                        email: 'lulu.l@bascare.org.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1847,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 4908,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-25T07:39:47.405Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-25T07:40:00.433Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-25T07:40:21.872Z',
                            AgreementSignedDate: '2023-05-25T07:40:21.872Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-05-25T07:40:54.257Z',
                            placementStartedDate: '2023-05-25T07:40:38.854Z',
                            industry: {
                                id: 1332,
                                businessName: 'bascare',
                                phoneNumber: '0388094941',
                                suburb: 'Canterbury VIC, Australia',
                                user: {
                                    id: 3842,
                                    name: 'bascare',
                                    email: 'lulu.l@bascare.org.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2151,
            createdAt: '2023-01-31T08:05:42.922Z',
            familyName: 'Kaplish',
            studentId: '02056',
            phone: '0470206711',
            suburb: 'Brookfield ',
            expiryDate: '2023-10-15T00:00:00.000Z',
            studentStatus: 'expired',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3195,
                name: 'Nancy',
                email: 'nkaplish323@gmail.com',
                status: 'archived',
                avatar: 'https://skiltrak.org/public/uploaded/img/students/dps/21572929BAE708-BEE3-4689-9EE7-E05F0C180D8E.jpeg',
            },
            tickets: [],
            callLog: [
                {
                    id: 25384,
                    isActive: true,
                    createdAt: '2024-01-24T03:09:35.496Z',
                    updatedAt: '2024-01-24T03:09:35.496Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [],
            workplace: [
                {
                    id: 1879,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5010,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-31T05:14:56.822Z',
                            interviewDate: '2023-05-30T04:28:16.612Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-31T05:14:56.822Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-01-24T03:15:14.141Z',
                            placementStartedDate: null,
                            industry: {
                                id: 1119,
                                businessName: 'Annecto',
                                phoneNumber: '0353663000/+61399712118',
                                suburb: 'Maddingley VIC, Australia',
                                user: {
                                    id: 3620,
                                    name: 'Annecto Melton',
                                    email: 'Loran.Cressey@annecto.org.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2140,
            createdAt: '2023-01-31T08:05:03.703Z',
            familyName: ' Walia',
            studentId: '20921',
            phone: '0435990008',
            suburb: 'Wollert VIC, Australia',
            expiryDate: '2024-07-10T15:02:19.129Z',
            studentStatus: 'active',
            nonContactable: true,
            isHighPriority: false,
            user: {
                id: 3184,
                name: 'Avneet Kaur Walia',
                email: 'Avneet_walia@yahoo.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 17645,
                    isActive: true,
                    createdAt: '2023-11-24T05:05:56.161Z',
                    updatedAt: '2023-11-24T05:05:56.161Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 21,
                    code: 'CHC50113',
                    title: 'Diploma of early Childhood, Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 2295,
                    businessName: null,
                    suburb: 'Wollert VIC, Australia',
                    user: {
                        id: 6518,
                        name: 'Aspire Childcare Centre',
                        email: 'www.aelcck@gmail.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3257,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 80,
                        user: {
                            name: 'Billy Otis',
                        },
                    },
                    industries: [
                        {
                            id: 8159,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-10-24T06:51:45.304Z',
                            interviewDate: '2023-10-24T06:47:55.990Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-24T06:51:45.304Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-24T07:01:00.008Z',
                            AgreementSignedDate: '2023-10-24T07:01:00.008Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-24T07:05:02.916Z',
                            placementStartedDate: '2023-10-24T07:01:57.315Z',
                            industry: {
                                id: 2295,
                                businessName: null,
                                phoneNumber: '1800 978 429',
                                suburb: 'Wollert VIC, Australia',
                                user: {
                                    id: 6518,
                                    name: 'Aspire Childcare Centre',
                                    email: 'www.aelcck@gmail.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2137,
            createdAt: '2023-01-31T08:04:52.339Z',
            familyName: null,
            studentId: '20850',
            phone: '0444555140',
            suburb: '',
            expiryDate: '2024-06-15T14:59:16.108Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3181,
                name: 'KOKULAN NISHEATHANA',
                email: 'NISHEATHANA@GMAIL.COM',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 21,
                    code: 'CHC50113',
                    title: 'Diploma of early Childhood, Education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1385,
                    businessName: null,
                    suburb: 'Lyndhurst ',
                    user: {
                        id: 4056,
                        name: 'Great Beginnings Lyndhurst',
                        email: 'lyndhurst@greatbeginnings.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1286,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3628,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-16T03:44:30.787Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-16T03:44:30.787Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-08-25T01:00:58.386Z',
                            placementStartedDate: '2023-03-20T03:18:28.922Z',
                            industry: {
                                id: 1385,
                                businessName: null,
                                phoneNumber: '(03) 8782 0099',
                                suburb: 'Lyndhurst ',
                                user: {
                                    id: 4056,
                                    name: 'Great Beginnings Lyndhurst',
                                    email: 'lyndhurst@greatbeginnings.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2132,
            createdAt: '2023-01-31T08:04:34.013Z',
            familyName: 'Sushila',
            studentId: '20945',
            phone: '478895589',
            suburb: 'Fraser Rise',
            expiryDate: '2024-08-03T15:50:25.830Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3176,
                name: 'Poonia ',
                email: 'sushilapoonia.raj@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 1998,
                    isActive: true,
                    createdAt: '2023-06-30T05:48:56.937Z',
                    updatedAt: '2023-06-30T05:52:14.485Z',
                    isAnswered: true,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1656,
                    businessName: null,
                    suburb: 'Caroline Springs VIC, Australia',
                    user: {
                        id: 4948,
                        name: 'Whiz Kids Caroline springs',
                        email: 'carolinesprings@whizkidz.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1766,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5459,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-20T04:59:44.732Z',
                            interviewDate: '2023-06-20T04:59:28.618Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-20T04:59:44.732Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-10-26T03:29:56.773Z',
                            AgreementSignedDate: '2023-10-26T03:29:56.773Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-10-26T03:34:51.388Z',
                            placementStartedDate: '2023-10-26T03:34:37.712Z',
                            industry: {
                                id: 1656,
                                businessName: null,
                                phoneNumber: ' 03 8351 2788',
                                suburb: 'Caroline Springs VIC, Australia',
                                user: {
                                    id: 4948,
                                    name: 'Whiz Kids Caroline springs',
                                    email: 'carolinesprings@whizkidz.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2130,
            createdAt: '2023-01-31T08:04:26.338Z',
            familyName: null,
            studentId: '20946',
            phone: '0406467235',
            suburb: '',
            expiryDate: '2024-06-15T14:59:02.199Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3174,
                name: 'Mandeep kaur',
                email: 'bahgamanu@yahoo.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 15393,
                    isActive: true,
                    createdAt: '2023-11-10T03:03:37.414Z',
                    updatedAt: '2023-11-10T03:03:37.414Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1405,
                    businessName: null,
                    suburb: 'Epping VIC, Australia',
                    user: {
                        id: 4147,
                        name: 'Story House Early Learning Epping',
                        email: 'epping@shel.edu.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1339,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: true,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 3719,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-27T04:04:03.614Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-03-27T04:04:03.614Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-10-16T04:32:00.485Z',
                            placementStartedDate: '2023-03-27T04:04:15.000Z',
                            industry: {
                                id: 1405,
                                businessName: null,
                                phoneNumber: '+61 3 9408 1586',
                                suburb: 'Epping VIC, Australia',
                                user: {
                                    id: 4147,
                                    name: 'Story House Early Learning Epping',
                                    email: 'epping@shel.edu.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2128,
            createdAt: '2023-01-31T08:04:18.758Z',
            familyName: null,
            studentId: '20933',
            phone: '0420297752',
            suburb: '',
            expiryDate: '2024-02-06T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3172,
                name: 'Amina Baqaie',
                email: 'Aminabaqaie89@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 17,
                    code: 'CHCECE031',
                    title: 'Cert III in Early childhood education and Care',
                    sector: {
                        name: 'Early Childhood, Education and Care',
                    },
                },
            ],
            industries: [
                {
                    id: 1303,
                    businessName: 'Hallam Early Learning',
                    suburb: 'Hallam VIC, Australia',
                    user: {
                        id: 3812,
                        name: 'Hallam Early Learning',
                        email: 'hallamearlylearning@gmail.com',
                        avatar: '',
                    },
                },
                {
                    id: 941,
                    businessName:
                        'Guardian Childcare & Education Mulgrave East',
                    suburb: ' Mulgrave',
                    user: {
                        id: 2026,
                        name: 'Guardian Childcare & Education Mulgrave East',
                        email: 'MulgraveEast@guardian.edu.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1567,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4247,
                            applied: true,
                            appliedDate: '2023-04-27T02:33:39.973Z',
                            caseOfficerAssignedDate: '2023-04-27T02:34:40.601Z',
                            interviewDate: '2023-04-27T02:34:13.879Z',
                            awaitingWorkplaceResponseDate:
                                '2023-04-27T02:34:40.601Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-12-05T04:33:33.041Z',
                            AgreementSignedDate: '2023-12-05T04:33:33.041Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T02:41:53.031Z',
                            placementStartedDate: '2023-12-05T04:33:37.790Z',
                            industry: {
                                id: 1303,
                                businessName: 'Hallam Early Learning',
                                phoneNumber: '0387957918',
                                suburb: 'Hallam VIC, Australia',
                                user: {
                                    id: 3812,
                                    name: 'Hallam Early Learning',
                                    email: 'hallamearlylearning@gmail.com',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2117,
            createdAt: '2023-01-31T08:03:34.635Z',
            familyName: 'Terhas',
            studentId: '20823',
            phone: '0479043401',
            suburb: 'Albion ',
            expiryDate: '2023-09-19T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3161,
                name: 'Gerezghier ',
                email: 'terhasmekonen0@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 2764,
                    isActive: true,
                    createdAt: '2023-07-11T00:44:45.189Z',
                    updatedAt: '2023-07-11T00:44:45.189Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: {
                id: 47,
                user: {
                    name: 'Qandeel Tanoli',
                },
            },
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 1657,
                    businessName: null,
                    suburb: 'Sunshine North VIC, Australia',
                    user: {
                        id: 4950,
                        name: 'Cumberland Manor',
                        email: 'info@cumberlandmanor.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1701,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 5464,
                            applied: true,
                            appliedDate: '2023-07-05T07:25:41.377Z',
                            caseOfficerAssignedDate: '2023-06-20T05:37:02.009Z',
                            interviewDate: '2023-07-11T00:51:08.180Z',
                            awaitingWorkplaceResponseDate:
                                '2023-07-11T00:52:03.943Z',
                            appointmentBookedDate: '2023-07-11T00:51:28.043Z',
                            awaitingAgreementSignedDate:
                                '2023-08-09T05:40:46.441Z',
                            AgreementSignedDate: '2023-08-09T05:40:46.441Z',
                            cancelledDate: null,
                            isCompletedDate: '2023-08-09T05:41:02.570Z',
                            placementStartedDate: '2023-08-09T05:40:51.382Z',
                            industry: {
                                id: 1657,
                                businessName: null,
                                phoneNumber: '03 9311 7079',
                                suburb: 'Sunshine North VIC, Australia',
                                user: {
                                    id: 4950,
                                    name: 'Cumberland Manor',
                                    email: 'info@cumberlandmanor.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2115,
            createdAt: '2023-01-31T08:03:25.811Z',
            familyName: null,
            studentId: '20816',
            phone: '0416281964',
            suburb: '',
            expiryDate: '2023-05-28T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3159,
                name: 'San Pedro Ma Teresa',
                email: 'krizel.sanpedro@yahoo.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 1225,
                    isActive: true,
                    createdAt: '2023-06-15T04:12:27.918Z',
                    updatedAt: '2023-06-15T04:12:27.918Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 851,
                    businessName: 'Oaklea Hall Aged Care',
                    suburb: 'Hughesdale VIC, Australia',
                    user: {
                        id: 1867,
                        name: 'Oaklea Hall Aged Care',
                        email: 'oakleahalladmin@maacg.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1702,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4582,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-11T05:15:35.363Z',
                            interviewDate: '2023-05-11T05:14:53.332Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-11T05:15:35.363Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T02:43:09.365Z',
                            placementStartedDate: '2023-07-06T03:49:34.060Z',
                            industry: {
                                id: 851,
                                businessName: 'Oaklea Hall Aged Care',
                                phoneNumber: '61395690988',
                                suburb: 'Hughesdale VIC, Australia',
                                user: {
                                    id: 1867,
                                    name: 'Oaklea Hall Aged Care',
                                    email: 'oakleahalladmin@maacg.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2114,
            createdAt: '2023-01-31T08:03:21.983Z',
            familyName: null,
            studentId: '20803',
            phone: '481781240',
            suburb: '',
            expiryDate: '2024-06-15T15:08:22.195Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 3158,
                name: 'Jalbuena Jovelyn',
                email: 'jalbuenajovelyn@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 1270,
                    businessName: 'Nellie Melba Retirement Village',
                    suburb: 'Wheelers Hill VIC, Australia',
                    user: {
                        id: 3771,
                        name: 'Nellie Melba Retirement Village',
                        email: 'lincoln.li@nelliemelbavillage.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 1768,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 47,
                        user: {
                            name: 'Qandeel Tanoli',
                        },
                    },
                    industries: [
                        {
                            id: 4744,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-18T05:58:15.062Z',
                            interviewDate: '2023-05-18T05:56:29.055Z',
                            awaitingWorkplaceResponseDate:
                                '2023-05-18T05:58:15.062Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-05-18T05:58:31.405Z',
                            placementStartedDate: '2023-05-18T05:58:20.655Z',
                            industry: {
                                id: 1270,
                                businessName: 'Nellie Melba Retirement Village',
                                phoneNumber: '61385131900',
                                suburb: 'Wheelers Hill VIC, Australia',
                                user: {
                                    id: 3771,
                                    name: 'Nellie Melba Retirement Village',
                                    email: 'lincoln.li@nelliemelbavillage.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 2106,
            createdAt: '2023-01-31T08:02:49.771Z',
            familyName: 'Grewal',
            studentId: '20967',
            phone: '0468952358',
            suburb: 'Pakenham VIC, Australia',
            expiryDate: '2024-06-15T11:57:09.074Z',
            studentStatus: 'active',
            nonContactable: true,
            isHighPriority: false,
            user: {
                id: 3150,
                name: 'Manpreet Kaur ',
                email: 'manpreetgrewal78954@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 13811,
                    isActive: true,
                    createdAt: '2023-10-26T04:32:04.213Z',
                    updatedAt: '2023-10-26T04:32:04.213Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 19,
                    code: 'CHC43115',
                    title: 'Certificate IV in Disability',
                    sector: {
                        name: 'Disability',
                    },
                },
                {
                    id: 20,
                    code: 'CHC33015',
                    title: 'Certificate III in Individual Support',
                    sector: {
                        name: 'Individual Support',
                    },
                },
            ],
            industries: [
                {
                    id: 2021,
                    businessName: null,
                    suburb: 'Hallam VIC, Australia',
                    user: {
                        id: 6027,
                        name: 'Waverly Social Enterprises Hallam',
                        email: 'Noella.Malabar@wavind.org',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 3225,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 67,
                        user: {
                            name: 'Adam Hillcrest',
                        },
                    },
                    industries: [
                        {
                            id: 8209,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-11-21T23:20:26.178Z',
                            interviewDate: '2023-10-26T03:34:05.069Z',
                            awaitingWorkplaceResponseDate:
                                '2023-10-26T03:37:56.800Z',
                            appointmentBookedDate: '2023-10-26T03:34:20.038Z',
                            awaitingAgreementSignedDate:
                                '2023-10-26T03:37:56.804Z',
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2024-01-04T02:43:31.030Z',
                            placementStartedDate: '2023-11-21T23:20:43.525Z',
                            industry: {
                                id: 2021,
                                businessName: null,
                                phoneNumber: '(03) 9544 7222',
                                suburb: 'Hallam VIC, Australia',
                                user: {
                                    id: 6027,
                                    name: 'Waverly Social Enterprises Hallam',
                                    email: 'Noella.Malabar@wavind.org',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 1820,
            createdAt: '2023-01-31T07:40:02.720Z',
            familyName: 'Tirant',
            studentId: '20092',
            phone: '0401589940',
            suburb: 'Narre Warren',
            expiryDate: '2024-06-15T15:04:04.114Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 2864,
                name: 'Lisa ',
                email: 'lisabarber321@hotmail.com',
                status: 'blocked',
                avatar: 'https://skiltrak.org/public/uploaded/img/students/dps/2012102022-04-11_053759.jpg',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1374,
                    businessName: null,
                    suburb: 'Cranbourne South VIC, Australia',
                    user: {
                        id: 4026,
                        name: 'Link Assist',
                        email: 'bianca@mylinkassist.com.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1360,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3763,
                            applied: true,
                            appliedDate: '2023-03-29T10:14:38.712Z',
                            caseOfficerAssignedDate: '2023-03-29T10:26:23.343Z',
                            interviewDate: '2023-03-29T10:25:53.057Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-29T10:26:23.343Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-03-30T07:04:30.507Z',
                            AgreementSignedDate: '2023-03-30T07:04:30.507Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-13T12:14:42.819Z',
                            placementStartedDate: '2023-03-30T07:04:44.571Z',
                            industry: {
                                id: 1374,
                                businessName: null,
                                phoneNumber: '03 9789 8424',
                                suburb: 'Cranbourne South VIC, Australia',
                                user: {
                                    id: 4026,
                                    name: 'Link Assist',
                                    email: 'bianca@mylinkassist.com.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 1679,
            createdAt: '2023-01-31T07:30:04.853Z',
            familyName: 'lebon',
            studentId: '20542',
            phone: '0422571098',
            suburb: 'narre warren south',
            expiryDate: '2023-08-30T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 2723,
                name: 'Jessique Lebon',
                email: 'jessiquelebon19@gmail.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [
                {
                    id: 2103,
                    isActive: true,
                    createdAt: '2023-07-03T06:56:08.447Z',
                    updatedAt: '2023-07-03T06:56:08.447Z',
                    isAnswered: null,
                    isExpired: false,
                },
            ],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1055,
                    businessName: 'The Bridge',
                    suburb: 'Dandenong VIC, Australia',
                    user: {
                        id: 3556,
                        name: 'The Bridge Inc',
                        email: 'volunteer@thebridgeinc.org.au',
                        avatar: 'https://skiltrak.org/public/uploaded/img/industries/dps/105325THE_BRIDGE_CORP_POS_H_CMYK___logo.png',
                    },
                },
                {
                    id: 847,
                    businessName: 'Casey Aged Care',
                    suburb: 'Coburg VIC, Australia',
                    user: {
                        id: 1859,
                        name: 'Casey Aged Care',
                        email: 'cacadmin@maacg.com.au',
                        avatar: '',
                    },
                },
            ],
            workplace: [
                {
                    id: 2034,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: false,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 5427,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-06-23T04:07:49.421Z',
                            interviewDate: '2023-06-16T11:58:25.442Z',
                            awaitingWorkplaceResponseDate:
                                '2023-06-23T04:07:49.421Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-07-05T04:31:24.653Z',
                            AgreementSignedDate: '2023-07-05T04:31:24.653Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-03-13T13:01:34.214Z',
                            placementStartedDate: '2023-08-18T04:34:11.157Z',
                            industry: {
                                id: 847,
                                businessName: 'Casey Aged Care',
                                phoneNumber: '0397054200',
                                suburb: 'Coburg VIC, Australia',
                                user: {
                                    id: 1859,
                                    name: 'Casey Aged Care',
                                    email: 'cacadmin@maacg.com.au',
                                    avatar: '',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 1670,
            createdAt: '2023-01-31T07:29:34.285Z',
            familyName: null,
            studentId: '18539',
            phone: '0432369525',
            suburb: 'Clyde North ',
            expiryDate: '2024-06-15T15:09:28.949Z',
            studentStatus: 'active',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 2714,
                name: 'Peter Kerkulah',
                email: 'peterkerkulah2@gmail.com',
                status: 'blocked',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1409,
                    businessName: null,
                    suburb: 'Hawthorn VIC, Australia',
                    user: {
                        id: 4222,
                        name: 'Scope Australia',
                        email: 'mabiodun@scopeaust.org.au',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1351,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 55,
                        user: {
                            name: 'Saad Tariq',
                        },
                    },
                    industries: [
                        {
                            id: 3742,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-03-29T06:20:39.572Z',
                            interviewDate: '2023-03-29T04:37:19.778Z',
                            awaitingWorkplaceResponseDate:
                                '2023-03-29T06:20:39.572Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate: null,
                            AgreementSignedDate: null,
                            cancelledDate: null,
                            isCompletedDate: '2023-06-06T00:24:23.565Z',
                            placementStartedDate: '2023-06-06T00:23:28.082Z',
                            industry: {
                                id: 1409,
                                businessName: null,
                                phoneNumber: '0458211695',
                                suburb: 'Hawthorn VIC, Australia',
                                user: {
                                    id: 4222,
                                    name: 'Scope Australia',
                                    email: 'mabiodun@scopeaust.org.au',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            id: 1665,
            createdAt: '2023-01-31T07:29:13.967Z',
            familyName: null,
            studentId: '17641',
            phone: '0430421530',
            suburb: '',
            expiryDate: '2023-05-31T00:00:00.000Z',
            studentStatus: 'completed',
            nonContactable: false,
            isHighPriority: false,
            user: {
                id: 2709,
                name: 'Smita Davda',
                email: 'smita.davda@outlook.com',
                status: 'archived',
                avatar: '',
            },
            tickets: [],
            callLog: [],
            subadmin: null,
            rto: {
                id: 28,
                user: {
                    id: 55,
                    name: 'Job Training Institute',
                    email: 'tauseef@jti.edu.au',
                    avatar: 'https://skiltrak-dev.s3.ap-southeast-2.amazonaws.com/profile/71_profile.png',
                },
            },
            courses: [
                {
                    id: 25,
                    code: 'CHC52015',
                    title: 'Diploma of Community Services (Case Management)',
                    sector: {
                        name: 'Community Services',
                    },
                },
            ],
            industries: [
                {
                    id: 1499,
                    businessName: null,
                    suburb: 'Cranbourne VIC, Australia',
                    user: {
                        id: 4526,
                        name: 'Sparsh care Services',
                        email: 'jobvish99@yahoo.com',
                        avatar: null,
                    },
                },
            ],
            workplace: [
                {
                    id: 1755,
                    currentStatus: 'completed',
                    studentProvidedWorkplace: false,
                    byExistingAbn: true,
                    assignedTo: {
                        id: 69,
                        user: {
                            name: 'Harry Thompson',
                        },
                    },
                    industries: [
                        {
                            id: 4713,
                            applied: true,
                            appliedDate: null,
                            caseOfficerAssignedDate: '2023-05-17T05:18:33.744Z',
                            interviewDate: null,
                            awaitingWorkplaceResponseDate:
                                '2023-05-17T05:18:54.345Z',
                            appointmentBookedDate: null,
                            awaitingAgreementSignedDate:
                                '2023-05-17T05:19:56.324Z',
                            AgreementSignedDate: '2023-05-17T05:19:56.324Z',
                            cancelledDate: null,
                            isCompletedDate: '2024-01-31T15:39:09.814Z',
                            placementStartedDate: '2023-05-17T05:20:23.933Z',
                            industry: {
                                id: 1499,
                                businessName: null,
                                phoneNumber: '0433023407',
                                suburb: 'Cranbourne VIC, Australia',
                                user: {
                                    id: 4526,
                                    name: 'Sparsh care Services',
                                    email: 'jobvish99@yahoo.com',
                                    avatar: null,
                                },
                            },
                        },
                    ],
                },
            ],
        },
    ]

    console.log({
        KKK: abc?.filter((a: any) => a?.studentStatus === 'completed'),
    })
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 mt-[18px]">
            <div className="flex flex-col">
                <div className="flex-grow">
                    <div className="h-full">
                        <ProfileCounts statisticsCount={statisticsCount} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex-grow">
                    <Card shadowType="profile" fullHeight>
                        <RtoProfileProgress statisticsCount={statisticsCount} />
                    </Card>
                </div>
            </div>
        </div>
    )
}
