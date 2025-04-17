import PuffLoader from 'react-spinners/PuffLoader'
import { getTheme } from './theme'
import { ReactNode, MouseEvent } from 'react'
import { IconType } from 'react-icons'

export const ButtonType = {
    Primary: 'primary',
    PrimaryNew: 'primaryNew',
    Secondary: 'secondary',
    Info: 'info',
    Error: 'error',
    Action: 'action',
    Dark: 'dark',
    Success: 'success',
}

const VariantOptions = [
    'primary',
    'secondary',
    'info',
    'error',
    'action',
    'dark',
    'success',
    'primaryNew',
] as const

interface ButtonProps {
    variant?: (typeof VariantOptions)[number]
    Icon?: IconType
    children?: ReactNode
    text?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    rounded?: boolean
    loading?: boolean
    outline?: boolean
    submit?: boolean
    fullWidth?: boolean
    fullHeight?: boolean
    mini?: boolean
}

export const Button = ({
    variant = 'primary',
    disabled,
    Icon,
    rounded,
    onClick,
    children,
    text,
    loading,
    outline,
    submit,
    fullWidth,
    fullHeight,
    mini,
}: ButtonProps) => {
    const buttonClass = `text-[11px] 2xl:text-xs font-medium uppercase transition-all duration-300 border px-4 py-2 shadow focus:outline-none focus:ring-4 ${
        rounded ? 'rounded-full' : 'rounded-md'
    } ${fullWidth ? 'w-full' : 'min-w-[80px]'} ${fullHeight ? 'h-full' : ''} `

    const miniButtonClass = `transition-all duration-300 cursor-pointer w-6 h-6 flex items-center justify-center rounded shadow`

    const theme = getTheme(mini ? miniButtonClass : buttonClass, ButtonType)

    const currentClass = disabled
        ? `${theme[variant as any].disabled} cursor-not-allowed`
        : outline
        ? theme[variant as any].outline
        : theme[variant as any].default

    const currentLoadingColor = disabled
        ? theme[variant as any].loading.disabled
        : outline
        ? theme[variant as any].loading.outline
        : theme[variant as any].loading.default

    return (
        <button
            disabled={disabled}
            type={submit ? 'submit' : 'button'}
            className={currentClass}
            {...(!submit ? { onClick: (e) => onClick && onClick(e) } : {})}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <PuffLoader
                        size={24}
                        color={currentLoadingColor}
                        data-testid="puff-loader"
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center gap-x-2">
                    {Icon && <Icon />}
                    {!mini && <p>{text || children}</p>}
                </div>
            )}
        </button>
    )
}
