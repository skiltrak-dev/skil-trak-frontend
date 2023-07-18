import { ReactNode } from 'react'
import { withErrorBoundary, useErrorBoundary } from 'react-use-error-boundary'

export const ErrorBoundary = withErrorBoundary(
    ({ children }: { children: ReactNode }) => {
        const logErrorToMyService = (error: any, errorInfo: any) => {}
        const [error, resetError] = useErrorBoundary(
            // You can optionally log the error to an error reporting service
            (error, errorInfo) => logErrorToMyService(error, errorInfo)
        )

        if (error) {
            return (
                <div>
                    <p>There is Some issue our team is fixing</p>
                    <button onClick={resetError}>Try again</button>
                </div>
            )
        }

        return <div>{children}</div>
    }
)
