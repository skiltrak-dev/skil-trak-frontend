import { RtoApi } from '@queries'
import { UserRoles } from '@constants' 
import { getUserCredentials } from '@utils'
import { InsuranceDocumentCard } from './card'
import { Button, LoadingAnimation, NoData, Typography } from '@components'

export const InsuranceDocuments = ({
    rtoUser,
    studentProfile,
}: {
    rtoUser?: number
    studentProfile?: boolean
}) => {
    const role = getUserCredentials()?.role

    const rtoInsuranceList = RtoApi.Insurance.rtoInsuranceList(rtoUser, {
        skip:
            (role === UserRoles.ADMIN || role === UserRoles.SUBADMIN) &&
            !rtoUser,
    })
    return (
        <div className="bg-[#24556D0F] rounded-[5px] py-4 px-5 w-full">
            <div className="flex justify-between items-center w-full">
                <div>
                    <Typography variant="label" medium>
                        Insurance Documents
                    </Typography>
                    <Typography variant="xs">
                        Please select the appropriate insurance document for the
                        student’s placement.
                    </Typography>
                </div>
                {rtoInsuranceList?.isError ? (
                    <Button
                        variant="action"
                        text={'Refetch'}
                        onClick={() => rtoInsuranceList?.refetch()}
                    />
                ) : null}
            </div>

            {/*  */}

            {rtoInsuranceList?.isError ? (
                <NoData
                    text="There is some technical issue, try reload the page!"
                    isError
                />
            ) : null}

            {rtoInsuranceList?.isLoading ? (
                <LoadingAnimation size={90} />
            ) : rtoInsuranceList?.data && rtoInsuranceList?.data?.length > 0 ? (
                <div className="flex flex-col gap-y-2.5 mt-3 w-full">
                    {rtoInsuranceList?.data?.map((insurance: any) => (
                        <InsuranceDocumentCard
                            key={insurance?.id}
                            insurance={insurance}
                            rtoUser={rtoUser}
                            studentProfile={studentProfile}
                        />
                    ))}
                </div>
            ) : rtoInsuranceList?.isSuccess ? (
                <NoData text={'There is no any documents list'} />
            ) : null}
        </div>
    )
}
