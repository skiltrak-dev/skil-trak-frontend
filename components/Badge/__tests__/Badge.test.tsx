import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
    it('Check', () => {
        render(<Badge text={'Saad'} />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toBeInTheDocument()
    })

    it('Size LG', () => {
        render(<Badge text={'Saad'} size="lg" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('text-normal')
    })

    it('Size MD', () => {
        render(<Badge text={'Saad'} size="md" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('text-sm font-medium')
    })

    it('Size SM', () => {
        render(<Badge text={'Saad'} size="sm" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('text-xs font-medium')
    })

    it('Size XS', () => {
        render(<Badge text={'Saad'} size="xs" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('text-[10px]')
    })

    it('Shape pill', () => {
        render(<Badge text={'Saad'} shape="pill" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('rounded-full')
    })

    it('Shape Rounded', () => {
        render(<Badge text={'Saad'} shape="rounded" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('rounded')
    })

    it('Shape Flat', () => {
        render(<Badge text={'Saad'} shape="flat" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('px-2 py-0.5 inline-block uppercase')
    })

    it('Variant accent', () => {
        render(<Badge text={'Saad'} variant="accent" />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('bg-indigo-100 text-indigo-500')
    })

    it('Variant accent and Disabled', () => {
        render(<Badge text={'Saad'} variant="accent" disabled />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toHaveClass('bg-gray-100 text-gray-500')
    })

    it('Loading', () => {
        render(<Badge text={'Saad'} variant="accent" disabled loading />)
        const BadgeData = screen.getByTestId('puff-loader')
        expect(BadgeData).toBeInTheDocument()

        const childSpan = BadgeData.querySelectorAll('span')
        expect(childSpan[0]).toHaveStyle({
            width: '5px',
            backgroundColor: '#6366f1',
        })
    })

    it('Variant accent and Disabled', () => {
        render(<Badge text={'Saad'} variant="accent" disabled />)
        const BadgeData = screen.getByText(/Saad/i)
        expect(BadgeData).toBeLessThan
    })
})
