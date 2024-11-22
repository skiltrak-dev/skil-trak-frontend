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
        .min(11, 'ABN must be exactly 11 digits')
        .max(11, 'ABN must be exactly 11 digits')
