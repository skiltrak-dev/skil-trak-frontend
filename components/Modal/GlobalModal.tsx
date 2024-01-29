import React, { ReactNode } from 'react'
import { Portal } from '@components/Portal'

export const GlobalModal = ({ children }: { children: ReactNode }) => {
    return (
        <Portal>
            <div className="bg-[#00000050] w-full h-screen  flex items-center justify-center fixed top-0 left-0 px-2 z-40">
                <div
                    className="bg-white rounded-2xl modal-animation flex flex-col justify-between shadow-md w-full md:w-auto md:min-w-[450px]"
                    style={{ zIndex: 99999 }}
                >
                    {children}
                </div>
            </div>
        </Portal>
    )
}
