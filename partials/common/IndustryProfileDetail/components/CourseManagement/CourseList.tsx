import { CourseItem } from './CourseItem'

export const CourseList = ({
    course,
    requestList,
}: {
    course?: any
    requestList: any
}) => {
    return (
        <div className="divide-y">
            <CourseItem requestList={requestList} />
        </div>
    )
}
