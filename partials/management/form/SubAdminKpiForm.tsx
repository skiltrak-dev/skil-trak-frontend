import { Button } from '@components/buttons'
import { Select, TextInput } from '@components/inputs'
import { ManagementApi } from '@queries'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
export const SubAdminKpiForm = ({ setFieldValues, fieldValues }: any) => {
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const { data, isLoading } = ManagementApi.Team.useSubAdminList()
    const subAdminOptions = data?.map((subAdmin: any) => ({
        label: `${subAdmin?.user?.name}`,
        value: subAdmin?.id,
    }))
    // const subAdminOptions = [
    //     {
    //         label: 'Haroon Aziz',
    //         value: 1,
    //     },
    //     {
    //         label: 'Asfand',
    //         value: 2,
    //     },
    //     {
    //         label: 'Adeel',
    //         value: 3,
    //     },
    //     {
    //         label: 'Harris',
    //         value: 4,
    //     },
    // ]

    const rangeOptions = [
        {
            label: 'Weekly',
            value: 1,
        },
        {
            label: 'Monthly',
            value: 2,
        },
        {
            label: 'Yearly',
            value: 3,
        },
    ]
    // const kpiTypeOptions = [
    //     {
    //         label: 'Student Provided',
    //         value: 1,
    //     },
    //     {
    //         label: 'Appointments',
    //         value: 2,
    //     },
    //     {
    //         label: 'Placement Started',
    //         value: 3,
    //     },
    //     {
    //         label: 'Placement Completed',
    //         value: 4,
    //     },
    // ]
    const onSubmit = async (values: any) => {}

    return (
        <div>
            <div className="">
                {/* <Select
                    name="kpiType"
                    options={kpiTypeOptions}
                    label={'KPI Type'}
                    shadow="shadow-lg"
                    onChange={(e: any) => {
                        setFieldValues({
                            kpiType: e,
                        })
                    }}
                /> */}
                <Select
                    name="subadmin"
                    options={subAdminOptions}
                    label={'Sub-Admin'}
                    shadow="shadow-lg"
                    onChange={(e: any) => {
                        setFieldValues({
                            member: e?.value,
                        })
                    }}
                />
                {/* <Select
                    name="range"
                    options={rangeOptions}
                    label={'Result'}
                    shadow="shadow-lg"
                    onChange={(e: any) => {
                        setFieldValues({
                            range: e,
                        })
                    }}
                /> */}
            </div>
            <TextInput
                shadow="shadow-lg"
                name="from"
                type="date"
                label={'From'}
                onChange={(e: any) => {
                    setFieldValues({
                        from: e?.target?.value,
                    })
                }}
            />
            <TextInput
                shadow="shadow-lg"
                name="to"
                type="date"
                label={'To'}
                onChange={(e: any) => {
                    setFieldValues({
                        to: e?.target?.value,
                    })
                }}
            />
            {/* <Button
                        submit
                        text="Upload"
                        variant="primaryNew"
                    /> */}
        </div>
    )
}
