export const HowItWorks = ({ title, description }: any) => {
    return (
        <div>
            <p className="text-sm font-semibold text-black">{title}</p>
            <p className="text-xs leading-[14px] mt-1 text-black">
                {description}
            </p>
        </div>
    )
}
