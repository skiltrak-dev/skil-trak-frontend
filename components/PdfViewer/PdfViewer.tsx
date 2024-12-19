import { isBrowser } from '@utils'
import { throttle } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { PdfWrapper } from './PdfWrapper'

export const PdfViewer = ({ file }: { file: string }) => {
    const [width, setWidth] = useState<number | undefined>(undefined)
    const wrapperRef = useRef<any>(null)

    const setPageSize = () => {
        setWidth(wrapperRef?.current?.getBoundingClientRect().width)
    }

    useEffect(() => {
        if (isBrowser()) {
            setPageSize()
            window.addEventListener('resize', throttle(setPageSize, 500))

            return window.removeEventListener(
                'resize',
                throttle(setPageSize, 500)
            )
        }
    }, [])

    return (
        <div ref={wrapperRef}>
            <PdfWrapper file={file} width={width} />
        </div>
    )
}
