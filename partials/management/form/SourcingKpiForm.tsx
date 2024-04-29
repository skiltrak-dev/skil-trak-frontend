import { Button } from '@components/buttons'
import { Select, TextInput } from '@components/inputs'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
export const SourcingKpiForm = ({ setFieldValues, fieldValues }: any) => {
    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const sourcingOptions = [
        {
            label: 'Wali Umar',
            value: 1,
        },
        {
            label: 'Saad',
            value: 2,
        },
        {
            label: 'Hammad Khan',
            value: 3,
        },
    ]

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
    const kpiTypeOptions = [
        {
            label: 'Student Provided',
            value: 1,
        },
        {
            label: 'Appointments',
            value: 2,
        },
        {
            label: 'Placement Started',
            value: 3,
        },
        {
            label: 'Placement Completed',
            value: 4,
        },
    ]
    const onSubmit = async (values: any) => {}
    return (
        <div>
            <div className="">
                {/* <Select
                    name="sourcing"
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
                    name="sourcing"
                    options={sourcingOptions}
                    label={'Sourcing'}
                    shadow="shadow-lg"
                    onChange={(e: any) => {
                        setFieldValues({
                            sourcing: e,
                        })
                    }}
                />
                <Select
                    name="range"
                    options={rangeOptions}
                    label={'Result'}
                    shadow="shadow-lg"
                    onChange={(e: any) => {
                        setFieldValues({
                            range: e,
                        })
                    }}
                />
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
