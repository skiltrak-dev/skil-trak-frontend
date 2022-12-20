import { useContextBar } from '@hooks'
import { useEffect, Fragment } from 'react'
import { Typography, ActionButton, NoData } from '@components'
import { ellipsisText } from '@utils'
import { AiFillEye } from 'react-icons/ai'
import { FaCloudDownloadAlt } from 'react-icons/fa'

export const ViewAgreement = ({ agreement }: any) => {
    const { setTitle } = useContextBar()

    useEffect(() => {
        setTitle('View Agreement')
    }, [])

    return (
        <>
            <div className="flex justify-between items-center gap-x-0.5">
                <Typography variant={'small'} color={'text-slate-500'}>
                    <span className="font-medium">
                        {ellipsisText(agreement?.fileName, 11)}
                    </span>
                </Typography>
                <div className="flex items-center gap">
                    <ActionButton simple Icon={AiFillEye} variant="success">
                        <a href={agreement?.file} target="_blank">
                            View
                        </a>
                    </ActionButton>
                    <ActionButton
                        simple
                        variant="link"
                        Icon={FaCloudDownloadAlt}
                    >
                        <a href={agreement?.file}>Download</a>
                    </ActionButton>
                </div>
            </div>
        </>
    )
}
