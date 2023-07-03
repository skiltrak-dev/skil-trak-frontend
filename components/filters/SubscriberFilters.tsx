import { Select, TextInput } from '@components/inputs'
import { OptionType, SubscriberFiltersType } from '@types'

interface ItemFilterProps {
    onFilterChange: (values: SubscriberFiltersType) => void
    filter: SubscriberFiltersType
}

export enum UnsubscribedByEnum {
    Admin = 'admin',
    User = 'user',
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
        { label: 'Admin', value: UnsubscribedByEnum.Admin },
        { label: 'User', value: UnsubscribedByEnum.User },
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
                    (subscribe: OptionType) =>
                        subscribe.value === filter?.isSubscribed
                )}
                onChange={(e: OptionType) => {
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
                    (unsubscribe: OptionType) =>
                        unsubscribe.value === filter?.unsubscribedBy
                )}
                onChange={(e: OptionType) => {
                    onFilterChange({
                        ...filter,
                        unsubscribedBy: e.value as UnsubscribedByEnum,
                    })
                }}
                options={unsubscribeByOptions}
            />
        </div>
    )
}
