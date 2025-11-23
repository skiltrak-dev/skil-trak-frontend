import {
    LoadingAnimation,
    Modal,
    NoData,
    ShowErrorNotifications,
} from '@components'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import React from 'react'
import { IndustryGalleryList } from '../components'
import { Industry } from '@types'
import { IndustryApi } from '@queries'
import { IndustryGalleryForm } from '../forms'
import { useNotification } from '@hooks'
import { Upload, List } from 'lucide-react'

export const IndustryGalleryListModal = ({
    onCancel,
    industry,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const gallery = IndustryApi.Gallery.industryGallery({
        userId: Number(industry?.user?.id),
    })

    const [add, addResult] = IndustryApi.Gallery.addIndustryGallery()
    const { notification } = useNotification()

    const onSubmit = async (data: any) => {
        const formData = new FormData()

        Object.entries(data).forEach(([keyBy, value]: any) => {
            formData.append(keyBy, value)
        })
        formData.append('industry', industry?.user?.id + '')

        const res: any = await add(formData)

        if (res?.data) {
            notification.success({
                title: 'Gallery Uploaded',
                description: 'Industry Gallery Uploaded',
            })
            return
        }
        return
    }

    return (
        <div>
            <ShowErrorNotifications result={addResult} />
            <Modal
                title="Industry Gallery"
                subtitle={`Manage industry gallery files`}
                onCancelClick={onCancel}
                showActions={false}
            >
                <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger
                            value="list"
                            className="flex items-center gap-2"
                        >
                            <List className="w-4 h-4" />
                            <span>Gallery List</span>
                            {gallery?.data?.length > 0 && (
                                <span className="ml-1 text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                                    {gallery?.data?.length}
                                </span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger
                            value="upload"
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            <span>Upload New</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="list" className="mt-4">
                        {gallery?.isError && (
                            <NoData
                                isError
                                text="There is some technical error!"
                            />
                        )}
                        {gallery?.isLoading || gallery?.isFetching ? (
                            <LoadingAnimation size={80} />
                        ) : gallery?.data &&
                          gallery?.data?.length > 0 &&
                          gallery?.isSuccess ? (
                            <IndustryGalleryList gallery={gallery?.data} />
                        ) : (
                            gallery?.isSuccess && (
                                <NoData text="There is no gallery found!" />
                            )
                        )}
                    </TabsContent>

                    <TabsContent
                        value="upload"
                        className="max-h-[63vh] overflow-auto custom-scrollbar p-4"
                    >
                        <IndustryGalleryForm onSubmit={onSubmit} />
                    </TabsContent>
                </Tabs>
            </Modal>
        </div>
    )
}
