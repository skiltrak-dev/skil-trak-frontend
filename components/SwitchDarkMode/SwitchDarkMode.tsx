import { Tooltip } from '@components/Tooltip'
import { isBrowser } from '@utils'
import React, { useState } from 'react'
// import DarkModeToggle from 'react-dark-mode-toggle'

export const SwitchDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    return (
        <div className="relative group">
            {/* <DarkModeToggle
                onChange={(e: any) => {
                    setIsDarkMode(e)
                    if (isBrowser()) {
                        if (e) {
                            localStorage.setItem('theme', 'Dark')
                        } else {
                            localStorage.setItem('theme', 'Base')
                        }
                    }
                }}
                checked={isDarkMode}
                size={55}
            /> */}
            <Tooltip>
                {isDarkMode ? 'Switch To Light Mode' : 'Swich To Dark Mode'}
            </Tooltip>
        </div>
    )
}
