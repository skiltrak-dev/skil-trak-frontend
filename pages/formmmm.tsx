import { TextInput } from '@components'
import type { NextPage } from 'next'
import { useForm, useFieldArray, Controller } from 'react-hook-form'

const FormTesting: NextPage = () => {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      // defaultValues: {}; you can populate the fields by this attribute
    }
  )
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    control,
    name: 'test',
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <TextInput
              {...register(`test.${index}.firstName`)}
              placeholder="Enter your first name"
            />
            <input
              {...register(`test.${index}.lastName`)}
              placeholder="Enter your last name"
            />
            <input
              {...register(`test.${index}.phone`)}
              placeholder="Enter your phone"
            />
            <input
              {...register(`test.${index}.email`)}
              placeholder="Enter your email"
            />
            <Controller
              render={({ field }) => <TextInput {...field} />}
              name={`test.${index}.tttt`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() =>
          append({
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            tttt: '',
          })
        }
      >
        append
      </button>
      <input type="submit" />
    </form>
  )
}
export default FormTesting
