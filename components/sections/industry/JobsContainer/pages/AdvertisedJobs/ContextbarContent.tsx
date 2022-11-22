import { useRouter } from 'next/router'
import { Button } from 'components'

export const ContextbarContent = () => {
  const router = useRouter()

  return (
    <>
      <div className="">
        <Button
          bgColor={'text'}
          shadow={'sm'}
          rounded={'2lg'}
          border={'2'}
          borderColor={'primary'}
          onClick={() => navigate('advertise-new-job')}
        >
          Advertise New Job
        </Button>
      </div>
    </>
  )
}
