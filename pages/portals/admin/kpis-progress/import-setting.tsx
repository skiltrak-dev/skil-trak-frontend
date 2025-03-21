import { AdminLayout } from '@layouts'
import { KPISettingPage } from '@partials/common'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { PiUsersBold } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'

const ImportSetting = () => {
    const router = useRouter()
    return (
        <div>
            <div className="flex flex-col px-2 sm:px-4 md:px-6 py-3 md:py-4  sm:flex-row justify-between items-center w-full gap-4 sm:gap-0">
                <div className="flex justify-center sm:justify-start items-center">
                    <p className="  ">
                        <PiUsersBold className="text-lg md:text-xl text-[#1436B0]" />
                    </p>
                    <h1 className="pl-3 md:pl-4 py-2 md:py-3 font-medium text-2xl md:text-3xl font-inter">
                        KPI Setting
                    </h1>
                </div>

                <RxCross2
                    onClick={() => router.back()}
                    className="text-lg md:text-xl text-[#9A9A9A]"
                />
            </div>
            <hr />
            <KPISettingPage />
        </div>
    )
}

ImportSetting.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default ImportSetting
