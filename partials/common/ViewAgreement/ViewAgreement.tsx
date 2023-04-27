import { useContextBar } from '@hooks'
import { useEffect, Fragment, useState, ReactElement } from 'react'
import { Typography, ActionButton, NoData, FileViewModal, PdfViewModal, VideoPlayModal, LoadingAnimation } from '@components'
import { ellipsisText } from '@utils'
import { AiFillEye } from 'react-icons/ai'
import { FaCloudDownloadAlt } from 'react-icons/fa'
import { CommonApi } from '@queries'

export const ViewAgreement = ({ workplace }: any) => {
    const { setTitle } = useContextBar()
    const [modal, setModal] = useState<ReactElement | null>(null)

    const appliedIndustry = workplace?.industries?.find(
        (industry: any) => industry?.applied
    )

    const viewAgreement = CommonApi.Agreement.viewAgreement({
        course: workplace?.courses[0]?.id,
        industry: appliedIndustry?.industry?.id,
        student: workplace?.student?.id,
    })

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
                file.extension.toLowerCase()
            )
        ) {
            setModal(getImageViewModal(file))
        } else if (['pdf'].includes(file.extension.toLowerCase())) {
            // const fileSplit = file.file.split('https://')
            // const url = `https://www.${fileSplit[1]}`
            const url = `${file?.file}`
            setModal(
                <PdfViewModal
                    url={url}
                    downloadUrl={file?.file}
                    onCancelButtonClick={onModalCancel}
                />
            )
        } else if (
            ['mp4', 'mkv', 'avi', 'mpeg', 'quicktime', 'mov'].includes(
                file.extension.toLowerCase()
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

    const extension = (fileName: string) => {
        return fileName?.split('.').reverse()[0]
    }

    useEffect(() => {
        setTitle('View Agreement')
    }, [])

    return (
        <>
            {modal}
            {viewAgreement.isError && (
                <NoData text={'Some Network issue, try reload'} />
            )}
            {viewAgreement.isLoading ? (
                <LoadingAnimation size={75} height={'h-[50vh]'} />
            ) : viewAgreement.data && viewAgreement?.data?.length > 0 ? (
                viewAgreement?.data?.map((agreement: any) => (
                    <div className="flex justify-between items-center gap-x-0.5">
                        <Typography variant={'small'} color={'text-slate-500'}>
                            <span className="font-medium">
                                {ellipsisText(agreement?.fileName, 11)}
                            </span>
                        </Typography>
                        <div className="flex items-center gap">
                            {/* <a href={agreement?.file} target="_blank"> */}
                            <ActionButton
                                simple
                                Icon={AiFillEye}
                                variant="success"
                                onClick={() => {
                                    onFileClicked({
                                        ...agreement,
                                        extension: extension(agreement?.file),
                                        type: 'all',
                                    })
                                }}
                            >
                                View
                            </ActionButton>
                            {/* </a> */}
                            <a href={agreement?.file}>
                                <ActionButton
                                    simple
                                    variant="link"
                                    Icon={FaCloudDownloadAlt}
                                >
                                    Download
                                </ActionButton>
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                !viewAgreement.isError && (
                    <NoData text={'No Agreement were found'} />
                )
            )}
        </>
    )
}
