import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { screen } from '@testing-library/dom'
import { Typography } from '../Typography'

describe('Saad', () => {
    it('Saad', () => {
        render(<Typography>Saad</Typography>)

        expect(screen.getByText('Saad')).toBeInTheDocument()
    })

    it('check uppercase class', () => {
        const { container } = render(<Typography uppercase>Saad</Typography>)

        // expect(container.firstChild).toHaveClass('uppercase')

        expect(screen.getByText('Saad')).toBeInTheDocument()
    })

    it('check Lowecase class', () => {
        const { container } = render(
            <Typography variant="label" capitalize>
                Saad
            </Typography>
        )

        // expect(container.firstChild).toHaveClass('capitalize')
        expect(screen.getByText('Saad')).toBeInTheDocument()
    })

    it('check block class', () => {
        const { container } = render(
            <Typography variant="label" block>
                Saad
            </Typography>
        )

        // expect(container.firstChild).toHaveClass('!block')
        expect(screen.getByText('Saad')).toBeInTheDocument()
    })

    it('check H1 tag', () => {
        const { container } = render(
            <Typography variant="h1" capitalize>
                Saad
            </Typography>
        )

        expect(container.querySelector('.capitalize')?.tagName).toBe('H1')
    })

    it('check Span tag', () => {
        const { container } = render(
            <Typography variant="small">Saad</Typography>
        )

        expect((container.firstChild as HTMLElement)?.tagName).toBe('P')
    })

    it('check ExtraBold Class', () => {
        const { container } = render(
            <Typography variant="small" extraBold>
                Saad
            </Typography>
        )

        // expect(container.firstChild).toHaveClass('!font-extrabold')
    })

    it('check HtmlFor', () => {
        const { container } = render(
            <Typography variant="small" htmlFor="1234567">
                Saad
            </Typography>
        )

        expect(screen.getByText('Saad').getAttribute('for'))?.toBe('1234567')
    })

    it('check Color', () => {
        const { container } = render(
            <Typography variant="small" color="text-black">
                Saad
            </Typography>
        )

        expect(container.firstChild)?.toHaveClass('text-black')
    })
})
