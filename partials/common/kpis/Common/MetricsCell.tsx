import { colors } from '../Employees/EmployeeData'

export const MetricsCell = ({ data }: any) => {
    return (
        <div className="flex gap-[13px]">
            {(colors as (keyof typeof data.metrics)[])?.map((color: any) => (
                <span
                    key={color}
                    className={`text-${color}-500 text-[12px] rounded`}
                >
                    {data?.metrics?.[color]}/20
                </span>
            ))}
        </div>
    )
}
