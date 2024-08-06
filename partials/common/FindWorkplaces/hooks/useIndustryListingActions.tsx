import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { IndustryStatus } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { AiFillCheckCircle, AiFillWarning } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import { FiLogIn } from 'react-icons/fi'
import { MdDelete, MdOutlineFavorite } from 'react-icons/md'
import { DefaultModal } from '../DefaultModal'
import { DoNotDisturbModal } from '../DoNotDisturbModal'
import { FavoriteModal } from '../FavoriteModal'
import {
    AddToSignupModal,
    BlockIndustryListingModal,
    DeleteFutureIndustryModal,
} from '../modal'
import { AddIndustry } from '../tabs'

export const useIndustryListingActions = (
    onSetIndustryData?: (val: any) => void
) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const router = useRouter()

    const onModalCancelClicked = () => setModal(null)

    const contextBar = useContextBar()

    const onAddToSignupClicked = (industry: any) => {
        setModal(
            <AddToSignupModal
                industry={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const onEditIndustry = (industryData: any) => {
        contextBar.setContent(
            <AddIndustry
                industryData={industryData}
                onSetIndustryData={() => {
                    if (onSetIndustryData) {
                        onSetIndustryData(null)
                    }
                }}
            />
        )
        contextBar.show(false)
        contextBar.setTitle('Edit Future Industry')
    }

    const onDoNotDisturbClicked = (industry: any) => {
        setModal(
            <DoNotDisturbModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onDefaultClicked = (industry: any) => {
        setModal(
            <DefaultModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onBlockClicked = (industry: any) => {
        setModal(
            <BlockIndustryListingModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onFavoriteClicked = (industry: any) => {
        setModal(
            <FavoriteModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const onDeleteFutureIndustry = (industry: any) => {
        setModal(
            <DeleteFutureIndustryModal
                futureIndustry={industry}
                onCancel={onModalCancelClicked}
            />
        )
    }

    const role = getUserCredentials()?.role

    const tableActionOptions = (industry: any) => {
        return [
            {
                text: 'Default',
                onClick: (industry: any) => onDefaultClicked(industry),
                Icon: AiFillCheckCircle,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: industry?.signedUp
                    ? 'Remove From Signup'
                    : 'Add to Signup',
                onClick: (industry: any) => onAddToSignupClicked(industry),
                Icon: AiFillCheckCircle,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: 'Favorite',
                onClick: (industry: any) => onFavoriteClicked(industry),
                Icon: MdOutlineFavorite,
                color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            },
            {
                text: 'Do Not Disturb',
                onClick: (industry: any) => onDoNotDisturbClicked(industry),
                Icon: AiFillWarning,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                ...(industry?.status !== IndustryStatus.BLOCKED
                    ? {
                          text: 'Block Industry',
                          onClick: (industry: any) => onBlockClicked(industry),
                          Icon: AiFillWarning,
                          color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
                      }
                    : {}),
            },
            {
                text: 'SignUp',
                onClick: (industry: any) => {
                    localStorage.setItem(
                        'signup-data',
                        JSON.stringify(industry)
                    )
                    router.push(
                        `/portals/sub-admin/tasks/industry-listing/signup-future-industry`
                    )
                },
                Icon: FiLogIn,
            },
            {
                text: 'Edit',
                onClick: (futureIndustry: any) => {
                    onEditIndustry(futureIndustry)
                },
                Icon: BiPencil,
            },
            {
                ...(role === UserRoles.ADMIN
                    ? {
                          text: 'Delete',
                          onClick: (futureIndustry: any) => {
                              onDeleteFutureIndustry(futureIndustry)
                          },
                          Icon: MdDelete,
                      }
                    : {}),
            },
        ]
    }
    return { actionsModal: modal, tableActionOptions }
}
