import {
    PersonalInfoForm,
    workplaceQuestions,
    workplaceQuestionsKeys,
} from '@partials/common'
import { useGetStudentCoursesQuery } from '@queries'
import { useRouter } from 'next/router'

type PersonalInfoProps = {
    setActive: any
    setPersonalInfoData: any
    personalInfoData: any
}

export const PersonalInfo = ({
    setActive,
    setPersonalInfoData,
    personalInfoData,
}: PersonalInfoProps) => {
    const router = useRouter()
    const { id } = router.query
    const courses = useGetStudentCoursesQuery()
    // const [courses, setCourses] = useState<any>([])

    const onSubmit = (values: any) => {
        let questions: {
            question: string
            answer: string | any
            type: string
        }[] = []
        Object.entries(workplaceQuestions).forEach(([key, value]: string[]) => {
            if (key === workplaceQuestionsKeys.suburb) {
                questions.push({
                    question: value,
                    answer: {
                        suburb: values[key],
                        zip: values['zip'],
                    },
                    type: key,
                })
            } else if (key === workplaceQuestionsKeys.supervisorMeeting) {
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
            } else if (key === workplaceQuestionsKeys.possession) {
                questions.push({
                    question: value,
                    answer: values[key]?.join(','),
                    type: key,
                })
            } else {
                questions.push({
                    question: value,
                    answer: values[key],
                    type: key,
                })
            }
        })

        setPersonalInfoData({
            courses: values?.courses?.value,
            preferableLocation: values?.suburb,
            questions,
            // courses: values?.courses?.value,
            // haveTransport: values.haveTransport === 'yes' ? true : false,
            // haveDrivingLicense:
            //     values.haveDrivingLicense === 'yes' ? true : false,
        })
        setActive((active: number) => active + 1)
    }

    return (
        <div>
            <PersonalInfoForm
                courses={courses}
                onSubmit={onSubmit}
                personalInfoData={personalInfoData}
            />
        </div>
    )
}
