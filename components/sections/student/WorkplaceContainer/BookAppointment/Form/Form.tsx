import { Select, TextInput } from '@components/inputs'
import { Typography } from '@components/Typography'
import Image from 'next/image'

type Props = {}

export const Form = (props: Props) => {
    return (
        <div>
            <form action="">
                <div className="flex items-center gap-x-5">
                    <TextInput
                        name="name"
                        placeholder="Name"
                        label="Name"
                        id="name"
                    />
                    <TextInput
                        name="email"
                        placeholder="Email"
                        label="Email"
                        id="email"
                    />
                    <TextInput
                        name="phone"
                        placeholder="Phone"
                        label="Phone"
                        id="phone"
                    />
                </div>
                <TextInput
                    name="address"
                    placeholder="Address"
                    label="Address"
                    id="address"
                />
                <Typography variant="small" color="text-gray-400">
                    Appointment Information
                </Typography>
                <div className="flex items-center gap-x-5">
                    <Select
                        name="coordinator"
                        label="WBT Coordinator"
                        placeholder="Select Your Choice"
                        options={[
                            { value: '1', label: 'Option 1' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                            { value: '4', label: 'Option 4' },
                        ]}
                    />
                    <Select
                        name="courses"
                        label="Course(s)"
                        placeholder="Select Your Choice"
                        options={[
                            { value: '1', label: 'Option 1' },
                            { value: '2', label: 'Option 2' },
                            { value: '3', label: 'Option 3' },
                            { value: '4', label: 'Option 4' },
                        ]}
                    />
                </div>
            </form>
        </div>
    )
}
