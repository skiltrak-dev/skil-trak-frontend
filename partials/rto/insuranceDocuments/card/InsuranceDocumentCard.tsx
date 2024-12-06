import { ActionButton, Button, Typography } from '@components'
import moment from 'moment'
import { ReactElement, useMemo, useState } from 'react'
import classNames from 'classnames'
import { UploadDocModal } from '../modal'
import { useAssessmentDocumentsView } from '@partials/common/StudentProfileDetail/components'

export const InsuranceDocumentCard = ({ insurance }: { insurance: any }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selected, setSelected] = useState<boolean>(false)
    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const onCancel = () => setModal(null)

    const document = insurance?.document?.[0]

    const latestDocument = useMemo(() => {
        return insurance?.document?.reduce(
            (latest: any, current: any) =>
                new Date(current?.createdAt) > new Date(latest?.createdAt)
                    ? current
                    : latest,
            insurance?.document?.[0]
        )
    }, [insurance?.document])

    const isExpired = moment(latestDocument?.expiryDate).isBefore(
        moment(),
        'day'
    )

    const getButtons = () => {
        if (selected && !latestDocument) {
            return (
                <Button
                    text="Upload"
                    onClick={() => {
                        setModal(
                            <UploadDocModal
                                onCancel={onCancel}
                                insuranceDocumentType={insurance?.id}
                            />
                        )
                    }}
                />
            )
        } else if (latestDocument) {
            return (
                <div className="flex items-center gap-x-2">
                    <Button
                        text="View"
                        variant="info"
                        onClick={() => {
                            onFileClicked({
                                ...latestDocument,
                                showEdit: false,
                                file: latestDocument?.file
                                    .replaceAll('{"', '')
                                    .replaceAll('"}', ''),
                                extension: latestDocument?.file
                                    ?.split('.')
                                    ?.reverse()?.[0],
                                type: 'all',
                            })
                        }}
                    />
                    <ActionButton
                        variant="warning"
                        onClick={() => {
                            setModal(
                                <UploadDocModal
                                    onCancel={onCancel}
                                    insuranceDocumentType={insurance?.id}
                                />
                            )
                        }}
                    >
                        Update
                    </ActionButton>
                </div>
            )
        } else {
            return (
                <Button
                    onClick={() => {
                        setSelected(true)
                    }}
                    text={'Select'}
                    variant="dark"
                />
            )
        }
    }

    const classes = classNames({
        'py-1 rounded border border-[#A5A3A9]  pl-4 pr-2 flex justify-between items-center':
            true,
        'bg-[#F7910F1A]': selected && !latestDocument,
        'bg-[#128C7E1A]': latestDocument,
        'bg-[#D9D9D966]': !selected && !latestDocument,
        'bg-primary-light': isExpired,
    })

    return (
        <>
            {modal}
            {documentsViewModal}
            <div className={classes}>
                <Typography variant="label" medium>
                    {insurance?.title}
                </Typography>{' '}
                <div className="flex items-center gap-x-6">
                    {latestDocument &&
                        (isExpired ? (
                            <div className="flex items-center gap-x-1">
                                <Typography
                                    variant="small"
                                    color={'text-[#24556D]'}
                                    whiteSpacePre
                                >
                                    Expired:
                                </Typography>
                                <Typography
                                    variant="small"
                                    medium
                                    whiteSpacePre
                                >
                                    {moment(latestDocument?.expiryDate).format(
                                        'DD/MM/YYYY'
                                    )}
                                </Typography>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-x-1">
                                    <Typography
                                        variant="small"
                                        color={'text-[#24556D]'}
                                        whiteSpacePre
                                    >
                                        Confirm by:
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        medium
                                        whiteSpacePre
                                    >
                                        {latestDocument?.confirmedBy}
                                    </Typography>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <Typography
                                        variant="small"
                                        color={'text-[#24556D]'}
                                        whiteSpacePre
                                    >
                                        Expiry Date:
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        medium
                                        whiteSpacePre
                                    >
                                        {moment(
                                            latestDocument?.expiryDate
                                        ).format('DD/MM/YYYY')}
                                    </Typography>
                                </div>
                            </>
                        ))}
                    <div>{getButtons()}</div>
                    {/* */}
                </div>
            </div>
        </>
    )
}
