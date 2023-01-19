import { ReactElement } from 'react'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { IndustryProfileFrom } from '@partials/common'
import {
    useGetSubAdminIndustriesProfileQuery,
    useIndustryProfileQuery,
    useUpdateIndustryProfileMutation,
} from '@queries'
import { useRouter } from 'next/router'

// hooks
//components

// icons

type Props = {}

const EditIndustriesProfile: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const profile = useGetSubAdminIndustriesProfileQuery(Number(id), {
        skip: !id,
    })
    const [updateProfile, updateProfileResult] =
        useUpdateIndustryProfileMutation()

    const onSubmit = (values: any) => {
        updateProfile(values)
    }

    return (
        <IndustryProfileFrom
            onSubmit={onSubmit}
            profile={profile}
            result={updateProfileResult}
        />
    )
}
EditIndustriesProfile.getLayout = (page: ReactElement) => {
    return <SubAdminLayout>{page}</SubAdminLayout>
}

export default EditIndustriesProfile
