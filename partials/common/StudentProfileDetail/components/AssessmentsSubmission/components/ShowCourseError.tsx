import { ErrorMessage } from '@hookform/error-message'
import { useFormContext } from 'react-hook-form'

export const ShowCourseError = ({ name }: { name: string }) => {
    const formContext = useFormContext()

    console.log('formContext.formState.errors', formContext.formState.errors)

    return (
        <>
            {formContext && formContext.formState.errors?.[name] ? (
                <div className="help-text text-[11px] mt-1">
                    <ErrorMessage
                        errors={formContext.formState.errors}
                        name={name as any}
                        render={({ message }) => {
                            return (
                                <p className="text-left block text-red-300">
                                    {message}
                                </p>
                            )
                        }}
                    />
                </div>
            ) : null}
        </>
    )
}
