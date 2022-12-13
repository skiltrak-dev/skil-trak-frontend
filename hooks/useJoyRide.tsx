import {
    createContext,
    ReactElement,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from 'react'
import { CallBackProps } from 'react-joyride'

interface JoyRideStep {
    target: string
    content: ReactElement | ReactNode
    disableBeacon?: boolean
}

interface JoyRideState {
    run: boolean | undefined
    stepIndex: number
    steps: JoyRideStep[]
    tourActive: boolean
    callback: (data: CallBackProps) => void
}

interface JoyRide {
    state: JoyRideState
    setState: (
        patch:
            | Partial<JoyRideState>
            | ((previousState: JoyRideState) => Partial<JoyRideState>)
    ) => void
}

const joyRideState = {
    run: false,
    stepIndex: 0,
    steps: [],
    tourActive: false,
    callback: () => undefined,
}

export const JoyRideContext = createContext<JoyRide>({
    state: joyRideState,
    setState: () => undefined,
})
JoyRideContext.displayName = 'JoyRideContext'

export const JoyRideProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [state, setState] = useState<any>(joyRideState)

    const values = useMemo(
        () => ({
            state,
            setState,
        }),
        [setState, state]
    )

    return (
        <JoyRideContext.Provider value={values}>
            {children}
        </JoyRideContext.Provider>
    )
}

export const useJoyRide = () => {
    const context = useContext(JoyRideContext) as JoyRide
    if (!context) {
        throw new Error('useJoyRide must be used within a JoyRideProvider')
    }
    return context
}
