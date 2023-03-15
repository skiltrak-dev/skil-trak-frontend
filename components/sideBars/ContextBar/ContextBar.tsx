// Icons
import { IoMdArrowDroprightCircle } from 'react-icons/io'

// Context
import { useContextBar } from '@hooks'
import classNames from 'classnames'
import { Typography } from '@components'
import { FaTimes } from 'react-icons/fa'

export const ContextBar = () => {
    const contextBar = useContextBar()

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
        'w-[380px] p-4': contextBar.isVisible,
        // 'translate-x-full': !contextBar.isVisible,
        'w-[0px] p-0': !contextBar.isVisible,
    })

    return !contextBar.off ? (
        <div className={classes}>
            <div className="flex flex-col gap-y-4">
                {contextBar.title ? (
                    <div className="flex justify-between items-center">
                        <Typography variant="subtitle">
                            {contextBar.title}
                        </Typography>
                        <button
                            className="text-lg"
                            onClick={() => {
                                contextBar.hide()
                                contextBar.setContent(null)
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
