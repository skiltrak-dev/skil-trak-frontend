import { LoadingAnimation, TechnicalError } from '@components'
import { AdminApi } from '@queries'
import { AnimatePresence } from 'framer-motion'
import { EnquiryCard } from '../Cards'
import { EnquiryFilters } from '../RTOEnquiryQueue'
import { NoEnquiryFound } from './NoEnquiryFound'
import { RtoInquiryRequestStatus } from '../enum'
import { removeEmptyValues } from '@utils'

export const Enquiries = ({ filters }: { filters: EnquiryFilters }) => {
    const getRtoEnquiries = AdminApi.RtoEnquiry.getRtoEnquiries(
        {
            search: `${JSON.stringify(
                removeEmptyValues({
                    ...filters,
                    status:
                        filters?.status === RtoInquiryRequestStatus.All
                            ? null
                            : filters?.status,
                })
            )
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
        },
        { refetchOnMountOrArgChange: 30 }
    )
    return (
        <div>
            {/* Enquiries List */}
            {getRtoEnquiries?.isError ? <TechnicalError /> : null}
            <AnimatePresence mode="popLayout">
                {getRtoEnquiries?.isLoading || getRtoEnquiries?.isFetching ? (
                    <LoadingAnimation />
                ) : getRtoEnquiries?.data?.data &&
                  getRtoEnquiries?.data?.data?.length > 0 &&
                  getRtoEnquiries?.isSuccess ? (
                    <div className="space-y-2">
                        {getRtoEnquiries?.data?.data?.map((enquiry: any) => (
                            <EnquiryCard key={enquiry.id} enquiry={enquiry} />
                        ))}
                    </div>
                ) : getRtoEnquiries?.isSuccess ? (
                    <NoEnquiryFound />
                ) : null}
            </AnimatePresence>
        </div>
    )
}
