import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { TextInput } from '../TextInput'

export const mockRules = {
    required: 'This field is required',
    minLength: {
        value: 3,
        message: 'Minimum length is 3 characters',
    },
    pattern: {
        value: /^[A-Za-z]+$/,
        message: 'Only letters are allowed',
    },
}

export const mockValidationMethods = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
}

// __mocks__/components.tsx
import React from 'react'

export const Typography = ({ children, variant, htmlFor }: any) => (
    <label htmlFor={htmlFor}>{children}</label>
)

export const Tooltip = ({ text }: { text: string }) => <div title={text}>ⓘ</div>

export const LoadingSpinner = ({ loading }: { loading: boolean }) =>
    loading ? <div role="status">Loading...</div> : null

export const ValidationIcon = ({ name }: { name: string }) => (
    <div data-testid={`validation-icon-${name}`}>✓</div>
)

// __mocks__/utils.ts
export const getMethodsForInput = () => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
})

jest.mock('react-google-autocomplete', () => ({
    usePlacesWidget: () => ({
        ref: { current: null },
    }),
}))

// Mock all external components and hooks
jest.mock('@components', () => ({
    Typography: ({ children, htmlFor }: any) => (
        <label htmlFor={htmlFor}>{children}</label>
    ),
}))

jest.mock('react-google-autocomplete', () => ({
    usePlacesWidget: () => ({
        ref: { current: null },
    }),
}))

jest.mock('@utils', () => ({
    getMethodsForInput: () => ({
        onChange: jest.fn(),
        onBlur: jest.fn(),
    }),
}))

// Mock environment variables
process.env.NEXT_PUBLIC_MAP_KEY = 'mock-google-maps-key'

// jest.setup.js or at the top of your test file
jest.mock('@reduxjs/toolkit/query/react', () => ({
    ...jest.requireActual('@reduxjs/toolkit/query/react'),
    fetchBaseQuery: jest.fn(() => ({
        baseUrl: `${process.env.NEXT_PUBLIC_END_POINT}/`,
        prepareHeaders: jest.fn(),
    })),
}))

// Wrapper component for form context

// Wrapper component for form context
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    const methods = useForm({
        defaultValues: {
            testInput: '',
        },
        mode: 'onChange',
    })
    return <FormProvider {...methods}>{children}</FormProvider>
}

describe('Check Input Test', () => {
    it('renders input with label and required star when required prop is true', () => {
        render(
            <FormWrapper>
                <TextInput
                    id="test-input"
                    name="testField"
                    label="Test Label"
                    required={true}
                />
            </FormWrapper>
        )

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument()
        expect(screen.getByText('*')).toBeInTheDocument()
        // expect(screen.getByRole('textbox')).toHaveAttribute('name', 'testField')
    })

    it('Check Help Text', () => {
        render(<TextInput name="saad" helpText="This is Help Text" />)
        expect(screen.getByText('This is Help Text')).toBeInTheDocument()
    })

    it('Check Placeholder Text', () => {
        const data = render(
            <TextInput name="saad" placeholder="This is Placeholder" />
        )
        expect(
            screen.getByPlaceholderText('This is Placeholder')
        ).toHaveAttribute('placeholder', 'This is Placeholder')
    })

    it('Get by name', () => {
        const data = render(
            <TextInput name="saad" placeholder="This is Placeholder" />
        )
        expect(screen.getByRole('textbox')).toHaveAttribute('name', 'saad')
    })

    it('Check Id', () => {
        render(<TextInput name="saad" id="saad" />)
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'saad')
    })

    it('By Type', () => {
        render(<TextInput name="saad" type="color" placeholder="Placeholder" />)
        expect(screen.getByPlaceholderText('Placeholder')).toHaveAttribute(
            'type',
            'color'
        )
    })

    it('By Type', () => {
        render(
            <TextInput
                name="saad"
                value="Saad Mushtaq"
                type="text"
                placeholder="Placeholder"
            />
        )
        expect(screen.getByRole('textbox')).toHaveValue('Saad Mushtaq')
        // expect(screen.getByRole('textbox')).toHaveAttribute('type', 'color')
    })

    it('Check disabled', () => {
        render(
            <TextInput
                name="saad"
                value="Saad Mushtaq"
                type="text"
                placeholder="Placeholder"
                disabled
            />
        )
        expect(screen.getByRole('textbox')).toBeDisabled()
        // expect(screen.getByRole('textbox')).toHaveAttribute('type', 'color')
    })

    it('Check Not disabled', () => {
        render(
            <TextInput
                name="saad"
                value="Saad Mushtaq"
                type="text"
                placeholder="Placeholder"
            />
        )
        expect(screen.getByRole('textbox')).not.toBeDisabled()
        // expect(screen.getByRole('textbox')).toHaveAttribute('type', 'color')
    })

    it('Check Min Value', () => {
        render(
            <TextInput
                name="saad"
                value="Saad Mushtaq"
                type="text"
                placeholder="Placeholder"
                min={'10'}
            />
        )
        expect(screen.getByRole('textbox')).toHaveAttribute('min', '10')
        // expect(screen.getByRole('textbox')).toHaveAttribute('type', 'color')
    })
})
