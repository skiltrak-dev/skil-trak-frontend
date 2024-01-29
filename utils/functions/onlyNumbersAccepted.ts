export const onlyNumbersAccepted = (value: string) =>
    !value || /^[0-9]+$/.test(value.toString())

export const onlyNumbersAcceptedInYup = (yup: any) =>
    yup
        .string()
        .nullable()
        .required('ABN is required')
        .test(
            'is-valid-number',
            'Only numbers are accepted',
            (value: any) => !value || /^[0-9]+$/.test(value.toString())
        )
        .min(0)
        .max(100)
