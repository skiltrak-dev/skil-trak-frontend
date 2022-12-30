import React, { useEffect, useState } from 'react'

export const GetFolders = (workplaceFolders: any) => {
    const [folders, setFolders] = useState<any | null>(null)

    useEffect(() => {
        const getFolders = () => {
            const uploadedFolders = {}
            workplaceFolders?.data?.uploaded?.forEach((folder: any) => {
                if ((uploadedFolders as any)[folder.name]) {
                    ;(uploadedFolders as any)[folder.name].push(folder)
                } else {
                    ;(uploadedFolders as any)[folder.name] = []
                    ;(uploadedFolders as any)[folder.name].push(folder)
                }
            })
            const allFolders = workplaceFolders?.data?.folders?.map(
                (folder: any) => ({
                    ...folder,
                    uploaded: (uploadedFolders as any)[folder?.folder?.name],
                })
            )
            setFolders(allFolders)
        }
        getFolders()
    }, [workplaceFolders])
    return folders
}
