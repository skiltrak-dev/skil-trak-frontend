// Icons
import { MdCancel } from 'react-icons/md'

// components
import { Button, Typography } from '@components'
import { ReactNode } from 'react'
import { GlobalModal } from './GlobalModal'

interface ModalProps {
    title: string
    titleIcon?: any
    subtitle: string
    children: ReactNode
    confirmText?: string
    onConfirmClick?: Function
    cancelText?: string
    onCancelClick?: Function
    loading?: boolean
    disabled?: boolean
    showActions?: boolean
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
    showActions = true,
}: ModalProps) => {
    const onConfirmButtonClick = () => {
        onConfirmClick && onConfirmClick()
    }

    const onCancelButtonClick = () => {
        onCancelClick && onCancelClick()
    }

    const TitleIcon = titleIcon

    return (
        <GlobalModal
            onCancel={() => {
                if (onCancelClick) {
                    onCancelClick()
                }
            }}
        >
            <div className="px-4 py-2 border-b border-secondary-dark flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-x-2">
                        <Typography variant={'title'}>{title}</Typography>
                        {TitleIcon && <TitleIcon className="text-info" />}
                    </div>
                    <Typography variant={'label'} color={'text-muted'}>
                        {subtitle}
                    </Typography>
                </div>
                {onCancelClick && (
                    <MdCancel
                        onClick={onCancelButtonClick}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                )}
            </div>

            <div className="p-4">{children}</div>

            {showActions && (
                <div className="flex justify-end items-end gap-x-4 px-4 py-2">
                    {onCancelClick ? (
                        <Button
                            variant={'secondary'}
                            onClick={onCancelButtonClick}
                        >
                            {cancelText || 'Cancel'}
                        </Button>
                    ) : null}
                    <Button
                        onClick={onConfirmButtonClick}
                        loading={loading}
                        disabled={disabled || loading}
                    >
                        {confirmText || 'Confirm'}
                    </Button>
                </div>
            )}
        </GlobalModal>
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
