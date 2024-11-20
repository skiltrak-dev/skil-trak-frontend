import { Typography } from '@components'
import { fireEvent, screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { StudentDetailCard } from '../StudentDetailCard'

// Mock the Typography component since it's an external dependency

// jest.mock('../../../../../../components', () => ({
jest.mock('@components', () => ({
    Typography: ({ children, ...props }: any) => (
        <div {...props}>{children}</div>
    ),
}))

describe('StudentDetailCard', () => {
    it('renders title and detail correctly', () => {
        render(<StudentDetailCard title="Student Name" detail="John Doe" />)

        expect(screen.getByText('Student Name')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('shows "---" when detail is empty', () => {
        render(<StudentDetailCard title="Student Name" detail="" />)

        expect(screen.getByText('---')).toBeInTheDocument()
    })

    it('applies border styles when border prop is true', () => {
        const { container } = render(
            <StudentDetailCard
                title="Student Name"
                detail="John Doe"
                border={true}
            />
        )

        const cardElement = container.firstChild
        expect(cardElement).toHaveClass('border')
        expect(cardElement).toHaveClass('border-[#6B728050]')
        expect(cardElement).toHaveClass('rounded-md')
    })

    it('does not apply border styles when border prop is false', () => {
        const { container } = render(
            <StudentDetailCard
                title="Student Name"
                detail="John Doe"
                border={false}
            />
        )

        const cardElement = container.firstChild
        expect(cardElement).not.toHaveClass('border')
        expect(cardElement).not.toHaveClass('border-[#6B728050]')
        expect(cardElement).not.toHaveClass('rounded-md')
    })

    it('applies cursor-pointer class when onClick is provided', () => {
        const { container } = render(
            <StudentDetailCard
                title="Student Name"
                detail="John Doe"
                onClick={() => {}}
            />
        )

        const cardElement = container.firstChild
        expect(cardElement).toHaveClass('cursor-pointer')
    })

    it('does not apply cursor-pointer class when onClick is not provided', () => {
        const { container } = render(
            <StudentDetailCard title="Student Name" detail="John Doe" />
        )

        const cardElement = container.firstChild
        expect(cardElement).not.toHaveClass('cursor-pointer')
    })

    it('check children', () => {
        render(
            <StudentDetailCard title="Student Name" detail="John Doe">
                <Typography>Saad</Typography>
            </StudentDetailCard>
        )

        expect(screen.queryByText('Saad Khan')).not.toBeInTheDocument()
    })

    it('check onClick', () => {
        const mockOnClick = jest.fn()

        render(
            <StudentDetailCard
                onClick={mockOnClick}
                title="Student Name"
                detail="John Doe"
            >
                <Typography>Saad</Typography>
            </StudentDetailCard>
        )
        fireEvent.click(screen.getByText('Student Name'))
        fireEvent.click(screen.getByText('John Doe'))

        expect(mockOnClick).toHaveBeenCalledTimes(2)
    })
})
