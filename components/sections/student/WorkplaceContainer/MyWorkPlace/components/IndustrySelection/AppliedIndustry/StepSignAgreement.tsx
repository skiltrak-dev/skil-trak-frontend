import { Button } from "@components/buttons"

export const StepSignAgreement = () => {
    return (
        <div className="border border-pink-700  px-2 py-3 rounded-md text-sm">
            <p className="text-pink-700 font-medium">Sign Agreement</p>
            <p className="text-gray-500">
                You need to sign agreement to start placement
            </p>

            <div className="mt-4">
                <Button>Sign Agreement</Button>
            </div>
        </div>
    )
}
