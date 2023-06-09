import { useContextBar } from '@hooks'
import { useEffect, Fragment, useState, ReactElement } from 'react'
import {
    Typography,
    ActionButton,
    NoData,
    PdfViewModal,
    FileViewModal,
    VideoPlayModal,
} from '@components'
import { ellipsisText } from '@utils'
import { AiFillEye } from 'react-icons/ai'
import { FaCloudDownloadAlt } from 'react-icons/fa'

export const ViewFoldersCB = ({ folders }: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('View Folders')
    }, [])

    const onModalCancel = () => {
        setModal(null)
    }

    const getImageViewModal = (file: any) => {
        return (
            <FileViewModal
                title=""
                subtitle=""
                url={file?.file}
                onCancelButtonClick={onModalCancel}
            >
                <div className="max-w-[650px] relative">
                    <img src={file?.file} alt="" className="max-w-full" />
                </div>
            </FileViewModal>
        )
    }

    const onFileClicked = (file: any) => {
        // setSelected(file)

        if (
            ['jpg', 'jpeg', 'png', 'jfif'].includes(
                file?.extension?.toLowerCase()
            )
        ) {
            setModal(getImageViewModal(file))
        } else if (
            ['pdf', 'document'].includes(file?.extension?.toLowerCase())
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfViewModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                    extension={file?.extension}
                />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov'].includes(
                file?.extension?.toLowerCase()
            )
        ) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            setModal(
                <VideoPlayModal
                    // url={url}
                    url={file?.file}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        }
    }

    return (
        <>
            {modal}
            <div>
                {folders && folders?.length > 0 ? (
                    folders?.map((folder: any) => (
                        <div key={folder?.id} className="mb-4">
                            <Typography variant={'label'}>
                                <span className="font-semibold">
                                    {folder?.folder?.name}
                                </span>
                            </Typography>
                            {folder?.uploaded ? (
                                <div>
                                    {folder?.uploaded?.map((uploaded: any) => (
                                        <div
                                            className="flex justify-between items-center gap-x-0.5"
                                            key={uploaded?.id}
                                        >
                                            <Typography
                                                variant={'small'}
                                                color={'text-slate-500'}
                                            >
                                                <span className="font-medium">
                                                    {ellipsisText(
                                                        uploaded?.fileName,
                                                        11
                                                    )}
                                                </span>
                                            </Typography>
                                            <div className="flex items-center gap">
                                                <ActionButton
                                                    simple
                                                    Icon={AiFillEye}
                                                    variant="success"
                                                    onClick={() => {
                                                        let fileName = uploaded
                                                            ? uploaded?.file?.split(
                                                                  '\\'
                                                              )
                                                            : ''
                                                        if (
                                                            fileName?.length ===
                                                            1
                                                        ) {
                                                            fileName =
                                                                uploaded?.file?.split(
                                                                    '/'
                                                                )

                                                            if (
                                                                fileName.length >
                                                                1
                                                            ) {
                                                                fileName =
                                                                    fileName[
                                                                        fileName?.length -
                                                                            1
                                                                    ]
                                                            }
                                                        }
                                                        const extension =
                                                            fileName
                                                                ?.replaceAll(
                                                                    '{"',
                                                                    ''
                                                                )
                                                                .replaceAll(
                                                                    '"}',
                                                                    ''
                                                                )
                                                                ?.split('.')
                                                                .reverse()[0]
                                                        onFileClicked({
                                                            ...uploaded,
                                                            file: uploaded?.file
                                                                .replaceAll(
                                                                    '{"',
                                                                    ''
                                                                )
                                                                .replaceAll(
                                                                    '"}',
                                                                    ''
                                                                ),
                                                            extension,
                                                            type:
                                                                uploaded?.type ||
                                                                'all',
                                                        })
                                                    }}
                                                >
                                                    {/* <a href={uploaded?.file}> */}
                                                    View
                                                    {/* </a> */}
                                                </ActionButton>
                                                <ActionButton
                                                    simple
                                                    variant="link"
                                                    Icon={FaCloudDownloadAlt}
                                                >
                                                    <a href={uploaded?.file}>
                                                        Download
                                                    </a>
                                                </ActionButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <NoData text={'No Files Uploaded'} />
                            )}
                        </div>
                    ))
                ) : (
                    <NoData text={'Industry Folders were not found'} />
                )}
                {/* {Object.keys(folders).map((folder) => {
                    return (
                        <Fragment key={folder}>
                            <Typography variant={'label'}>
                                <span className="font-semibold">{folder}</span>
                            </Typography>

                            {(folders as any)[folder].map(
                                (f: any, i: number) => (
                                    <div
                                        className="flex justify-between items-center gap-x-0.5"
                                        key={i}
                                    >
                                        <Typography
                                            variant={'small'}
                                            color={'text-slate-500'}
                                        >
                                            <span className="font-medium">
                                                {elipiciseText(f?.fileName, 11)}
                                            </span>
                                        </Typography>
                                        <div className="flex items-center gap">
                                            <ActionButton
                                                simple
                                                Icon={AiFillEye}
                                                variant="success"
                                            >
                                                <a href={f?.file}>View</a>
                                            </ActionButton>
                                            <ActionButton
                                                simple
                                                variant="link"
                                                Icon={FaCloudDownloadAlt}
                                            >
                                                <a href={f?.file}>Download</a>
                                            </ActionButton>
                                        </div>
                                    </div>
                                )
                            )}
                        </Fragment>
                    )
                })} */}
            </div>
        </>
    )
}
