import { Button, Card, Typography } from '@components'
import { InfoboxCard } from '@partials/common'
import { PackageView } from '@partials/rto/components'
import { OptionType, RtoFormData } from '@types'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'

export const StepReviewInfo = () => {
    const router = useRouter()
    const formData: any = SignUpUtils.getValuesFromStorage()

    const onEditData = () => {
        SignUpUtils.setEditingMode(true)
        // navigate to form
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
                    <div className="flex flex-col gap-y-5">
                        {/* Industry Information */}
                        <div className="flex-grow">
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    Industry Information
                                </Typography>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Name
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData?.name || ''}
                                    </Typography>
                                </InfoboxCard>

                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        ABN
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.abn || ''}
                                    </Typography>
                                </InfoboxCard>
                                {/* <div>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Code
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.code || ''}
                                    </Typography>
                                </div> */}
                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Phone Number
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.phoneNumber || ''}
                                    </Typography>
                                </InfoboxCard>
                                {/* <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Student Capacity
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.studentCapacity || ''}
                                    </Typography>
                                </InfoboxCard> */}
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="flex-grow">
                            <div className="border-b border-secondary-dark mt-8">
                                <Typography
                                    variant={'muted'}
                                    color={'text-gray-400'}
                                >
                                    Profile Information
                                </Typography>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        E-Mail
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.email || ''}
                                    </Typography>
                                </InfoboxCard>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                        <div className="border-b border-secondary-dark mt-8">
                            <Typography
                                variant={'muted'}
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
                        <div className="border-b border-secondary-dark mt-8">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Sector Information
                            </Typography>
                        </div>
                        <div className="flex flex-col gap-y-5 w-full mt-4">
                            <Card>
                                <div className="flex flex-col">
                                    <div className="mb-1">
                                        <Typography
                                            variant={'muted'}
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
                                                        key={Number(
                                                            sector.value
                                                        )}
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
                                </div>
                            </Card>
                            <Card>
                                <div>
                                    <div className="mb-1">
                                        <Typography
                                            variant={'muted'}
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
                                                        key={Number(
                                                            course.value
                                                        )}
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
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <div className="border-b border-secondary-dark mt-8">
                            <Typography
                                variant={'muted'}
                                color={'text-gray-400'}
                            >
                                Address Information
                            </Typography>
                        </div>
                        <Card>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-lg mt-4">
                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-500'}
                                    >
                                        Address
                                    </Typography>
                                    <Typography variant={'label'}>
                                        {formData.addressLine1 || '-'}
                                    </Typography>
                                </InfoboxCard>

                                <InfoboxCard>
                                    <Typography
                                        variant={'muted'}
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
