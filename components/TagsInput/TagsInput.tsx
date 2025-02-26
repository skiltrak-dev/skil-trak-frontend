import React, { useState, useRef, KeyboardEvent } from 'react'

// Define interface for tag object
interface Tag {
    id: string
    text: string
}

interface TagsInputProps {
    label?: string
    name?: string
    placeholder?: string
    onChange?: (tags: Tag[]) => void
    maxTags?: number
    validationIcons?: boolean
    hint?: string
    onBlur?: (tagTexts: string[]) => void
    type?: string
}

export const TagsInput = ({
    label,
    name,
    placeholder = 'Add tag...',
    onChange,
    maxTags = 10,
    validationIcons,
    hint,
    type = 'text',
    onBlur,
}: TagsInputProps) => {
    const [tags, setTags] = useState<Tag[]>([])
    const [input, setInput] = useState('')
    const [isEditing, setIsEditing] = useState<number | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Generate a unique ID for a tag
    const generateId = () => `tag-${Math.random().toString(36).substr(2, 9)}`

    // Handle adding a new tag
    const handleAddition = () => {
        const trimmedInput = input.trim()
        if (trimmedInput && tags.length < maxTags) {
            const newTag = { id: generateId(), text: trimmedInput }
            const newTags = [...tags, newTag]
            setTags(newTags)
            setInput('')

            // Call onChange if provided
            if (onChange) {
                onChange(newTags)
            }
        }
    }

    // Handle deleting a tag
    const handleDelete = (id: string) => {
        const newTags = tags.filter((tag) => tag.id !== id)
        setTags(newTags)

        // Call onChange if provided
        if (onChange) {
            onChange(newTags)
        }
    }

    // Handle editing a tag
    const handleStartEdit = (index: number) => {
        setIsEditing(index)
        setInput(tags[index].text)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    // Handle saving edits
    const handleSaveEdit = () => {
        if (isEditing !== null) {
            const updatedTags = [...tags]
            updatedTags[isEditing] = {
                ...updatedTags[isEditing],
                text: input.trim(),
            }
            setTags(updatedTags)
            setInput('')
            setIsEditing(null)

            // Call onChange if provided
            if (onChange) {
                onChange(updatedTags)
            }
        }
    }

    // Handle key down event
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (isEditing !== null) {
                handleSaveEdit()
            } else {
                handleAddition()
            }
        } else if (e.key === 'Escape' && isEditing !== null) {
            setInput('')
            setIsEditing(null)
        } else if (
            e.key === 'Backspace' &&
            !input &&
            tags.length > 0 &&
            isEditing === null
        ) {
            const lastTag = tags[tags.length - 1]
            handleDelete(lastTag.id)
        } else if (e.key === ',' && !isEditing) {
            e.preventDefault()
            handleAddition()
        }
    }

    // Handle paste event
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasteData = e.clipboardData.getData('text')
        const pastedItems = pasteData
            .split(/[,;\n]/)
            .map((item) => item.trim())
            .filter((item) => item)

        if (pastedItems.length > 0) {
            const newTags = [...tags]
            const remainingSlots = maxTags - tags.length

            pastedItems.slice(0, remainingSlots).forEach((item) => {
                newTags.push({ id: generateId(), text: item })
            })

            setTags(newTags)

            if (onChange) {
                onChange(newTags)
            }
        }
    }

    // Handle drag start
    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('tagIndex', index.toString())
    }

    // Handle drag over
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    // Handle drop
    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        const dragIndex = parseInt(e.dataTransfer.getData('tagIndex'), 10)
        if (dragIndex === dropIndex) return

        const newTags = [...tags]
        const draggedTag = newTags[dragIndex]

        // Remove the dragged tag
        newTags.splice(dragIndex, 1)
        // Insert at the drop position
        newTags.splice(dropIndex, 0, draggedTag)

        setTags(newTags)

        if (onChange) {
            onChange(newTags)
        }
    }

    // Handle clear all
    const handleClearAll = () => {
        setTags([])

        if (onChange) {
            onChange([])
        }
    }

    // Handle container blur
    const handleContainerBlur = (e: React.FocusEvent) => {
        // Check if the focus is still within the container
        if (
            containerRef.current &&
            !containerRef.current.contains(e.relatedTarget as Node)
        ) {
            if (input.trim()) {
                handleAddition()
            }

            if (onBlur) {
                onBlur(tags.map((tag) => tag.text))
            }
        }
    }

    return (
        <div className="mb-4" ref={containerRef} onBlur={handleContainerBlur}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div
                className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-gray-500 focus-within:border-gray-500 bg-white min-h-[42px]"
                onClick={() => inputRef.current?.focus()}
            >
                {tags.map((tag, index) => (
                    <div
                        key={tag.id}
                        className="flex items-center bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm"
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                    >
                        <span
                            className="cursor-pointer"
                            onClick={() => handleStartEdit(index)}
                        >
                            {tag.text}
                        </span>
                        <button
                            type="button"
                            className="ml-1.5 text-blue-500 hover:text-red-500 focus:outline-none"
                            onClick={() => handleDelete(tag.id)}
                        >
                            &times;
                        </button>
                    </div>
                ))}

                <input
                    ref={inputRef}
                    type={type}
                    name={name}
                    className="flex-grow outline-none min-w-[120px] bg-transparent text-sm"
                    placeholder={
                        isEditing !== null ? 'Edit tag...' : placeholder
                    }
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                />
            </div>

            {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}

            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                    {tags.length} / {maxTags} tags
                </span>
                {tags.length > 0 && (
                    <button
                        type="button"
                        className="text-xs text-red-500 hover:text-red-700"
                        onClick={handleClearAll}
                    >
                        Clear all
                    </button>
                )}
            </div>
        </div>
    )
}
