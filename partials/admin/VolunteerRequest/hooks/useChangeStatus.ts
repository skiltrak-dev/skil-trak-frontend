import { AdminApi } from '@queries'
import { Student, UserStatus } from '@types'
import { VolunteerRequestEnum } from '../enum'

export const useChangeStatus = () => {
    const [changeStatus, changeStatusResult] =
        AdminApi.Volunteer.changeRequestStatus()

    const onAccept = async (volunteer: any) => {
        await changeStatus({
            id: volunteer.id,
            note: volunteer?.note,
            status: VolunteerRequestEnum.APPROVED,
        })
    }

    const onCancelled = async (volunteer: any) => {
        await changeStatus({
            id: volunteer.id,
            note: volunteer?.note,
            status: VolunteerRequestEnum.CANCELLED,
        })
    }

    const onReject = async (volunteer: any) => {
        await changeStatus({
            id: volunteer.id,
            note: volunteer?.note,
            status: VolunteerRequestEnum.REJECTED,
        })
    }

    // const onBlock = async (student: Student) => {
    //     await changeStatus({ id: student.id, status: UserStatus.Blocked })
    // }

    return {
        onAccept,
        onReject,
        onCancelled,
        // onArchive,
        changeStatusResult,
    }
}
