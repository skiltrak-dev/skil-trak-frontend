// Icons

// Context
import { Typography } from '@components'
import { MediaQueries } from '@constants'
import { useContextBar } from '@hooks'
import classNames from 'classnames'
import { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'

export const ContextBar = () => {
    const isTablet = useMediaQuery(MediaQueries.Tablet)
    const contextBar = useContextBar()

    useEffect(() => {
        if (isTablet) {
            contextBar.hide()
        } else {
            if (contextBar?.content) {
                contextBar.show(contextBar?.fixed)
            }
        }
    }, [isTablet])

    const classes = classNames({
        fixed: contextBar.fixed,
        'top-0 right-0 z-30': true,
        'transition-all duration-300': true,
        'pb-32': true,
        // 'w-[350px] h-screen border-l border-gray-300 p-4': true,
        'h-screen border-l border-gray-300': true,
        'bg-white remove-scrollbar overflow-y-scroll overflow-x-hidden': true,
        // 'translate-x-0': contextBar.isVisible,
        // 'w-[450px] p-4': contextBar.isVisible,
        'min-w-[320px] max-w-[321px] p-3':
            contextBar.isVisible && !contextBar.contextWidth,
        [contextBar.contextWidth]:
            contextBar.contextWidth && contextBar.isVisible,
        // 'translate-x-full': !contextBar.isVisible,
        'w-[0px] p-0': !contextBar.isVisible,
    })

    return !contextBar.off ? (
        <div
            className={classes}
            style={{
                background: contextBar?.bgColor || 'white',
            }}
        >
            <div className="flex flex-col gap-y-4">
                {contextBar.title ? (
                    <div className="flex justify-between items-center">
                        <Typography variant="subtitle">
                            {contextBar.title}
                        </Typography>
                        <button
                            className="text-lg relative z-50"
                            onClick={() => {
                                contextBar.hide()
                                contextBar.setContent(null)
                                contextBar.setTitle('')
                            }}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ) : null}
                {contextBar.content}
            </div>
        </div>
    ) : null
}
