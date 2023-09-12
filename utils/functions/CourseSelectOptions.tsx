export const CourseSelectOption = (optionItem: any) => (
    <div
        ref={optionItem.innerRef}
        {...optionItem.innerProps}
        className="flex items-center justify-between text-sm px-2 py-1 hover:bg-gray-100 border-b border-secondary-dark"
    >
        <div>
            <p className="text-[11px] text-gray-600">
                {' '}
                {optionItem.data?.item?.code}{' '}
            </p>
            <p> {optionItem.data?.label} </p>
        </div>
    </div>
)
