
import { useState } from 'react'
import { AssessmentCourse } from '../components'

type Props = {}

export const AssessmentCourses = (props: Props) => {
   const [select, setSelect] = useState(1);
   
    const courses = [
        {
            id: 1,
            code: 'CHC52015',
            name: 'Diploma of Community Services',
        },
        {
            id: 2,
            code: 'CHC53315',
            name: 'Diploma of Mental Health',
        },
       
    ];

    return (
        <div>
            {courses.map((course, index) => (
                <>
                    <AssessmentCourse
                        code={course.code}
                        name={course.name}
                        selected={select}
                        id={course.id}
                    />
                </>
            ))}
        </div>
    )
}
