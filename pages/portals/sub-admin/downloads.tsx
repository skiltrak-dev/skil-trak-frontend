import { NextPageWithLayout, OptionType } from '@types'
import { ReactElement, useState } from 'react'

// layouts
import { Card, PageTitle, Select, Typography } from '@components'
import { SubAdminLayout } from '@layouts'
import { AiFillFile } from 'react-icons/ai'
import { MdDownloadForOffline } from 'react-icons/md'
import { AuthApi } from '@queries'
import { IoArrowBack } from 'react-icons/io5'
import { FaDownload, FaFileCsv } from 'react-icons/fa'
const Downloads: NextPageWithLayout = () => {
    const [show, setShow] = useState(false)

    const [sectorIds, setSectorIds] = useState([])
    const sectorResponse = AuthApi.useSectors({})
    console.log('sectorResponse', show)

    // onchange

    const sectorOptions =
        sectorResponse.data && sectorResponse.data?.length > 0
            ? sectorResponse.data?.map((sector: any) => ({
                  label: sector.name,
                  value: sector.id,
              }))
            : []

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <PageTitle title={'Downloads'} navigateBack />
            </div>

            <Card>
                {show ? (
                    <>
                        <div
                            onClick={() => setShow(false)}
                            className="cursor-pointer mb-4 flex items-center gap-x-2"
                        >
                            <IoArrowBack className="text-gray-400" />{' '}
                            <Typography variant="muted" color="text-gray-400">
                                Back to download list
                            </Typography>
                        </div>
                        <div className="flex justify-between gap-x-12 items-center  px-4 py-2">
                            <div className="min-w-[18rem]">
                                <Select
                                    label={'Download by Sector(s)'}
                                    name={'sectors'}
                                    options={sectorOptions}
                                    placeholder={'Select Sectors'}
                                    multi
                                    loading={sectorResponse.isLoading}
                                    onChange={(e: any) => {
                                        setSectorIds(e)
                                        console.log('e:::::', e)
                                    }}
                                    validationIcons
                                    onlyValue
                                />
                            </div>
                            {sectorIds?.length > 0 && (
                                <a
                                    href={`${
                                        process.env.NEXT_PUBLIC_END_POINT
                                    }/shared/industries/download?sectors=${sectorIds.join(
                                        ','
                                    )}`}
                                    target="_blank"
                                >
                                    <div className="flex flex-col gap-y-1 items-center group justify-center">
                                        <FaDownload
                                            size={25}
                                            className="text-gray-500 group-hover:text-orange-400 cursor-pointer"
                                        />
                                        <Typography
                                            variant="muted"
                                            color="text-gray-400 group-hover:text-orange-400"
                                        >
                                            Download
                                        </Typography>
                                    </div>
                                </a>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[20rem]">
                        <div
                            onClick={() => setShow(true)}
                            className="flex flex-col group justify-center items-center gap-y-4 cursor-pointer"
                        >
                            <div className="bg-green-200 p-3 rounded-lg">
                                <FaFileCsv
                                    size={40}
                                    className="text-green-400"
                                />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <Typography variant="label" color=' group-hover:text-blue-300'>
                                    Download Industries
                                </Typography>
                                <Typography
                                    variant="muted"
                                    color="text-gray-400 group-hover:text-blue-300"
                                >
                                    Download industries by sectors
                                </Typography>
                            </div>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}

Downloads.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default Downloads
