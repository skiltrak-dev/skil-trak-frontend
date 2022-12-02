import { Button } from '@components/buttons'
import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import { useRouter } from 'next/router'
import { ApplyIndustryCard } from './ApplyIndustryCard'
import { ApplyForWorkplaceIndustry } from '../IndustrySelection/ApplyForWorkplaceIndustry'
import { useApplyWorkplaceWithAbnIndustryMutation } from '@queries'

type Props = {
    setActive: any
    personalInfoData: any
    res: any
    industry: any
    setWorkplaceData: any
}

export const YourIndustry = ({
    setActive,
    personalInfoData,
    res,
    industry,
    setWorkplaceData,
}: Props) => {
    const router = useRouter()

    return (
        <div>
            <Card>
                <Typography variant="h4">Your Industry</Typography>
                {res?.isSuccess && res?.data?.length > 0 ? (
                    <p>{res?.data?.businessName}</p>
                ) : (
                    <>
                        {/* <p className="mt-2 text-red-400">Industry Not found</p> */}
                        <ApplyIndustryCard
                            industry={industry}
                            setActive={setActive}
                            setWorkplaceData={setWorkplaceData}
                        />
                    </>
                )}
            </Card>
        </div>
    )
}
