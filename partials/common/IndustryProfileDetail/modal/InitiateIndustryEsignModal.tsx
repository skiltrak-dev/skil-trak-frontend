import {
    Button,
    GlobalModal,
    LoadingAnimation,
    NoData,
    Select,
    SelectOption,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { DocumentView } from '@partials/sub-admin'
import { CommonApi, IndustryApi } from '@queries'
import { useEffect, useMemo, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import {
    EsignDocuments,
    InitiatedEsignList,
    InitiateIndustryEsign,
} from '../components'

export const InitiateIndustryEsignModal = ({
    industryUserId,
    onCancel,
}: {
    onCancel: () => void
    industryUserId: number
}) => {
    const [activeTab, setActiveTab] = useState('initiateIndustryEsign')

    const tabs = [
        {
            id: 'initiateIndustryEsign',
            label: 'Initiate Industry Esign',
            component: InitiateIndustryEsign,
        },
        {
            id: 'initiatedEsignList',
            label: 'Initiated Esign List',
            component: InitiatedEsignList,
        },
        {
            id: 'esignDocuments',
            label: 'Esign Documents',
            component: EsignDocuments,
        },
    ]

    const Component = tabs.find((tab) => tab.id === activeTab)?.component
    return (
        <GlobalModal className="p-5 flex flex-col ">
            <MdCancel
                onClick={() => {
                    if (onCancel) {
                        onCancel()
                    }
                }}
                className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
            />

            <div className="w-[90vh] xl:w-[75vw] h-[80vh] bg-gray-100 p-4">
                <div className="bg-white rounded-lg shadow-sm  flex flex-col w-full h-full">
                    <div className="border-b border-gray-200 flex-shrink-0">
                        <nav className="flex space-x-8 px-6 w-full h-full">
                            {tabs.map((tab) => {
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                            activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                    </button>
                                )
                            })}
                        </nav>
                    </div>

                    {/* Tab Content - Now uses flex layout without overflow */}
                    <div className="px-6 py-1 w-full h-full overflow-hidden">
                        {Component && (
                            <Component
                                onCancel={onCancel}
                                industryUserId={industryUserId}
                            />
                        )}
                    </div>
                </div>
            </div>
        </GlobalModal>
    )
}
