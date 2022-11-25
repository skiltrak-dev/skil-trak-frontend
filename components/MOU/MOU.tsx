import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/router'
import ReactSignatureCanvas from 'react-signature-canvas'

// Icons
import { MdSimCardDownload } from 'react-icons/md'

// components
import {
    Card,
    ActionAlert,
    Button,
    Typography,
    BackButton,
    LoadingAnimation,
    TechnicalError,
    // TechnicalError,
} from '@components'
import { MouEditor, Signature } from './components'

// utils
import { getUserCredentials } from '@utils'

export const MOUDetailContainer = forwardRef(
    (
        {
            id,
            role,
            isSigned,
            content,
            setContent,
            createMouResult,
            getMouResult,
            acceptMouResult,
            defaultMou,
            onSubmit,
        }: any,
        ref
    ) => {
        const router = useRouter()

        const [editMou, setEditMou] = useState<boolean | null>(false)
        const [saveContentButton, setSaveContentButton] = useState<any | null>(
            null
        )

        useEffect(() => {
            if (!getMouResult?.data) {
                setContent(defaultMou?.data?.content)
            }
        }, [getMouResult.data, defaultMou.data])

        useEffect(() => {
            if (getMouResult?.data) {
                setContent(getMouResult?.data?.content)
            }
        }, [getMouResult.data])

        useEffect(() => {
            if (getMouResult?.data?.status === 'cencelled') {
                router.push('/general-information/mou')
            }
        }, [getMouResult, router])

        const saveContent = (content: any) => {
            setContent(content)
        }

        const IndustryName = getUserCredentials()

        let replacedContent = content?.replace(/\\n/g, '<br/>')
        if (getMouResult.data) {
            replacedContent = replacedContent?.slice(1, -1)
        }

        const loading = getMouResult.isLoading || defaultMou.isLoading
        const isError = getMouResult.isError || defaultMou.isError

        return (
            <>
                <BackButton text={"Back To MoU's"} />

                {createMouResult.isSuccess || acceptMouResult.isSuccess ? (
                    <Card>
                        <ActionAlert
                            title={`Successfully partnered up with ${getMouResult?.data?.rto?.user?.name}`}
                            description={
                                'You will be redirected to MOU in a moment.'
                            }
                        />
                    </Card>
                ) : (
                    <Card>
                        {isError && <TechnicalError />}
                        {!loading ? (
                            <div className={`${isError ? 'hidden' : ''}`}>
                                <div className="flex justify-between items-center ">
                                    <Typography variant={'h4'}>
                                        Memorendum Ou
                                    </Typography>

                                    <div className="flex justify-end items-center gap-x-4">
                                        {!editMou ? (
                                            <>
                                                {!getMouResult?.data
                                                    ?.industrySignature &&
                                                    !getMouResult?.data
                                                        ?.rtoSignature && (
                                                        <Button
                                                            variant={
                                                                'secondary'
                                                            }
                                                            text={'Edit'}
                                                            onClick={() =>
                                                                setEditMou(true)
                                                            }
                                                        />
                                                    )}
                                                {getMouResult?.data?.status ===
                                                    'signed' && (
                                                    <a
                                                        href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${id}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        <Button
                                                            variant={'action'}
                                                            Icon={
                                                                MdSimCardDownload
                                                            }
                                                            submit
                                                            text={'Download'}
                                                        />
                                                    </a>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    onClick={() =>
                                                        setEditMou(false)
                                                    }
                                                    variant={'secondary'}
                                                    text={'Cancel'}
                                                />
                                                {saveContentButton}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Data */}
                                <div className="mt-6">
                                    {editMou ? (
                                        <>
                                            <MouEditor
                                                content={content}
                                                saveContent={saveContent}
                                                setEditMou={setEditMou}
                                                setSaveContentButton={
                                                    setSaveContentButton
                                                }
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex justify-end w-full"></div>

                                            {getMouResult.isSuccess && (
                                                <div
                                                    className="my-4"
                                                    dangerouslySetInnerHTML={{
                                                        __html: replacedContent,
                                                    }}
                                                />
                                            )}
                                        </>
                                    )}

                                    {/* Signature */}
                                    <div className="flex items-start gap-x-3">
                                        {getMouResult?.data?.rtoSignature ? (
                                            <div className="my-5 w-full max-w-[50%]">
                                                <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                                                    <img
                                                        className="object-cover p-5"
                                                        src={
                                                            getMouResult.data
                                                                .rtoSignature
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <Typography variant={'label'}>
                                                    {getMouResult?.data?.rto
                                                        ?.user?.name || 'RTO'}
                                                </Typography>
                                            </div>
                                        ) : (
                                            role === 'rto' && (
                                                <Signature
                                                    industryName={
                                                        IndustryName?.name
                                                    }
                                                    ref={ref}
                                                />
                                            )
                                        )}
                                        {getMouResult?.data
                                            ?.signedByIndustry ? (
                                            <div className="my-5 w-full max-w-[50%] ml-auto">
                                                <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                                                    <img
                                                        className="object-cover p-5"
                                                        src={
                                                            getMouResult.data
                                                                .industrySignature
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <Typography variant={'label'}>
                                                    {IndustryName?.username}
                                                </Typography>
                                            </div>
                                        ) : (
                                            role === 'industry' && (
                                                <Signature
                                                    industryName={
                                                        IndustryName?.name
                                                    }
                                                    ref={ref}
                                                />
                                            )
                                        )}
                                    </div>

                                    {/* Action */}
                                    {getMouResult?.data?.status !==
                                        'signed' && (
                                        <Button
                                            onClick={onSubmit}
                                            loading={
                                                acceptMouResult.isLoading ||
                                                createMouResult.isLoading
                                            }
                                            disabled={
                                                acceptMouResult.isLoading ||
                                                createMouResult.isLoading
                                            }
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <LoadingAnimation />
                        )}
                    </Card>
                )}
            </>
        )
    }
)
MOUDetailContainer.displayName = 'Search'
