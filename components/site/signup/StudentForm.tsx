import React from 'react'
import { Input } from '../Input'

const StudentForm = () => {
    return (
        <div className="my-4">
            <div className="flex">
                <Input placeholder="Name" type="text" name="name" />
                <Input
                    placeholder="Family Name"
                    type="text"
                    name="family-name"
                />
            </div>
            <div className="flex">
                <Input placeholder="Student Id" type="text" name="name" />
                <Input
                    placeholder="School Name"
                    type="text"
                    name="family-name"
                />
            </div>
            <div className="flex">
                <Input placeholder="Email" type="text" name="name" />
                <Input placeholder="Password" type="text" name="family-name" />
            </div>
            <div className="flex">
                <Input placeholder="Date of birth" type="text" name="name" />
                <Input
                    placeholder="Phone Number"
                    type="text"
                    name="family-name"
                />
            </div>

            <div className="flex">
                <Input placeholder="Course" type="text" name="name" />
                <Input placeholder="Unit" type="text" name="family-name" />
            </div>

            <div className="flex">
                <Input placeholder="Emergency Name" type="text" name="name" />
                <Input
                    placeholder="Emergency Phone"
                    type="text"
                    name="family-name"
                />
            </div>

            <div className="flex">
                <Input placeholder="Address" type="text" name="name" />
            </div>
        </div>
    )
}

export default StudentForm
