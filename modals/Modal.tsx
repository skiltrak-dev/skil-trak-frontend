import { useOutsideClick } from '@hooks'
import { cloneElement, createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import styled from 'styled-components'

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
    padding: 1.25rem 1.5rem;
    transition: all 0.5s;
    max-height: 90vh;
    overflow: auto;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.1rem;
    border-radius: 5px;
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: #f3f4f6;
    }

    & svg {
        width: 1.8rem;
        height: 1.8rem;
        /* Sometimes we need both */
        /* fill: #6b7280;
    stroke: #6b7280; */
        color: #6b7280;
    }
`

const ModalContext = createContext<any>(null)

const Modal = ({ children }: any) => {
    const [openName, setOpenName] = useState('')

    const close = () => setOpenName('')
    const open = setOpenName

    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            {children}
        </ModalContext.Provider>
    )
}

const Open = ({
    children,
    opens: opensWindowName,
}: {
    children: any
    opens?: any
}) => {
    const { open } = useContext(ModalContext)

    return cloneElement(children, { onClick: () => open(opensWindowName) })
}

const Window = ({ children, name }: any) => {
    const { openName, close } = useContext(ModalContext)
    const ref = useOutsideClick(close)

    if (name !== openName) return null

    return createPortal(
        <Overlay>
            <StyledModal className=" custom-scrollbar" ref={ref}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>

                <div className="">
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </StyledModal>
        </Overlay>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
