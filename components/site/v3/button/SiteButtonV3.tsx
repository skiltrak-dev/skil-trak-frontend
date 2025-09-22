import React from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger'

interface ButtonProps {
    text: string
    variant?: ButtonVariant
    onClick?: () => void
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-[#F7A619] hover:bg-[#e49714]',
    secondary: 'bg-[#044866] hover:bg-[#03374d]',
    danger: 'bg-[#9B2000] hover:bg-[#7a1800]',
}

const SiteButtonV3: React.FC<ButtonProps> = ({
    text,
    variant = 'primary',
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            className={`px-12 py-4 rounded-2xl text-white font-medium transition-colors duration-200 ${variantClasses[variant]}`}
        >
            {text}
        </button>
    )
}

export default SiteButtonV3
