// Icons
import { MdCancel } from 'react-icons/md'

// components
import { Typography, Button } from '@components'
import { MouseEventHandler, ReactNode } from 'react'

interface ModalProps {
    title: string
    titleIcon?: any
    subtitle: string
    children: ReactNode
    confirmText?: string
    onConfirmClick: Function
    cancelText?: string
    onCancelClick?: Function
    loading?: boolean
    disabled?: boolean
}

export const Modal = ({
    title,
    subtitle,
    children,
    confirmText,
    onConfirmClick,
    cancelText,
    onCancelClick,
    loading,
    disabled,
    titleIcon,
}: ModalProps) => {
    const onConfirmButtonClick = () => {
        onConfirmClick && onConfirmClick()
    }

    const onCancelButtonClick = () => {
        onCancelClick && onCancelClick()
    }

    const TitleIcon = titleIcon

    return (
        <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
            <div
                className="bg-white rounded-2xl flex flex-col justify-between shadow-md min-w-[450px]"
                style={{ zIndex: 99999 }}
            >
                <div className="px-4 py-2 border-b border-secondary-dark flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <Typography variant={'title'}>{title}</Typography>
                            {TitleIcon && <TitleIcon className="text-info" />}
                        </div>
                        <Typography variant={'subtitle'} color={'text-muted'}>
                            {subtitle}
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onCancelButtonClick}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <div className="p-4">{children}</div>

                <div className="flex justify-end items-end gap-x-4 px-4 py-2">
                    <Button variant={'secondary'} onClick={onCancelButtonClick}>
                        {cancelText || 'Cancel'}
                    </Button>
                    <Button
                        onClick={onConfirmButtonClick}
                        loading={loading}
                        disabled={disabled || loading}
                    >
                        {confirmText || 'Confirm'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

// Modal.propTypes = {
//     color: PropTypes.oneOf(["transparent", "primary", "secondary"]),
//     hoverColor: PropTypes.oneOf([
//       "transparent",
//       "primary",
//       "secondary",
//       "secondaryDark",
//     ]),
//     focusColor: PropTypes.oneOf([
//       "transparent",
//       "primary",
//       "secondary",
//       "secondaryDark",
//     ]),
//     rounded: PropTypes.oneOf(["lg", "2lg", "full"]),
//     border: PropTypes.oneOf(["2"]),
//     borderColor: PropTypes.oneOf(["primary", "secondary"]),
//     shadow: PropTypes.oneOf(["sm"]),
//     children: PropTypes.string.isRequired,
//   };

//   Modal.defaultProps = {
//     color: "primary",
//     hoverColor: "primary",
//     focusColor: "primary",
//     rounded: "lg",
//     border: "2",
//     borderColor: "primary",
//     shadow: "sm",
//   };
