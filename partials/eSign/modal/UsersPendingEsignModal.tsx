import { Button, GlobalModal, Typography } from '@components'
import { MediaQueries } from '@constants'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'

export const UsersPendingEsignModal = ({
    documents,
    onClick,
    route,
    onCancel,
}: {
    documents: any
    onClick: () => void
    route: string
    onCancel?: any
}) => {
    const router = useRouter()

    const isMobile = useMediaQuery(MediaQueries.Tablet)

    return (
        <>
            <GlobalModal>
                <div className="max-w-5xl min-w-full md:min-w-[750px] lg:min-w-[850px] relative">
                    {onCancel ? (
                        <MdCancel
                            onClick={onCancel}
                            className="absolute top-2 right-2 transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                        />
                    ) : null}

                    <div className="flex flex-col gap-y-2.5 justify-center items-center py-3 border-b border-[#24556D]">
                        <Image
                            src={'/images/esignDoc.png'}
                            alt={''}
                            width={30}
                            height={30}
                        />
                        <div className="flex flex-col justify-center items-center gap-y-1.5">
                            <Typography variant="label" center>
                                Following documents are pending to be signed
                            </Typography>
                            <Typography
                                variant="small"
                                color={'text-[#767F8C]'}
                            >
                                {documents?.length} Pending Documents Esigns
                            </Typography>
                        </div>
                    </div>

                    {/*  */}

                    <div className="flex flex-col gap-y-2.5 py-2.5 px-3.5 max-h-[70vh] overflow-auto custom-scrollbar">
                        {documents?.map((document: any, i: any) => (
                            <div
                                key={document?.id}
                                className="relative bg-[#F4F6F8] rounded-[10px] border border-dashed border-[#6BB8FF]"
                            >
                                <div className="py-4 px-3 grid grid-cols-2 lg:grid-cols-3 items-center gap-x-8 border-b border-[#C6C6C6] gap-y-3.5">
                                    <div className="flex items-center gap-x-3 col-span-2 lg:col-span-1">
                                        <div className="absolute top-2 right-2 lg:top-0 lg:right-0 lg:relative">
                                            <div className="min-w-6 min-h-6 w-fit rounded-full bg-[#24536B] text-white flex justify-center items-center text-xs font-bold">
                                                {i < 9 ? '0' : ''}
                                                {i + 1}
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-auto">
                                            <Typography
                                                color="text-[#767F8C]"
                                                variant="xxs"
                                                center={isMobile ? true : false}
                                            >
                                                Document Name
                                            </Typography>
                                            <Typography
                                                color="text-primaryNew"
                                                variant="small"
                                                semibold
                                                center={isMobile ? true : false}
                                            >
                                                {document?.template?.name}
                                            </Typography>
                                        </div>
                                    </div>

                                    {/*  */}
                                    <div>
                                        <Typography
                                            color="text-[#767F8C]"
                                            variant="xxs"
                                        >
                                            Course{' '}
                                        </Typography>
                                        <Typography
                                            color="text-primaryNew"
                                            variant="small"
                                            semibold
                                        >
                                            {document?.template?.course?.title}
                                        </Typography>
                                    </div>

                                    {/*  */}
                                    <div>
                                        <Typography
                                            color="text-[#767F8C]"
                                            variant="xxs"
                                        >
                                            Folder
                                        </Typography>
                                        <Typography
                                            color="text-primaryNew"
                                            variant="small"
                                            semibold
                                        >
                                            {document?.template?.folder?.name}
                                        </Typography>
                                    </div>
                                </div>

                                {/*  */}
                                <div className="px-1.5 lg:px-6 py-4 flex flex-col gap-y-3">
                                    <Typography center variant="xs" bold>
                                        Signers
                                    </Typography>
                                    <div className="grid grid-cols-2 lg:grid-cols-1 lg:flex lg:justify-center lg:items-center gap-1.5 ">
                                        {document?.signers?.map(
                                            (signer: any) => (
                                                <div className="border border-dashed border-[#24556D] rounded-[10px] py-3.5 w-full lg:w-1/4 flex flex-col justify-center items-center gap-y-2">
                                                    <Typography
                                                        variant="xxs"
                                                        medium
                                                        capitalize
                                                    >
                                                        {signer?.user?.role}
                                                    </Typography>
                                                    <div className="flex flex-col justify-center items-center gap-x-1">
                                                        <Typography
                                                            variant="small"
                                                            medium
                                                            center
                                                        >
                                                            <span className="break-all">
                                                                {
                                                                    signer?.user
                                                                        ?.name
                                                                }
                                                            </span>
                                                        </Typography>
                                                        <Typography
                                                            variant="xxs"
                                                            color={
                                                                'text-[#767F8C]'
                                                            }
                                                            center
                                                        >
                                                            <span className="break-all">
                                                                {
                                                                    signer?.user
                                                                        ?.email
                                                                }
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/*  */}
                                <div className="flex justify-center pb-4">
                                    <Button
                                        variant="primaryNew"
                                        outline
                                        text="Sign Document"
                                        onClick={() => {
                                            router.push(
                                                `${route}/${document?.id}`
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </GlobalModal>
        </>
    )
}
