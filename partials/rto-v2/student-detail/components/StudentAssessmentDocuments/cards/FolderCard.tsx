import { Badge } from '@components'
import { Folder as FolderType } from '@types'
import { cn } from '@utils'
import {
    AlertCircle,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    FileText,
    Folder,
    FolderOpen,
} from 'lucide-react'
import { useState } from 'react'
import {
    ApproveAllFiles,
    FolderFiles,
    RejectAllFile,
    UploadDocument,
} from '../components'

export const FolderCard = ({
    folder,
    config,
}: {
    config: any
    folder: FolderType
}) => {
    const StatusIcon = config.icon
    const [isOpened, setIsOpened] = useState(false)

    const response = folder?.studentResponse?.[0]

    const folderStatus = response?.status

    return (
        <div
            className={`border-2 ${config.border} rounded-lg overflow-hidden hover:shadow-lg transition-all bg-gradient-to-r ${config.bg} to-white`}
        >
            <div className="p-2.5">
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-4 flex-1">
                        <button
                            onClick={() => setIsOpened(!isOpened)}
                            className="w-8 h-8 rounded-lg bg-white border-2 border-slate-200 flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                        >
                            {isOpened ? (
                                <ChevronDown
                                    className={`w-5 h-5 ${config.color}`}
                                />
                            ) : (
                                <ChevronRight
                                    className={`w-5 h-5 ${config.color}`}
                                />
                            )}
                        </button>

                        <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-lg ${config.bg} border-2 ${config.border}`}
                        >
                            {isOpened ? (
                                <FolderOpen
                                    className={`w-5 h-5 ${config.color}`}
                                />
                            ) : (
                                <Folder className={`w-5 h-5 ${config.color}`} />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="text-slate-900">
                                    {folder?.name}
                                </h4>
                                <Badge
                                    text={folderStatus || 'Not Uploaded'}
                                    variant={
                                        folderStatus === 'approved'
                                            ? 'success'
                                            : folderStatus === 'pending'
                                            ? 'warning'
                                            : folderStatus === 'rejected'
                                            ? 'error'
                                            : 'info'
                                    }
                                    Icon={StatusIcon}
                                />
                            </div>
                            {response?.comment && (
                                <div
                                    className={cn(
                                        'flex items-start gap-2 mt-2 p-2 border rounded-lg',
                                        {
                                            'bg-red-50 border-red-200':
                                                folderStatus === 'rejected',
                                            'bg-green-50 border-green-200':
                                                folderStatus === 'approved',
                                        }
                                    )}
                                >
                                    {folderStatus === 'rejected' ? (
                                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    ) : (
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                    )}
                                    <p
                                        className={cn('text-sm', {
                                            'text-red-700':
                                                folderStatus === 'rejected',
                                            'text-green-700':
                                                folderStatus === 'approved',
                                        })}
                                    >
                                        {response?.comment}
                                    </p>
                                </div>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>
                                        {response?.filesCount || 0} files
                                    </span>
                                </div>
                                {/* <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>Updated {folder.lastUpdated}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {folderStatus === 'pending' && (
                            <>
                                <ApproveAllFiles folder={response} />
                                <RejectAllFile folder={response} />
                            </>
                        )}
                        <UploadDocument folder={folder} />
                    </div>
                </div>
            </div>

            {isOpened && <FolderFiles folder={folder} config={config} />}
        </div>
    )
}
