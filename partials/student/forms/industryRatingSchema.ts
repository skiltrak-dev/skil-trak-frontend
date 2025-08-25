import * as yup from 'yup'

export const industryRatingSchema = yup.object().shape({
    industry: yup
        .number()
        .typeError('Industry is required')
        .required('Industry is required'),

    recommendation: yup
        .string()
        .oneOf(['yes', 'maybe', 'no'], 'Please select a valid option')
        .required('Please select a recommendation'),

    comment: yup
        .string()
        .required('Comments are required')
        .min(10, 'Comments should be at least 10 characters long')
        .max(1000, 'Comments cannot exceed 1000 characters'),

    ratings: yup.object({
        workEnvironment: yup.number().min(1, 'Required').required('Required'),
        careerGrowth: yup.number().min(1, 'Required').required('Required'),
        compensation: yup.number().min(1, 'Required').required('Required'),
        workLifeBalance: yup.number().min(1, 'Required').required('Required'),
    }),
})
