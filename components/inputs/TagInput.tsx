import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'

export const TagInput = ({ name, onTagEnter, type }: any) => {
    const [tagInput, setTagInput] = useState('')
    const methods = useForm()
    const { handleSubmit, control } = methods
    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            onTagEnter(name, tagInput.trim())
            setTagInput('')
            e.preventDefault() // Prevent form submission on Enter
        }
    }

    // On Click
    const handleAddClick = (e: any) => {
        if (tagInput.trim() !== '') {
            onTagEnter(name, tagInput.trim())
            setTagInput('')
            e.preventDefault()
        }
    }

    return (
        <div className="flex my-2.5">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        type={type || 'text'}
                        placeholder={`Enter ${name} and press Enter`}
                        value={tagInput}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTagInput(e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        className="border p-2.5 text-xs py-1 focus:outline-none w-full rounded-md h-8"
                    />
                )}
            />
            <button
                className="bg-[#24556D] px-3 py-1.5 -ml-1 rounded-md"
                onClick={handleAddClick}
            >
                <FaPlus className="text-white" />
            </button>
        </div>
    )
}
