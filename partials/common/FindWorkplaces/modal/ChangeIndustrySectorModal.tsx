import {
    Badge,
    Button,
    Modal,
    Select,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { AuthApi, CommonApi } from '@queries'
import { getPostalCode } from '@utils'
import React, { useEffect, useMemo, useState } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import {
    MdCancel,
    MdDescription,
    MdLanguage,
    MdLocationOn,
} from 'react-icons/md'

interface ConfirmationModalProps {
    onCancel: () => void
    company: any
    setRemovedItems: (item: any) => void
}

export const ChangeIndustrySectorModal: React.FC<ConfirmationModalProps> = ({
    onCancel,
    company,
    setRemovedItems,
}) => {
    const [postCode, setPostCode] = useState<string | null>(null)
    const [selectedSector, setSelectedSector] = useState<number | null>(null)

    const [submitAutoListing, submitAutoListingResult] =
        CommonApi.FindWorkplace.submitAutoListing()

    const { notification } = useNotification()

    useEffect(() => {
        const getPostCode = async () => {
            const postalCode = await getPostalCode(company?.location)
            setPostCode(postalCode)
        }
        getPostCode()
    }, [company?.location])

    const onSubmitListing = async () => {
        if (!selectedSector) {
            notification.warning({
                title: 'Sector Required!',
                description: 'Please select a sector',
            })
            return
        }

        const res: any = await submitAutoListing({
            id: Number(selectedSector),
            listing: [company?.placeId],
        })

        if (res?.data) {
            notification.success({
                title: 'Updated',
                description: 'Listing Updated',
            })
            setRemovedItems(
                (prev: string[]) => new Set([...prev, company?.placeId])
            )
            onCancel()
        }
    }

    const sectorResponse = AuthApi.useSectors({})

    const sectorsOptions = useMemo(
        () =>
            sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            })),
        [sectorResponse.data, sectorResponse.isSuccess]
    )

    const handleSectorChange = (option: number | null) => {
        setSelectedSector(option)
    }

    return (
        <>
            <ShowErrorNotifications result={submitAutoListingResult} />
            <Modal
                title="Update Industry Sector!"
                subtitle=" "
                onCancelClick={onCancel}
                showActions={false}
            >
                <div className="">
                    <div className="w-full flex flex-col space-y-1">
                        <Select
                            name="sector"
                            label={'Sector Sector'}
                            required
                            onlyValue
                            options={sectorsOptions}
                            loading={sectorResponse?.isLoading}
                            disabled={sectorResponse?.isLoading}
                            onChange={handleSectorChange}
                            placeholder="Search and select a sector..."
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        <FaBriefcase className="w-3 h-3 text-gray-700 flex-shrink-0" />
                        <h3 className="text-sm truncate font-medium text-gray-700">
                            {company?.name}
                        </h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="w-3 h-3 flex-shrink-0 text-gray-700" />
                        <Typography variant="xs" color="text-gray-600">
                            <span className="truncate">{company?.address}</span>
                        </Typography>
                        <Badge variant="primaryNew" text={postCode + ''} />
                    </div>

                    {company?.website && (
                        <div className="flex gap-2">
                            <MdLanguage className="w-3 h-3 flex-shrink-0" />
                            <Typography variant="xs" color="text-gray-500">
                                <span className="break-all">
                                    {company?.website}
                                </span>
                            </Typography>
                        </div>
                    )}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            variant="primaryNew"
                            onClick={onSubmitListing}
                            text="Submit"
                            loading={submitAutoListingResult?.isLoading}
                            disabled={submitAutoListingResult?.isLoading}
                            Icon={MdDescription}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}
