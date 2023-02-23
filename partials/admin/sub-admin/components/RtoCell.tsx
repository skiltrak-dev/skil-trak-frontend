import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Industry, Rto, SubAdmin } from '@types'
import Link from 'next/link'
import { FaHandshake } from 'react-icons/fa'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { ViewRtosCB } from '../contextBar'

export const RtoCell = ({ subAdmin }: { subAdmin: SubAdmin }) => {
    const contextBar = useContextBar()

    const onViewClicked = (subAdmin: SubAdmin) => {
        contextBar.setTitle('Assigned RTOs')
        contextBar.setContent(<ViewRtosCB subAdmin={subAdmin} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewClicked(subAdmin)}
                    simple
                >
                    <span className="whitespace-pre">View / Edit</span>
                </ActionButton>
            </div>
        </div>
    )
}
