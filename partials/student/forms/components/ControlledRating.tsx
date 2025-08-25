import { IndustryFeedbackStarRating } from '@partials/student/components'
import { Controller } from 'react-hook-form'

interface ControlledRatingProps {
    name: string
    label: string
    description?: string
    control: any
}

export const ControlledRating = ({
    name,
    label,
    description,
    control,
}: ControlledRatingProps) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div>
                <IndustryFeedbackStarRating
                    label={label}
                    description={description}
                    rating={field.value || 0} // ensure it always has a value
                    onRatingChange={field.onChange}
                />
                {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">
                        {fieldState.error.message}
                    </p>
                )}
            </div>
        )}
    />
)
