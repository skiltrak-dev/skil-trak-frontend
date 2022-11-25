import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Button, TextArea, TextInput, Switch, Select } from '@components'

// context
// import { RequiredDocxFolderContext } from "context";

// redux
import { useAddDocumentMutation } from '@queries'
export const DocumentForm = ({
  courseID,
  setIsDocxSubmitting,
  setRequiredStudentFormdata,
}: any) => {
  // context for set selected Docx Ids

  // add Folder
  const [addFolder, { isLoading }] = useAddDocumentMutation()

  const initialValues = {
    name: '',
    type: {},
    capacity: '',
    description: '',
    isRequired: false,
  }

  const validationSchema = yup.object({
    // businessName: yup.string().required("Some error occured!"),
    // abn: yup.string().required("Some error occured!"),
    // businessPhoneNumber: yup.string().required("Some error occured!"),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
  })

  const onSubmit = async (values: any) => {
    // console.log('values', values)
    setIsDocxSubmitting(true)

    await addFolder({
      custom: {
        ...values,
        type: values.type.value,
        course: courseID,
      },
      industry: 1,
    })
    // getCustomFieldData(values);
  }
  return (
    <div>
      <FormProvider {...methods}>
        <form className="mt-2 w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <TextInput
              label={'Name'}
              name={'name'}
              placeholder={'Document Name...'}
              validationIcons
            />
            <Select
              label={'Type'}
              name={'type'}
              options={[
                { value: 'docs', label: 'Docx' },
                { value: 'images', label: 'Images' },
                { value: 'videos', label: 'Videos' },
              ]}
            />
            <div className="flex flex-col gap-y-2">
              <TextInput
                label={'Capacity'}
                name={'capacity'}
                type={'number'}
                placeholder={'Capacity...'}
                validationIcons
              />
              <Switch
                label={'Is Required?'}
                name={'isRequired'}
                // value={values.isRequired}
              />
            </div>
            <TextArea label={'Description'} name={'description'} />
          </div>

          <div className="flex items-center gap-x-2">
            <Button submit loading={isLoading} disabled={isLoading}>
              Add Requirement
            </Button>
            <Button variant={'secondary'}>Cancel</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
