import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const InputErrorMessage = ({ name }: { name: string }) => {
    const formContext = useFormContext()

    return (
        <div className="help-text">
            {formContext && (
                <ErrorMessage
                    errors={formContext.formState.errors}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={name as any}
                    render={({ message }) => {
                        return (
                            <p className="mt-1 ml-1 text-xs text-left block text-red-600">
                                {message}
                            </p>
                        )
                    }}
                />
            )}
        </div>
    )
}
