import { Button, Card, Typography } from '@components'
import { InfoboxCard } from '@partials/common'
import { PackageView } from '@partials/rto/components'
import { OptionType, RtoFormData, StudentFormType } from '@types'
import { SignUpUtils } from '@utils'
import moment from 'moment'
import { useRouter } from 'next/router'

export const StepReviewInfo = () => {
    const router = useRouter()
    const formData: StudentFormType = SignUpUtils.getValuesFromStorage()

    const onEditData = () => {
        SignUpUtils.setEditingMode(true)
        // navigate to form
        router.push({ query: { step: 'account-info' } })
    }

    const onSubmitData = () => {
        // await signUp(industryFormData);
        SignUpUtils.setEditingMode(false)

        // set-up account type from here
        router.push({ query: { step: 'requested' } })
    }

    return (
        <div className="max-w-screen-xl mx-auto mt-4 px-2 xl:px-0">
            <div>
                <p className="font-semibold text-lg">
                    Please Review Your Information
                </p>
                <p className="font-medium text-sm text-gray-400">
                    Confirm your input to proceed, if there are changes to made,
                    you can edit them
                </p>
            </div>

            <div>
                <div className="w-full pb-10 lg:pr-10">
                    <div className="">
                        {/* RTO Information */}
                        <div className="flex-grow">
                            <div className="border-b  border-secondary-dark mt-8">
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    Student Information
                                </Typography>
                            </div>

                            <Card>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Name
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.name || ''}
                                        </Typography>
                                    </InfoboxCard>

                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Phone Number
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.phone || ''}
                                        </Typography>
                                    </InfoboxCard>
                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Faimly Name
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.familyName || ''}
                                        </Typography>
                                    </InfoboxCard>
                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Student Id
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.studentId || ''}
                                        </Typography>
                                    </InfoboxCard>
                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Date of birth
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {moment(formData.dob).format(
                                                'MMM, Do YYYY'
                                            ) || ''}
                                        </Typography>
                                    </InfoboxCard>

                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Emergency Person
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.emergencyPerson ||
                                                'Not Provided'}
                                        </Typography>
                                    </InfoboxCard>

                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            Emergency Person Phone
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.emergencyPersonPhone ||
                                                ''}
                                        </Typography>
                                    </InfoboxCard>
                                </div>
                            </Card>
                        </div>

                        {/* Profile Information */}
                        <div className="flex-grow">
                            <div className="border-b  border-secondary-dark mt-8">
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-400'}
                                >
                                    Profile Information
                                </Typography>
                            </div>

                            <Card>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                    <InfoboxCard>
                                        <Typography
                                            variant={'xs'}
                                            color={'text-gray-500'}
                                        >
                                            E-Mail
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {formData.email || ''}
                                        </Typography>
                                    </InfoboxCard>
                                </div>
                            </Card>
                            {/* <div>
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-500'}
                                >
                                    RTO
                                </Typography>
                                <Typography variant={'label'}>
                                    {formData.rto.label || ''}
                                </Typography>
                            </div> */}
                        </div>
                    </div>

                    {/* Pacakge Information
                    <div>
                        <div className="border-b border-secondary-dark mt-8">
                            <Typography
                                variant={'xs'}
                                color={'text-gray-400'}
                            >
                                Your Package
                            </Typography>
                        </div>

                        <div className="w-full mt-4 border px-4 py-4 rounded-xl">
                            <PackageView pkg={formData.package} />
                        </div>
                    </div> */}

                    {/* Sector Info */}
                    <div>
                        <div className="border-b  border-secondary-dark mt-8">
                            <Typography variant={'xs'} color={'text-gray-400'}>
                                Sector Information
                            </Typography>
                        </div>
                        <div className="w-full mt-4 flex flex-col gap-y-5">
                            <Card>
                                <div className="mb-1">
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        Sector(s)
                                    </Typography>
                                </div>

                                <div className="flex flex-col gap-y-1">
                                    {formData.sectors?.map(
                                        (sector: OptionType) => (
                                            <InfoboxCard>
                                                <div
                                                    className=""
                                                    key={Number(sector.value)}
                                                >
                                                    <Typography
                                                        variant={'label'}
                                                    >
                                                        {sector.label}
                                                    </Typography>
                                                </div>
                                            </InfoboxCard>
                                        )
                                    )}
                                </div>
                            </Card>
                            <Card>
                                <div className="mb-2">
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        Course(s)
                                    </Typography>
                                </div>
                                <div className="flex flex-col gap-y-1">
                                    {formData.courses?.map(
                                        (course: OptionType) => (
                                            <InfoboxCard>
                                                <div
                                                    className=""
                                                    key={Number(course.value)}
                                                >
                                                    <Typography
                                                        variant={'label'}
                                                    >
                                                        {course.label}
                                                    </Typography>
                                                </div>
                                            </InfoboxCard>
                                        )
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <div className="border-b  border-secondary-dark mt-8">
                            <Typography variant={'xs'} color={'text-gray-400'}>
                                Address Information
                            </Typography>
                        </div>

                        <Card>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <InfoboxCard>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        Address Line 1
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.addressLine1 || '-'}
                                    </Typography>
                                </InfoboxCard>

                                <InfoboxCard>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        State
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.state || '-'}
                                    </Typography>
                                </InfoboxCard>

                                <InfoboxCard>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        Suburb
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.suburb || '-'}
                                    </Typography>
                                </InfoboxCard>

                                <InfoboxCard>
                                    <Typography
                                        variant={'xs'}
                                        color={'text-gray-500'}
                                    >
                                        Zip Code
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.zipCode || '-'}
                                    </Typography>
                                </InfoboxCard>
                            </div>
                        </Card>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex items-center gap-x-8">
                        <Button variant={'primary'} onClick={onSubmitData}>
                            Create Account
                        </Button>
                        <Button variant={'secondary'} onClick={onEditData}>
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
