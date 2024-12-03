import { ReactElement, useEffect, useState } from 'react'

import { Button } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    AddTypeInsuaranceModal,
    DocumentTypeCard,
    IndustryInsuarabceDocuments,
    RtoInsuranceDocuments,
} from '@partials'
import { NextPageWithLayout } from '@types'
import { AdminApi } from '@queries'

const InsuranceDocuments: NextPageWithLayout = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selectedType, setSelectedType] = useState<number | null>(null)
    const navBar = useNavbar()

    const getInsuranceType = AdminApi.Insurance.getInsuranceType()

    useEffect(() => {
        navBar.setTitle('Insurance Documents')
    }, [])
    useEffect(() => {
        if (
            getInsuranceType?.isSuccess &&
            getInsuranceType?.data &&
            getInsuranceType?.data?.length > 0
        ) {
            setSelectedType(getInsuranceType?.data?.[0]?.id)
        }
    }, [getInsuranceType])

    const onCancel = () => setModal(null)

    const onAddType = () => {
        setModal(<AddTypeInsuaranceModal onCancel={onCancel} />)
    }

    return (
        <>
            {modal}
            <div className="">
                <div className="flex justify-end gap-x-1.5 items-center px-6 py-3">
                    <Button
                        text="Add Type"
                        variant="dark"
                        onClick={onAddType}
                    />
                    <Button text="Upload Document" />
                </div>

                {/*  */}
                <div className="grid-cols-2 grid lg:grid-cols-3 xl:grid-cols-4 gap-5 px-6 mt-8">
                    {getInsuranceType?.data?.map((type: any, i: number) => (
                        <DocumentTypeCard
                            key={type?.id}
                            index={i}
                            active={type?.id === selectedType}
                            onClick={() => {
                                setSelectedType(type?.id)
                            }}
                            label={type?.title}
                        />
                    ))}
                </div>

                {/*  */}
                <div className="grid grid-cols-2 gap-x-5 px-6 mt-5">
                    <RtoInsuranceDocuments selectedType={selectedType} />
                    <IndustryInsuarabceDocuments />
                </div>
            </div>
        </>
    )
}

InsuranceDocuments.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default InsuranceDocuments
