export const employeeScheduleValidation = (
    tasks: any,
    methods: any,
    validationFlag: any
) => {
    tasks &&
        tasks?.forEach((day: any, index: any) => {
            if (!day.title || day.title.trim() === '') {
                methods.setError(`tasks[${index}].title`, {
                    type: 'validation',
                    message: `tasks[${index}] title is required`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            if (!day.day || day.day.trim() === '') {
                methods.setError(`tasks[${index}].day`, {
                    type: 'validation',
                    message: `tasks[${index}] is required`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            if (!day?.location || day?.location.trim() === '') {
                methods.setError(`tasks[${index}].location`, {
                    type: 'validation',
                    message: `tasks[${index}] location is required`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            if (!day.note || day.note.trim() === '') {
                methods.setError(`tasks[${index}].note`, {
                    type: 'validation',
                    message: `tasks[${index}] Note is required`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            if (day.totalHours <= 0 || day.totalHours > 24) {
                methods.setError(`tasks[${index}].totalHours`, {
                    type: 'Validation',
                    message: `tasks[${index}] Total Hours must be a number between 1 and 24`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            if (
                day.startTime &&
                day.endTime &&
                day.startTime.match(/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$/) &&
                day.endTime.match(/^(?:[0-1][0-9]|2[0-3]):[0-5][0-9]$/) &&
                day.startTime >= '00:00' &&
                day.endTime <= '24:00' &&
                day.endTime <= day.startTime
            ) {
                methods.setError(`tasks[${index}].startTime`, {
                    type: 'Validation',
                    message: `tasks[${index}] End Time must be later than Start Time`,
                })
                methods.setError(`tasks[${index}].endTime`, {
                    type: 'Validation',
                    message: `tasks[${index}] End Time must be later than Start Time`,
                })
                validationFlag.isAnyFieldInvalid = true
            }
            // if (!day?.priority || day?.priority?.trim() === '') {
            //     methods.setError(`tasks[${index}].priority`, {
            //         type: 'Validation',
            //         message: `${day?.day} Priority is a required field`,
            //     })
            //     validationFlag = true
            // }
        })
}
