import { useEffect, useRef } from 'react'

export const useOutsideClick = (handler: any, listenCapturing = true) => {
    const ref = useRef<any>()

    useEffect(
        function () {
            function handleClick(e: any) {
                if (ref.current && !ref.current.contains(e.target)) {
                    handler()
                }
            }

            document.addEventListener('click', handleClick, listenCapturing)

            return () =>
                document.removeEventListener(
                    'click',
                    handleClick,
                    listenCapturing
                )
        },
        [handler, listenCapturing]
    )

    return ref
}
