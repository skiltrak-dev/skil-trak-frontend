import {
    AuthorizedUserComponent,
    Badge,
    Typography,
    useAuthorizedUserComponent,
} from '@components'
import { UserRoles } from '@constants'
import { useWorkplace } from '@hooks'
import { paymentStatusData } from '@partials/admin/invoices'
import { AdminApi } from '@queries'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'

export const WPInvoiceStatus = () => {
    const router = useRouter()

    const { workplaceRto } = useWorkplace()

    const role = getUserCredentials()?.role

    const wpInvoiceStatus = AdminApi.Invoice.getInvoiceStatus(
        Number(router?.query?.id),
        {
            skip:
                !router?.query?.id ||
                ![UserRoles.ADMIN, UserRoles.RTO]?.includes(role) ||
                (role === UserRoles.RTO && !workplaceRto?.canViewPaymentStatus),
        }
    )

    const data = wpInvoiceStatus?.data?.filter((p: any) => p?.paymentStatus)

    const isAuthorized = useAuthorizedUserComponent({
        roles: [UserRoles.ADMIN],
    })
    return (
        <>
            {data && data?.length > 0
                ? (isAuthorized || workplaceRto?.canViewPaymentStatus) && (
                      <>
                          <Typography
                              variant="xs"
                              color={'text-gray-500'}
                              medium
                          >
                              Invoice Status :
                          </Typography>
                          <div className="flex items-center gap-2 flex-wrap">
                              {data?.map((d: any) => (
                                  <div className="flex gap-x-2 group relative">
                                      <Badge
                                          text={
                                              paymentStatusData(
                                                  d?.paymentStatus
                                              )?.text + ''
                                          }
                                          variant={'error'}
                                      />

                                      <div className="hidden group-hover:block absolute top-full  z-10 bg-white rounded-md shadow-xl border border-gray-200 py-1 w-48 p-2 ">
                                          <div className="flex flex-col gap-y-2">
                                              <div>
                                                  <Typography variant="small">
                                                      Course:
                                                  </Typography>
                                                  <Typography
                                                      variant="small"
                                                      semibold
                                                  >
                                                      {d?.course?.title}
                                                  </Typography>
                                              </div>
                                              <div>
                                                  <Typography variant="small">
                                                      Invoice Action:
                                                  </Typography>
                                                  <Typography
                                                      variant="small"
                                                      uppercase
                                                      semibold
                                                  >
                                                      {d?.invoiceAction}
                                                  </Typography>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </>
                  )
                : null}
        </>
    )
}
