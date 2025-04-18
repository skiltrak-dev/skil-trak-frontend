import Modal from '@modals/Modal'
import { BsInfoCircle } from 'react-icons/bs'
import { VerifiedEmailHistoryModal } from '../modal'

export const VerifiedEmailHistory = ({ userId, isEmailVerified }: any) => {
    return (
        <div>
            {isEmailVerified && (
                <div className="">
                    <Modal>
                        <Modal.Open opens="verifyIndustryEmail">
                            <button className="text-xs text-link pt-2">
                                <BsInfoCircle size={18} />
                            </button>
                        </Modal.Open>
                        <Modal.Window name="verifyIndustryEmail">
                            <VerifiedEmailHistoryModal userId={userId} />
                        </Modal.Window>
                    </Modal>
                </div>
            )}
        </div>
    )
}
