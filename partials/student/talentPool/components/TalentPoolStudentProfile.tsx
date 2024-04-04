import { useRouter } from 'next/router'
import { StudentFeedback } from './StudentFeedback'
import { TalentPoolStudentPersonalInfo } from './TalentPoolStudentPersonalInfo'
import { TalentPoolStudentProfileDetail } from './TalentPoolStudentProfileDetail'

export const TalentPoolStudentProfile = ({ data }: any) => {
    const router = useRouter()

    return (
        <div className="rounded-r-md rounded-l-md flex flex-col gap-y-3.5">
            <TalentPoolStudentPersonalInfo data={data} />
            <TalentPoolStudentProfileDetail data={data} />
            <StudentFeedback />
        </div>
    )
}
