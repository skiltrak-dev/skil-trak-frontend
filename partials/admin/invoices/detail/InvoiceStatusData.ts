import { PaymentStatusEnum } from '../enum'

export const paymentStatusData = (keyValue: PaymentStatusEnum) => {
    switch (keyValue) {
        case PaymentStatusEnum.Paid:
            return {
                text: 'Paid',
                variant: 'primary',
            }
        case PaymentStatusEnum.DuplicateCharged:
            return {
                text: 'Duplicate Charge',
                variant: 'warning',
            }
        case PaymentStatusEnum.Refunded:
            return {
                text: 'Refunded',
                variant: 'success',
            }
        case PaymentStatusEnum.Deleted:
            return {
                text: 'Deleted',
                variant: 'error',
            }
        default:
            return { text: '---', variant: 'primary' }
    }
}
