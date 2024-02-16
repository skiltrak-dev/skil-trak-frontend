import React, { useEffect, useState } from 'react'

export const GetFolders = (recivedFolders: any) => {
    const [folders, setFolders] = useState<any | null>(null)

    useEffect(() => {
        const getFolders = () => {
            const uploadedFolders = {}
            recivedFolders?.data?.uploaded?.forEach((folder: any) => {
                if ((uploadedFolders as any)[folder.name]) {
                    ;(uploadedFolders as any)[folder.name].push(folder)
                } else {
                    ;(uploadedFolders as any)[folder.name] = []
                    ;(uploadedFolders as any)[folder.name].push(folder)
                }
            })
            const allFolders = recivedFolders?.data?.folders?.map(
                (folder: any) => ({
                    ...folder,
                    uploaded: (uploadedFolders as any)[folder?.folder?.name],
                })
            )
            setFolders(allFolders)
        }
        getFolders()
    }, [recivedFolders])
    return folders
}
