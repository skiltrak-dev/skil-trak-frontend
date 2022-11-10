import classNames from 'classnames'

interface PortalTypeBadgeProps {
    type: 'admin' | 'industry' | 'student' | 'rto' | 'coordinator'
}

const PortalTypes = {
    admin: { text: 'Admin', classes: 'text-blue-500 border-blue-300' },
    industry: { text: 'Industry', classes: 'text-green-500 border-green-300' },
    rto: { text: 'RTO', classes: 'text-orange-500 border-orange-300' },
    student: { text: 'Student', classes: 'text-red-500 border-red-300' },
    coordinator: {
        text: 'Sub-Admin',
        classes: 'text-indigo-500 border-indigo-300',
    },
}
export const PortalTypeBadge = ({ type }: PortalTypeBadgeProps) => {
    const classes = classNames({
        'absolute -top-1 uppercase font-semibold right-0 rounded border text-[8px] px-2':
            true,
    })
    return (
        <span className={`${classes} ${PortalTypes[type].classes}`}>
            {PortalTypes[type].text}
        </span>
    )
}
