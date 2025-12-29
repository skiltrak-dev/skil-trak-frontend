import {
    Button,
    Select,
    ShowErrorNotifications,
    TextArea,
    TextInput,
} from '@components'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { Alert, AlertDescription } from '@components/ui/alert'
import { Label } from '@components/ui/label'
import { Separator } from '@components/ui/separator'
import { Checkbox } from '@components/ui/checkbox'

import {
    Briefcase,
    Crown,
    GraduationCap,
    Info,
    Plus,
    Send,
    Shield,
    Tag,
    UserPlus,
} from 'lucide-react'

import React, { useEffect, useState } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { AVAILABLE_TEAMS, TEAM_TAGS } from '../teams-tabs'
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'

// ----------------------------
// Yup Validation Schema
// ----------------------------
const schema = yup.object().shape({
    name: yup.string().required('Team name is required'),
    description: yup.string().required('Description is required'),
    members: yup
        .array()
        .min(1, 'Select at least one member')
        .nullable()
        .required('Select at least one member'),
    tags: yup.array().optional(),
})

export const CreateTeamModal = ({ createTeamOpen, setCreateTeamOpen }: any) => {
    const [selectedCountry, setSelectedCountry] = useState<any | undefined>(
        undefined
    )
    const { notification } = useNotification()
    const coordinators = CommonApi.Coordinators.useCoordinatorByRole()
    const [createTeam, createTeamResult] =
        CommonApi.Teams.useCreateSupportTeam()
    const memberOptions = coordinators?.data?.map((coordinator: any) => ({
        label: coordinator?.user?.name,
        value: coordinator?.id,
    }))
    const { data, isLoading } = CommonApi.Countries.useCountriesList()
    const statesBasedOnCountry = CommonApi.Countries.useCountryStatesList(
        selectedCountry,
        {
            skip: !selectedCountry,
        }
    )
    const stateOptions = statesBasedOnCountry?.data?.map((state: any) => ({
        label: state?.name,
        value: state?.id,
    }))
    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            members: [],
            tags: [] as string[],
        },
    })

    useEffect(() => {
        if (createTeamResult.isSuccess) {
            notification.success({
                title: 'Success',
                description: 'Team created successfully',
            })
            setCreateTeamOpen(false)
            methods.reset()
        }
    }, [createTeamResult.isSuccess])

    const selectedTags = methods.watch('tags')

    const toggleTag = (tag: string) => {
        const current = methods.watch('tags') || []

        // If the same tag is clicked again → unselect it
        if (current[0] === tag) {
            methods.setValue('tags', [])
        } else {
            // Always keep only one tag
            methods.setValue('tags', [tag])
        }
    }

    const onSubmit = (data: any) => {
        const { members, country, ...rest } = data
        const subAdmin = members?.map((member: any) => ({
            subadmin: member?.value,
        }))
        const payload = {
            ...rest,
            members: subAdmin,
        }
        createTeam(payload)
    }

    return (
        <>
            <ShowErrorNotifications result={createTeamResult} />
            <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yell-400 to-warning flex items-center justify-center">
                                <Plus className="h-5 w-5 text-white" />
                            </div>
                            Create New Team
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below to create a new team
                        </DialogDescription>
                    </DialogHeader>

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="space-y-6 py-4">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                                        <span className="h-6 w-6 rounded-full bg-primaryNew text-white flex items-center justify-center text-sm">
                                            1
                                        </span>
                                        Basic Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Select
                                            name="country"
                                            label={'State Country'}
                                            options={data?.map(
                                                (country: any) => ({
                                                    label: country?.name,
                                                    value: country?.id,
                                                })
                                            )}
                                            loading={isLoading}
                                            onChange={(e: any) => {
                                                setSelectedCountry(e?.value)
                                            }}
                                        />
                                        <Select
                                            name="state"
                                            label={'State'}
                                            options={stateOptions}
                                            loading={
                                                statesBasedOnCountry.isLoading
                                            }
                                            disabled={
                                                !selectedCountry ||
                                                statesBasedOnCountry.isLoading
                                            }
                                            onlyValue
                                        />
                                        {/* stateOptions */}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Team Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="name">
                                                Team Name{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <TextInput
                                                placeholder="e.g., Compliance Team"
                                                className="h-11"
                                                name="name"
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2">
                                            <Label htmlFor="description">
                                                Description{' '}
                                                <span className="text-destructive">
                                                    *
                                                </span>
                                            </Label>
                                            <TextArea
                                                placeholder="Responsible for quality assurance and compliance"
                                                name="description"
                                                className="h-24"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Members */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                                        <span className="h-6 w-6 rounded-full bg-primaryNew text-white flex items-center justify-center text-sm">
                                            2
                                        </span>
                                        Assign Members
                                    </h3>

                                    <Alert className="border-secondary/40 bg-secondary/5">
                                        <Briefcase className="h-4 w-4 text-secondary" />
                                        <AlertDescription className="ml-2 text-sm">
                                            Choose which team members will be
                                            part of this team. You can select
                                            multiple members.
                                        </AlertDescription>
                                    </Alert>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Select
                                            name="members"
                                            label="Select Members"
                                            placeholder="Select team members"
                                            multi
                                            options={memberOptions}
                                            loading={coordinators.isLoading}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Tags */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                                        <span className="h-6 w-6 rounded-full bg-primaryNew text-white flex items-center justify-center text-sm">
                                            3
                                        </span>
                                        Support Tags (Optional)
                                    </h3>

                                    <Alert className="border-accent/40 bg-accent/5">
                                        <Info className="h-4 w-4 text-accent" />
                                        <AlertDescription className="ml-2 text-sm space-y-2">
                                            <p className="font-semibold">
                                                About Support Tags:
                                            </p>
                                            <p>
                                                Tags help automatic ticket
                                                routing. Only add them for
                                                members involved in support.
                                            </p>
                                        </AlertDescription>
                                    </Alert>

                                    <div className="grid grid-cols-2 gap-3">
                                        {TEAM_TAGS.map((tag: any) => (
                                            <div
                                                key={tag}
                                                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                            >
                                                <Checkbox
                                                    checked={selectedTags?.includes(
                                                        tag
                                                    )}
                                                    onCheckedChange={() =>
                                                        toggleTag(tag)
                                                    }
                                                />
                                                <Label className="cursor-pointer flex items-center gap-2">
                                                    <Tag className="h-3 w-3 text-muted-foreground" />
                                                    {tag}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => setCreateTeamOpen(false)}
                                    outline
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-accent to-warning gap-2"
                                    submit
                                    variant="primaryNew"
                                    loading={createTeamResult.isLoading}
                                    disabled={createTeamResult.isLoading}
                                >
                                    <Send className="h-4 w-4" />
                                    Create Team
                                </Button>
                            </DialogFooter>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>
        </>
    )
}
