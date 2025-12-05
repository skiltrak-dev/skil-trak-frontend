import { FolderPlus, Settings } from 'lucide-react'

import { ConfigTabs, TabConfig } from '@components'
import { AllocateFolders, CreateCheckFolders } from './components'

export const SectorDocuments = () => {
    const tabs: TabConfig[] = [
        {
            value: 'create',
            label: 'Create Folders',

            icon: FolderPlus,
            component: CreateCheckFolders,
        },
        {
            value: 'allocate',
            label: 'Allocate',
            icon: Settings,
            component: AllocateFolders,
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-gray-900">SkilTrak Industry Checks</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ConfigTabs
                    tabs={tabs}
                    tabsClasses="!rounded-sm"
                    tabsTriggerClasses="!py-1"
                />
            </main>
        </div>
    )
}
