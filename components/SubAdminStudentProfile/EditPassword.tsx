import { TextInput } from '@components/inputs'
import { Modal } from '@components/Modal'
import React from 'react'

export const EditPassword = ({ onCancel }: { onCancel: Function }) => {
    return (
        <div>
            <Modal
                title={'Edit PassWord'}
                subtitle={'Edit Password'}
                onConfirmClick={onCancel}
                onCancelClick={onCancel}
            >
                <TextInput
                    label={'Password'}
                    name={'password'}
                    type={'password'}
                    placeholder={'Password'}
                />
                <TextInput
                    label={'Confirm Password'}
                    name={'confirmPassword'}
                    type={'password'}
                    placeholder={'Confirm Password'}
                />
            </Modal>
        </div>
    )
}
