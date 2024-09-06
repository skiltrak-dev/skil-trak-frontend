export const LogbookTextField = ({
    value,
    onChange,
}: {
    value: string
    onChange: (e: any) => void
}) => {
    return (
        <input
            name="saad"
            onChange={onChange}
            value={value}
            className="w-full border border-info h-8 rounded outline-none px-2"
        />
    )
}
