import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
    children: ReactNode
}

export const Portal = ({ children }: PortalProps) => {
    const ref = useRef<Element | null>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        ref.current = document.querySelector<HTMLElement>('#portal')
        setMounted(true)
    }, [])

    return mounted && ref.current
        ? createPortal(
              <div style={{ zIndex: 99999, position: 'relative' }}>
                  {children}
              </div>,
              ref.current
          )
        : null
}
