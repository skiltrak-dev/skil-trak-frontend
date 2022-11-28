import React, { useEffect, useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuHeader,
    MenuItem,
} from '@szhsin/react-menu'

// Icons
import { MdKeyboardArrowDown } from 'react-icons/md'

// components
// import { ConfirmActionView,DeleteActionPopup,Popup } from "components";
import { Popup } from '@components'

// redux
// import {
//   useChangeEmployeeTaskPriorityMutation,
//   useDeleteEmployeeTaskMutation,
// } from "redux/query";

// Colors
import { ThemeColors } from '@utils'

const Colors = ThemeColors

// styles
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

export const ScheduleCardAction = ({
    items,
    deleteTask,
    changePriority,
    deleteTaskResult,
}: any) => {
    const [popUpSubtitle, setPopUpSubtitle] = useState(
        'Please wait for a moment'
    )

    useEffect(() => {
        deleteTaskResult.isLoading &&
            setTimeout(() => {
                setPopUpSubtitle('Your internet connection is too slow!')
            }, 3000)
    }, [deleteTaskResult.isLoading])

    const priority = [
        {
            priority: 'Low',
            color: Colors.success,
        },
        {
            priority: 'Medium',
            color: Colors.info,
        },
        {
            priority: 'High',
            color: Colors.error,
        },
    ]
    return (
        <div className="w-full absolute top-0 right-0">
            <Menu
                menuButton={
                    <MenuButton className="absolute right-0 top-0">
                        <MdKeyboardArrowDown />
                    </MenuButton>
                }
                transition
            >
                <MenuHeader className="text-xs">priority</MenuHeader>
                {priority.map((priority, i) => (
                    <MenuItem key={i}>
                        <div
                            style={{
                                color: `${priority.color}`,
                                width: '100%',
                            }}
                            className="text-xs"
                            onClick={async (event: any) => {
                                await changePriority({
                                    id: items.id,
                                    priority:
                                        event.target.textContent.toLowerCase(),
                                })
                            }}
                        >
                            {priority.priority}
                        </div>
                    </MenuItem>
                ))}
                <MenuDivider />
                <MenuHeader className="text-xs">action</MenuHeader>

                <MenuItem>
                    <div
                        style={{ width: '100%' }}
                        className="text-xs"
                        onClick={() => deleteTask(items.id)}
                    >
                        Delete
                    </div>
                </MenuItem>
            </Menu>
        </div>
    )
}
