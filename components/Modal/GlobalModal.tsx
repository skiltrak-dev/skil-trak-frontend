import React, { ReactNode } from 'react'
import { Portal } from '@components/Portal'
import OutsideClickHandler from 'react-outside-click-handler'

export const GlobalModal = ({
    children,
    className,
    onCancel,
}: {
    className?: string
    children: ReactNode
    onCancel?: () => void
}) => {
    return (
        <Portal>
            <div className="bg-[#00000050] w-full h-screen  flex items-center justify-center fixed top-0 left-0 px-2 z-40">
                <OutsideClickHandler
                    onOutsideClick={() => {
                        onCancel && onCancel()
                    }}
                >
                    <div
                        className={`bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md md:w-auto md:min-w-[450px] ${className}`}
                        style={{ zIndex: 99999, position: 'relative' }}
                    >
                        {children}
                    </div>
                </OutsideClickHandler>
            </div>
        </Portal>
    )
}
