import { TextInput } from '@components'
import { Title } from '@partials/rto-v2'
import classNames from 'classnames'
import { User } from 'lucide-react'

export const AvailableServiceBaseForm = ({
    variant,
}: {
    variant?: 'primaryNew' | 'primary' | 'success'
}) => {
    const iconClasses = classNames({
        'bg-primaryNew/10 !text-primaryNew': true,
        '!bg-primary/10 !text-primary': variant === 'primary',
        '!bg-success/10 !text-primarySuccess': variant === 'success',
    })
    return (
        <div>
            <div className="space-y-4">
                <Title
                    Icon={User}
                    title="Your Contact Details"
                    description="Person making this enquiry"
                    iconClasses={iconClasses}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <TextInput
                            label={'Full Name'}
                            required
                            name={'contactPersonName'}
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="space-y-2">
                        <TextInput
                            label={'Role/Title'}
                            required
                            name={'role'}
                            placeholder="e.g., Training Coordinator"
                        />
                    </div>

                    <div className="space-y-2">
                        <TextInput
                            label={'Email Address'}
                            required
                            name={'email'}
                            type={'email'}
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
