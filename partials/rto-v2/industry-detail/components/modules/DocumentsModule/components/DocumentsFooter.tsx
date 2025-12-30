import { Button } from '@components'

export function DocumentsFooter() {
    return (
        <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
            <div className="text-xs text-[#64748B]">
                Last updated:{' '}
                <span className="font-medium text-[#1A2332]">
                    December 3, 2024 at 2:30 PM
                </span>
            </div>
            <Button className="bg-gradient-to-br from-[#044866] to-[#0D5468] hover:shadow-lg text-white text-xs font-medium">
                Save Document Requirements
            </Button>
        </div>
    )
}
