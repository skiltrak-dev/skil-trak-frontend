import { isBrowser } from './browser-supported'

const KEYS = {
    SIGNUP_DATA: 'signup-data',
    EDITING_MODE: 'signup-editing-mode',
}

const getValuesFromStorage = () => {
    if (isBrowser()) {
        const data = localStorage.getItem(KEYS.SIGNUP_DATA)
        return data ? JSON.parse(data) : undefined
    }

    return undefined
}

const setValuesToStorage = <FormDataType>(values: FormDataType) => {
    if (isBrowser()) {
        const stringifiedValues = JSON.stringify(values)
        localStorage.setItem(KEYS.SIGNUP_DATA, stringifiedValues)
    }

    return undefined
}

const setEditingMode = (value: boolean) => {
    if (isBrowser())
        localStorage.setItem(
            KEYS.EDITING_MODE,
            JSON.stringify({ editing: value })
        )
    return undefined
}

const getEditingMode = () => {
    if (isBrowser()) {
        const editingModeString = localStorage.getItem(KEYS.EDITING_MODE)
        if (editingModeString) {
            const editing = JSON.parse(editingModeString)
            if (editing) {
                return editing['editing']
            }
        }

        return false
    }

    return false
}

const clearValuesFromStorage = () => {
    if (isBrowser()) {
        localStorage.removeItem(KEYS.EDITING_MODE)
        localStorage.removeItem(KEYS.SIGNUP_DATA)
    }
}

export const SignUpUtils = {
    getValuesFromStorage,
    setValuesToStorage,
    setEditingMode,
    getEditingMode,
    clearValuesFromStorage,
}
