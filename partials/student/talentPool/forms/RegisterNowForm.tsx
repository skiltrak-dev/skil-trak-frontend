import {
    Button,
    Checkbox,
    GlobalModal,
    Portal,
    ShowErrorNotifications,
    TagInput,
    TextArea,
    Typography,
} from '@components'
import { LabelTag, RegistrationSuccessful } from '@partials/student/talentPool'
import { ReactElement, useEffect, useState } from 'react'
// react hook form
import { FormProvider, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// icons
import { MdOutlineClose } from 'react-icons/md'
import { useNotification } from '@hooks'

const termsAndCondition = [
    {
        title: '1. Profile Accuracy',
        description: `Students must provide accurate and up-to-date information in their profiles, including personal details, academic information, and skills.`,
    },
    {
        title: '2. Consent for Industry Access',
        description: `By joining the Talent Pool, students grant permission for industry partners to access specific information in their profiles. The extent of information shared will be determined by the student's privacy settings.`,
    },
    {
        title: '3. Privacy Settings',
        description: `Students have the option to configure privacy settings to control the information accessible to industry partners. SkilTrak will ensure that industry partners adhere to these privacy settings.`,
    },
    {
        title: '4. Responsiveness',
        description: `Students should respond promptly to any industry requests for additional information or interviews related to potential opportunities.`,
    },
    {
        title: '5. Active Participation',
        description: `Students are encouraged to keep their profiles updated, including skills, projects, and experiences, to enhance their visibility and attractiveness to potential employers.`,
    },
    {
        title: '6. Confidentiality',
        description: `Students must respect the confidentiality of any information shared by industry partners during the talent acquisition process.`,
    },
    {
        title: '7. Active Participation',
        description: `Students are encouraged to keep their profiles updated, including skills, projects, and experiences, to enhance their visibility and attractiveness to potential employers.`,
    },
]
type RegistrationFormProps = {
    tags: any
    setTags: any
    onSubmit: any
    applyForTalentPoolResult?: any
}
export const RegisterNowForm = ({
    tags,
    setTags,
    onSubmit,
    applyForTalentPoolResult,
}: RegistrationFormProps) => {
    // const [tags, setTags] = useState<any>({
    //     links: [],
    //     skills: [],
    //     areaOfInterest: [],
    // })
    const [shortDescriptionWordCount, setShortDescriptionWordCount] =
        useState(0)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [agree, setAgree] = useState(false)
    const { notification } = useNotification()
    const validationSchema = yup.object().shape({
        // about: yup.string().required('About Yourself is Required'),
        about: yup
        .string()
        .required('About Yourself is Required')
        .test(
            'word-count',
            'About Yourself must be less than or equal to 100 words',
            (value) => {
                if (!value) return true; // If no value, validation passes (since it's required)
                const wordCount = value.trim().split(/\s+/).length;
                return wordCount <= 100;
            }
        ),
        skills: yup
            .array()
            .min(1, 'At least one skill is required')
            .required('Skills are required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    const { handleSubmit } = methods

    const handleTagEnter = (name: string, newTag: string) => {
        setTags((prevTags: any) => ({
            ...prevTags,
            [name]: [...prevTags[name], newTag],
        }))
    }

    const handleRemoveTag = (name: string, tagToRemove: string) => {
        setTags((prevTags: any) => ({
            ...prevTags,
            [name]: prevTags[name].filter((tag: string) => tag !== tagToRemove),
        }))
    }

    // const onSubmit = (data: any) => {
    //     console.log('Data:', {
    //         ...data,
    //         links: tags.links,
    //         areaOfInterest: tags.areaOfInterest,
    //         skills: tags.skills,
    //     })
    // }
    const handleCheckboxChange = () => {
        setAgree(!agree)
    }

    const onCancelClicked = () => {
        setModal(null)
    }
    const handleAboutChange = () => {
        const about = methods.getValues('about')
        const wordCount = about
            .split(/\s+/)
            .filter((word: any) => word !== '').length

        setShortDescriptionWordCount(wordCount)
    }

    const onSubmitForm = () => {
        if (applyForTalentPoolResult.isSuccess) {
            setModal(
                <GlobalModal>
                    <RegistrationSuccessful onCancelClicked={onCancelClicked} />
                </GlobalModal>
            )
        }
    }

    const onClickOnTermsAndCondition = () => {
        setModal(
            <GlobalModal>
                <div className="px-12 pt-7 pb-12">
                    <div onClick={onCancelClicked} className="flex justify-end">
                        <MdOutlineClose className="cursor-pointer" size={30} />
                    </div>
                    <div className="text-center mb-8">
                        <Typography variant="subtitle">
                            Terms & Condition
                        </Typography>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-7">
                        {termsAndCondition.map((item) => (
                            <div className="">
                                <p className="text-sm font-medium text-black">
                                    {item?.title}
                                </p>
                                <p className="text-xs leading-[14px] mt-1 text-black">
                                    {item?.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </GlobalModal>
        )
    }
    useEffect(() => {
        if (applyForTalentPoolResult.isSuccess) {
            notification.success({
                title: 'Registration Successful',
                description:
                    'Your registration for the Talent Pool was successful.',
            })
            onSubmitForm()
        } else if (applyForTalentPoolResult.isError) {
            notification.error({
                title: 'Registration Error',
                description:
                    'There was an error while processing your registration. Please try again.',
            })
        }
    }, [applyForTalentPoolResult])

    return (
        <>
            {modal && modal}
            <ShowErrorNotifications result={applyForTalentPoolResult} />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <div className="mb-2">
                        <Typography variant="label">About Yourself</Typography>
                        <Typography variant="xs">
                            Can you tell us about yourself and your professional
                            background?
                        </Typography>
                    </div>
                    <TextArea
                        name={'about'}
                        placeholder="About yourself"
                        rows={6}
                        required
                        onChange={handleAboutChange}
                    />
                    <div
                        className={`${
                            shortDescriptionWordCount <= 100
                                ? 'text-slate-500'
                                : ' text-red-500'
                        } text-sm mb-5`}
                    >
                        {`${shortDescriptionWordCount} / 100 words`}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4 gap-y-5">
                        {/* Col - 1 */}
                        <div>
                            <div className="mb-2">
                                <Typography variant="label">
                                    Skill & Talent (Required)
                                </Typography>
                                <Typography variant="xs">
                                    Please list any specific skills or talents
                                    you possess
                                </Typography>
                            </div>
                            <div className="">
                                <TagInput
                                    // {...field}
                                    name="skills"
                                    onTagEnter={handleTagEnter}
                                />
                            </div>
                            {/*  Skills */}
                            {tags?.skills.length > 0 && (
                                <LabelTag
                                    tagName={'skills'}
                                    tags={tags}
                                    handleRemoveTag={handleRemoveTag}
                                />
                            )}
                        </div>

                        {/* Col - 2 */}
                        <div>
                            <div className="mb-2">
                                <Typography variant="label">
                                    Area of Interest (Optional)
                                </Typography>
                                <Typography variant="xs">
                                    What areas are you most interested in
                                    showcasing your talents?
                                </Typography>
                            </div>
                            <div className="">
                                <TagInput
                                    name="areaOfInterest"
                                    onTagEnter={handleTagEnter}
                                />
                            </div>
                            {tags?.areaOfInterest.length > 0 && (
                                <LabelTag
                                    tagName={'areaOfInterest'}
                                    tags={tags}
                                    handleRemoveTag={handleRemoveTag}
                                />
                            )}
                        </div>

                        {/* Col -3  */}
                        <div>
                            <div className="mb-2">
                                <Typography variant="label">
                                    Portfolio/Links
                                </Typography>
                                <Typography variant="xs">
                                    Provide links to any online portfolios,
                                    projects, or relevant social media profiles.
                                </Typography>
                            </div>
                            <div className="">
                                <TagInput
                                    name="links"
                                    onTagEnter={handleTagEnter}
                                />
                            </div>
                            {tags?.links.length > 0 && (
                                <LabelTag
                                    tagName={'links'}
                                    tags={tags}
                                    handleRemoveTag={handleRemoveTag}
                                />
                            )}
                        </div>
                    </div>
                    <div
                        onClick={onClickOnTermsAndCondition}
                        className="mt-12 text-blue-500 text-sm font-medium cursor-pointer"
                    >
                        Terms & Condition
                    </div>
                    <div className="flex items-center gap-x-1 my-6">
                        <Checkbox
                            name="agree"
                            required
                            onChange={handleCheckboxChange}
                        />
                        <Typography variant="small">
                            By submitting this form, I agree to be part of the
                            talent pool and consent to being contacted for
                            relevant opportunities.
                        </Typography>
                    </div>
                    <Button
                        text="Submit"
                        onClick={() => {
                            onSubmit(methods.getValues())
                        }}
                        disabled={!agree}
                    />
                </form>
            </FormProvider>
        </>
    )
}
