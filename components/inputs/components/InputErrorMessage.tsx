import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const InputErrorMessage = ({
    name,
    subname,
}: {
    name: string
    subname?: string
}) => {
    const formContext = useFormContext()

    // Construct error path based on subname prop
    const getErrorPath = () => {
        if (subname) {
            return formContext.formState.errors?.[subname]
        }
        return formContext.formState.errors
    }

    return (
        <div className="help-text text-xs mt-1">
            {formContext && (
                <ErrorMessage
                    errors={getErrorPath()}
                    name={name}
                    render={({ message }) => {
                        return (
                            <p className="text-left block text-red-600">
                                {message}
                            </p>
                        )
                    }}
                />
            )}
        </div>
    )
}
