import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Button, ButtonType } from '../Button'
import { getTheme } from '../theme'

const buttonClass = `font-medium uppercase transition-all duration-300 border px-4  shadow focus:outline-none focus:ring-4`
const theme = getTheme(buttonClass, ButtonType)

describe('Button component', () => {
    it('Check with text', () => {
        render(<Button text="Button" />)
        expect(screen.getByText('Button')).toBeInTheDocument()
    })

    it('Check action variant classes', () => {
        render(<Button variant="action" text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass(
            `${theme[ButtonType.Action as any].default}`
        )
    })

    it('Check disabled button classes', () => {
        render(<Button disabled text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass(
            theme[ButtonType.Primary as any].disabled
        )
    })

    it('Check loading button classes', () => {
        render(<Button loading outline text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        const loaderData = screen.getByTestId('puff-loader')
        expect(screenData).toHaveClass(theme[ButtonType.Primary as any].outline)
        expect(loaderData).toBeInTheDocument()
        expect(loaderData).toHaveStyle({
            width: '24px',
        })
        const childSpan = loaderData.querySelectorAll('span')
        childSpan?.forEach((span) => {
            expect(span).toBeInTheDocument()
            expect(span).toHaveStyle({
                borderColor: theme[ButtonType.Primary as any].loading.outline,
            })
        })
    })

    it('Check disabled button classes', () => {
        render(<Button disabled text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass(
            theme[ButtonType.Primary as any].disabled
        )
    })

    it('check classes when rounded', () => {
        render(<Button rounded text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass('rounded-full')
    })

    it('check classes when outline and variant error', () => {
        render(<Button outline variant="error" text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass(theme[ButtonType.Error as any].outline)
    })

    it('FullWidth', () => {
        render(<Button fullWidth text={'MyButton'} />)
        const screenData = screen.getByRole('button')
        expect(screenData).toHaveClass('w-full')
    })

    it('Mini', () => {
        render(<Button mini text={'MyButton'} />)
        const screenData = screen.queryByText('MyButton')
        expect(screenData).not.toBeInTheDocument()
    })

    it('Children', () => {
        render(<Button>MyButton</Button>)
        const screenData = screen.getByText('MyButton')
        expect(screenData).toBeInTheDocument()
    })
})
