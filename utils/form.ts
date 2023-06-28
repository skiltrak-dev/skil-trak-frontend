import { ChangeEvent, FocusEvent } from 'react'

export const getMethodsForInput = (
    name: string,
    formContext: any,
    rules: any,
    onChange: (e: ChangeEvent<HTMLInputElement>) => any,
    onBlur: (e: FocusEvent<HTMLInputElement>) => void
) => {
    let methods: any = {}
    if (formContext) {
        return {
            ...formContext.register(name, {
                ...(rules ? { rules } : {}),
                ...(onChange
                    ? (e: ChangeEvent<HTMLInputElement>) => onChange(e)
                    : {}),
                ...(onBlur
                    ? (e: FocusEvent<HTMLInputElement>) => onBlur(e)
                    : {}),
            }),
        }
    } else {
        if (onChange) {
            methods.onChange = (e: ChangeEvent<HTMLInputElement>) => {
                onChange(e)
            }
        }

        if (onBlur) {
            methods.onBlur = (e: FocusEvent<HTMLInputElement>) => {
                onBlur(e)
            }
        }
    }

    return methods
}
