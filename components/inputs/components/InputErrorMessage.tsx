import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const InputErrorMessage = ({ name }: { name: string }) => {
    const formContext = useFormContext()

    console.log({ aaa: formContext.formState.errors })

    return (
        <div className="help-text text-xs mt-1">
            {formContext && (
                <ErrorMessage
                    errors={formContext.formState.errors}
                    name={name as any}
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
