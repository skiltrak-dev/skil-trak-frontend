import { Select, TextInput } from '@components/inputs'

interface ItemFilterProps {
    onFilterChange: Function
    filter: any
}
export const SubscriberFilters = ({
    onFilterChange,
    filter,
}: ItemFilterProps) => {
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
                onChange={(e: any) => {
                    onFilterChange({
                        ...filter,
                        isSubscribed: e.value ? 'true' : 'false',
                    })
                }}
                options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                ]}
            />
            <Select
                name="unsubscribedBy"
                label={'Unsubscribed By'}
                value={filter['unsubscribedBy']}
                onChange={(e: any) => {
                    onFilterChange({ ...filter, unsubscribedBy: e.value })
                }}
                options={[
                    { label: 'Admin', value: 'admin' },
                    { label: 'User', value: 'user' },
                ]}
            />
        </div>
    )
}
