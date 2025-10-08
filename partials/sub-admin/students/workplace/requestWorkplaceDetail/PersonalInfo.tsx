import {
    PersonalInfoForm,
    workplaceQuestions,
    workplaceQuestionsKeys,
} from '@partials/common'

type PersonalInfoProps = {
    setActive: any
    setPersonalInfoData: any
    personalInfoData: any
    courses: any
    userId?: number
}

export const PersonalInfo = ({
    setActive,
    personalInfoData,
    setPersonalInfoData,
    courses,
    userId,
}: PersonalInfoProps) => {
    const onSubmit = (values: any) => {
        let questions: {
            question: string
            answer: string | any
            type: string
        }[] = []
        Object.entries(workplaceQuestions).forEach(([key, value]: string[]) => {
            if (key === workplaceQuestionsKeys.suburb) {
                if (values[key]) {
                    questions.push({
                        question: value,
                        answer: {
                            suburb: values[key],
                            zip: values['zip'],
                        },
                        type: key,
                    })
                }
            } else if (key === workplaceQuestionsKeys.supervisorMeeting) {
                if (values['supervisorMeetingDate1']) {
                    questions.push({
                        question: value,
                        answer: {
                            supervisorMeetingDate1:
                                values['supervisorMeetingDate1'],
                            supervisorMeetingDate2:
                                values['supervisorMeetingDate2'],
                        },
                        type: key,
                    })
                }
            } else if (
                key === workplaceQuestionsKeys.possession ||
                key === workplaceQuestionsKeys.serviceOffered
            ) {
                if (values[key]) {
                    questions.push({
                        question: value,
                        answer: values[key]?.join(','),
                        type: key,
                    })
                }
            } else if (key === workplaceQuestionsKeys.preferredContactTime) {
                if (values[key]) {
                    questions.push({
                        question: value,
                        answer: `Days : ${values[
                            workplaceQuestionsKeys.preferredContactTime
                        ]?.days?.join(', ')}, Time Slots : ${
                            values[workplaceQuestionsKeys.preferredContactTime]
                                ?.timeSlot
                        }`,
                        type: key,
                    })
                }
            } else {
                if (values[key]) {
                    questions.push({
                        question: value,
                        answer: values[key],
                        type: key,
                    })
                }
            }
        })

        setPersonalInfoData({
            // ...values,
            courses: values?.courses?.value,
            preferableLocation: values?.suburb,
            questions,
            // haveTransport: values.haveTransport === 'yes' ? true : false,
            // haveDrivingLicense:
            //     values.haveDrivingLicense === 'yes' ? true : false,
        })
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <PersonalInfoForm
                userId={userId}
                courses={courses}
                onSubmit={onSubmit}
                personalInfoData={personalInfoData}
            />
        </div>
    )
}
