import { Button, RadioGroup, Select, TextInput, Typography } from '@components'
import { BinaryFileUpload } from '@components/inputs/BinaryFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { ImportStudentFormType } from '@types'
import { CourseSelectOption, formatOptionLabel, getDate } from '@utils'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { read, utils } from 'xlsx'
import * as yup from 'yup'

interface FormProps {
  onSubmit: (values: ImportStudentFormType) => void
  edit?: boolean
  initialValues?: any
  onStudentFound: Function
  setEmailExistList: Function
  result: any
  rtoCourses: any
  onCancel?: any
}

export const ImportStudentFormV2 = ({
  result,
  onSubmit,
  edit,
  initialValues,
  onStudentFound,
  setEmailExistList,
  rtoCourses,
  onCancel,
}: FormProps) => {
  const { notification } = useNotification()
  const [mount, setMount] = useState(false)
  const [studentsCount, setStudentsCount] = useState<number>(0)
  const [placementType, setPlacementType] = useState<'flexible' | 'block'>('flexible')

  const router = useRouter()

  useEffect(() => {
    if (!mount) setMount(true)
  }, [])

  const courses = AdminApi.Courses.useListQuery(undefined)
  const [courseOptions, setCourseOptions] = useState<any>([])

  const onSectorSelect = (options: any) => {
    const currentSelectedSectors = options.map((opt: any) => opt.value)
    const currentSelectableCourses: any = []

    currentSelectedSectors.forEach((sectorId: number) => {
      const currentCourses = courses.data?.data.filter((c) => c.sector.id === sectorId)
      if (currentCourses?.length) currentSelectableCourses.push(...currentCourses)
    })

    setCourseOptions(
      currentSelectableCourses.map((c: any) => ({
        label: c.title,
        value: c.id,
      }))
    )
  }

  const validationSchema = yup.object({
    batch: yup.string().required('Batch required'),
    ...(placementType === 'block'
      ? {
        startDate: yup.string().required('Start date required'),
        endDate: yup.string().required('End date required'),
      }
      : {
        expiryDate: yup.string().required('Expiry date required'),
      }),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
    mode: 'all',
  })

  const onFileChange = async (e: any, fileData: any) => {
    try {
      const wb = read(e.target.result, { type: 'binary' })
      const sheets = wb.SheetNames

      if (sheets.length) {
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]])
        setStudentsCount(rows?.length)
        if (rows?.length <= 50) {
          onStudentFound && onStudentFound(rows, fileData)
        } else {
          notification.error({
            title: 'Student Length!',
            description: 'Student Length must be less than or equal to 50!',
            dissmissTimer: 5000,
          })
        }
      }
    } catch (err) {
      notification.error({
        title: 'Invalid File',
        description: 'File should be .csv or .xlsx',
      })
    }
  }

  // Utility to calculate date 3 months ahead
  const getMinExpiryDate = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 3)
    return date.toISOString().split('T')[0]
  }

  return (
    <FormProvider {...methods}>
      <form className="w-full" onSubmit={methods.handleSubmit((values) => {
        const filteredValues = { ...values }

        if (placementType === 'flexible') {
          delete filteredValues.startDate
          delete filteredValues.endDate
        } else if (placementType === 'block') {
          delete filteredValues.expiryDate
        }
        onSubmit(filteredValues)
      })}>
        <div className="space-y-4">
          {/* Placement Type */}
          <div className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-lg">
            <Typography variant="label" className="mb-2 block">
              Placement Type
            </Typography>

            <div className="flex flex-col gap-3">
              <div
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${placementType === 'flexible'
                    ? 'border-primaryNew bg-primaryNew/5'
                    : 'border-gray-300 hover:border-primaryNew/30'
                  }`}
                onClick={() => setPlacementType('flexible')}
              >
                <input
                  type="radio"
                  id="flexible"
                  name="placementType"
                  checked={placementType === 'flexible'}
                  onChange={() => setPlacementType('flexible')}
                  className="mt-1 accent-primaryNew cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Typography variant="body" className="font-semibold cursor-pointer">
                      Flexible Placement
                    </Typography>
                    <div
                      className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary text-center"
                    >
                      Flexible
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Student can be placed any time before the expiry date
                  </p>
                </div>
              </div>

              <div
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${placementType === 'block'
                    ? 'border-primaryNew bg-primaryNew/5'
                    : 'border-gray-300 hover:border-primaryNew/30'
                  }`}
                onClick={() => setPlacementType('block')}
              >
                <input
                  type="radio"
                  id="block"
                  name="placementType"
                  checked={placementType === 'block'}
                  onChange={() => setPlacementType('block')}
                  className="mt-1 accent-primaryNew cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Typography variant="body" className="font-semibold cursor-pointer">
                      Block Placement
                    </Typography>
                    <div
                      className="inline-flex items-center justify-center rounded-full border border-primaryNew/30 bg-primaryNew/20 px-2.5 py-0.5 text-xs font-medium text-primaryNew text-center"
                    >
                      Scheduled
                    </div>
                  </div>


                  <p className="text-sm text-gray-500 mt-1">
                    Student must be placed before the start date and will have an end date
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-2 gap-2">
            <TextInput name="batch" label="Batch/Class" placeholder="Batch/Class" />
            <div>
              <Select
                name="courses"
                label="Courses"
                options={rtoCourses}
                multi
                onlyValue
                components={{ Option: CourseSelectOption }}
                formatOptionLabel={formatOptionLabel}
              />
            </div>
          </div>
          <div className="flex items-center gap-x-2 justify-between">
            {placementType === 'block' ? (
              <>
                <TextInput label="Start Date" name="startDate" type="date" min={getDate()} />
                <TextInput label="End Date" name="endDate" type="date" min={getDate()} />
              </>
            ) : (
              <TextInput
                label="Expiry Date"
                name="expiryDate"
                type="date"
                min={getMinExpiryDate()}
              />
            )}
          </div>



          <BinaryFileUpload
            name="list"
            onChange={onFileChange}
            fileAsObject={false}
          />

          {/* Expected Columns Preview */}
          <div className="p-4 bg-gray-300/30 rounded-lg border my-4">
            <p className="text-sm font-semibold mb-2">Expected columns in your file:</p>
            <div className="flex flex-wrap gap-2">
              {['id', 'name', 'email', 'contact', 'address'].map((col) => (
                <div
                  key={col}
                  className="text-xs px-2 py-0.5 rounded-full bg-[#0D5468] text-white border border-[#0D5468]/20"
                >
                  {col}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-x-2 items-center">
            <Button text="Cancel" onClick={onCancel} variant="secondary" />
            <Button
              text="Import Students"
              Icon={Upload}
              submit
              loading={result.isLoading}
              disabled={result.isLoading || studentsCount > 50}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
