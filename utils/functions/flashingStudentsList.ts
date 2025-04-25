import { CallLog, Student, UserStatus } from '@types'
import moment from 'moment'
import { isWorkplaceValid } from 'utils/workplaceRowBlinking'

export const findCallLogsUnanswered = (student: Student[]) =>
    student?.filter((student) => {
        const unansweredCalls = student?.callLog?.filter((call: CallLog) => {
            if (call?.isAnswered === null) {
                const isMoreThanSevenDays =
                    moment().diff(moment(call?.createdAt), 'days') >= 7
                return isMoreThanSevenDays
            }
            return false
        })

        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement: any) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )

        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            unansweredCalls?.length > 0
        )
    })
export const findExpiringInNext45Days = (student: Student[]) =>
    student?.filter((student) => {
        const expiryDate = new Date(student?.expiryDate)
        const currentDate = new Date()
        const timeDiff = expiryDate.getTime() - currentDate.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        const checkPlacementStarted =
            student?.workplace?.length &&
            student?.workplace?.some(
                (placement) =>
                    placement?.currentStatus === 'completed' ||
                    placement?.currentStatus === 'placementStarted'
            )
        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            !checkPlacementStarted &&
            // student?.workplace?.length === 0 &&
            daysDiff <= 45 &&
            daysDiff >= 0
        )
    })

export const filterAwaitingAgreementBeyondSevenDays = (student: Student[]) =>
    student?.filter((student) => {
        return (
            !student?.hasIssue &&
            !student?.isSnoozed &&
            !student?.nonContactable &&
            student?.workplace?.some((workplace) => isWorkplaceValid(workplace))
        )
    })

export const activeAndCompleted = (student: Student[]) =>
    student?.filter((student) => {
        if (
            student?.user?.status !== UserStatus.Approved &&
            !student?.workplace?.length
        ) {
            // Skip if status is not Approved or no workplace

            return false
        }

        const workplaceCount = student?.workplace?.length

        if (
            workplaceCount === 1 &&
            student?.user?.status === UserStatus.Approved
        ) {
            // If only one workplace, check its status
            return student?.workplace[0]?.currentStatus === 'completed'
        } else if (
            workplaceCount > 1 &&
            student?.user?.status === UserStatus.Approved
        ) {
            // If multiple workplaces, all must have 'completed' status
            // student.workplace.some(
            //     (placement: any) => placement?.currentStatus === 'completed'
            // )
            return student?.workplace?.every(
                (placement) => placement?.currentStatus === 'completed'
            )
        }

        return false
    })
