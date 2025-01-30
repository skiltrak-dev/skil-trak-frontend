import { TextInput } from '@components'

export const GlobalFilterForm = ({
    onSearch,
}: {
    onSearch: (value: string) => void
}) => {
    return (
        <div className="">
            <TextInput
                label={'Search by Name/Email/Phone'}
                name={'name'}
                placeholder={'Search by Name/Email...'}
                onChange={(e: any) => onSearch(e?.target.value)}
            />
        </div>
    )
}
