import { Select, TextInput } from '@components/inputs'
import { SelectOption } from './types'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const SubscriberFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
    const isSubscribedOptions = [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
    ]

    const unsubscribeByOptions = [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
    ]
    return (
        <div className="flex gap-x-2">
            <TextInput
                name="email"
                label={'Email'}
                placeholder={'Search by Email ...'}
                value={filter['email']}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, email: e.target.value })
                }}
            />
            <Select
                name="isSubscribed"
                label={'Subscribed'}
                value={filter['isSubscribed']}
                defaultValue={isSubscribedOptions?.find(
                    (subscribe: SelectOption) =>
                        subscribe.value === filter?.isSubscribed
                )}
                onChange={(e: any) => {
                    onFilterChange({
                        ...filter,
                        isSubscribed: e.value ? 'true' : 'false',
                    })
                }}
                options={isSubscribedOptions}
            />
            <Select
                name="unsubscribedBy"
                label={'Unsubscribed By'}
                value={filter['unsubscribedBy']}
                defaultValue={unsubscribeByOptions?.find(
                    (unsubscribe: SelectOption) =>
                        unsubscribe.value === filter?.unsubscribedBy
                )}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, unsubscribedBy: e.value })
                }}
                options={unsubscribeByOptions}
            />
        </div>
    )
}
