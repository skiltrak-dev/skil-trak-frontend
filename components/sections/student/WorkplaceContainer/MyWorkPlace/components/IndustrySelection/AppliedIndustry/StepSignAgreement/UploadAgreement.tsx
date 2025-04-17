import { Button } from '@components/buttons'

export const UploadAgreement = ({ name, loading }: any) => {
    return (
        <Button loading={loading} disabled={loading}>
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                Sign Agreement
            </label>
        </Button>
    )
}
