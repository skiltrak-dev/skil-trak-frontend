import { Typography } from '@components'
import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const InputErrorMessage = ({ name }: { name: string }) => {
    const formContext = useFormContext()

    return formContext?.formState.errors?.[name] ? (
        <div className="help-text text-xs mt-1">
            {formContext && (
                <ErrorMessage
                    errors={formContext?.formState.errors}
                    name={name}
                    render={({ message }) => (
                        <Typography variant="xs" color={'text-red-600'}>
                            {message}
                        </Typography>
                    )}
                />
            )}
        </div>
    ) : null
}
