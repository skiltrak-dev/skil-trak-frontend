import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export const PasswordView = ({
    onClick,
    passwordType,
}: {
    onClick: () => void
    passwordType: string | null
}) => {
    return (
        <div
            className="absolute right-5 top-2.5 cursor-pointer"
            onClick={() => {
                onClick()
            }}
        >
            {passwordType === 'password' ? (
                <AiFillEye className="text-xl text-gray-500" />
            ) : (
                <AiFillEyeInvisible className="text-xl text-gray-500" />
            )}
        </div>
    )
}
