'use client'
import {
    Dropdown,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownTrigger,
    DropdownLabel,
} from '@components/Dropdown'
import { Bell, ChevronDown, Menu, Plus, Search, Sparkles } from 'lucide-react'

const useMenuItems = [
    {
        title: 'Profile',
        link: '#',
        classes: 'hover:text-white hover:bg-orange-500 focus:bg-orange-500',
        separator: false,
    },
    {
        title: 'Settings',
        link: '#',
        classes: 'hover:text-white hover:bg-orange-500 focus:bg-orange-500',
        separator: false,
    },
    {
        title: 'Sign Out',
        link: '#',
        classes:
            'hover:text-red-400 hover:bg-red-200 text-red-500 focus:bg-red-500 ',
        separator: true,
    },
]
export const RtoNavbarV2 = ({ onOpenSidebar }: any) => {
    return (
        <header className="w-full flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-b border-border bg-transparent backdrop-blur-sm z-30">
            <div className="flex items-center gap-3">
                <button
                    aria-label="Open menu"
                    onClick={onOpenSidebar}
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted/30 transition"
                >
                    <Menu className="h-5 w-5 text-foreground" />
                </button>
                <div
                    className={`hidden sm:flex items-center gap-2 bg-gray-100 border border-input px-2 py-1 rounded-md focus:ring-2 focus:ring-primaryNew `}
                >
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                        className="w-full bg-transparent outline-none text-sm placeholder:text-slate-300 h-6 min-w-[28rem]"
                        placeholder="Search students, emails..."
                    />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Dropdown>
                    <DropdownTrigger>
                        <div className="gap-2 bg-gradient-to-r from-[#044866] to-[#0D5468] hover:opacity-90 flex items-center text-white px-3 py-2 text-sm font-medium rounded-md">
                            <Sparkles className="h-4 w-4" />
                            Quick Actions
                            <ChevronDown className="h-3.5 w-3.5" />
                        </div>
                    </DropdownTrigger>
                    <DropdownContent align="end">
                        <DropdownItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Student
                        </DropdownItem>
                        <DropdownItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Send Enquiry
                        </DropdownItem>
                        <DropdownItem>
                            <Plus className="h-4 w-4 mr-2" />
                            Upload Documents
                        </DropdownItem>
                    </DropdownContent>
                </Dropdown>
                <button className="relative p-2 rounded-lg hover:bg-muted/30 transition">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 text-[10px] bg-destructive text-white rounded-full px-1">
                        3
                    </span>
                </button>

                <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-muted/60">
                    <Dropdown>
                        <DropdownTrigger>
                            <>
                                <div className="size-6 ring-2 ring-slate-300 rounded-full bg-[#044866] flex items-center justify-center text-white">
                                    J
                                </div>
                                <div className="font-semibold hidden md:block ">
                                    Julie Demo
                                </div>
                            </>
                        </DropdownTrigger>

                        <DropdownContent align="end">
                            <DropdownLabel>Julie Demo RTO</DropdownLabel>
                            <DropdownSeparator />
                            {useMenuItems.map((item, index) => (
                                <div key={index}>
                                    {item.separator && <DropdownSeparator />}
                                    <DropdownItem
                                        className={item.classes}
                                        onSelect={() =>
                                            alert(`${item.title} clicked`)
                                        }
                                    >
                                        {item.title}
                                    </DropdownItem>
                                </div>
                            ))}
                        </DropdownContent>
                    </Dropdown>
                </div>
            </div>
        </header>
    )
}
