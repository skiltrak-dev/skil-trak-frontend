import React, { useEffect, useRef, MutableRefObject, useState } from 'react'
import { useRouter } from 'next/router'
import ReactSignatureCanvas from 'react-signature-canvas'
// import { SelectRtoData } from "../../MoU";

// Icons
import { MdSimCardDownload } from 'react-icons/md'

// components
import {
  Card,
  ActionAlert,
  Button,
  Typography,
  BackButton,
  // TechnicalError,
} from 'components'
import { MouEditor, Signature } from './components'

// redux
import {
  useCreateMOUbyRTOMutation,
  useGetDefaultMouContentQuery,
  useGetRtoMOUDetailQuery,
  useAcceptMOUbyRTOMutation,
} from '@queries'
import { AuthUtils, getUserCredentials } from '@utils'
import { LoadingAnimation } from '@components'

// context
import { useNotification } from '@hooks'

export const MOUDetailContainer = ({
  isSigned,
  content,
  setContent,
  createMouResult,
  getMouResult,
  acceptMouResult,
  defaultMou,
  ref,
  onSubmit,
}: any) => {
  const router = useRouter()
  const id = router.query.mouDetail
  const [editMou, setEditMou] = useState<boolean | null>(false)
  const [saveContentButton, setSaveContentButton] = useState<any | null>(null)

  //

  const { notification } = useNotification()

  // redux query
  // const getMou = useGetRtoMOUDetailQuery(String(id), { skip: !id })
  // const [createMou, createMouResult] = useCreateMOUbyRTOMutation()
  // const [acceptMou, acceptMouResult] = useAcceptMOUbyRTOMutation()
  // const defaultMou = useGetDefaultMouContentQuery(null, {
  //   skip: getMou?.data,
  // })
  // const mouDetail = useGetMOUDetailQuery();

  // using ref
  // const [sigPad, setSigPad] = useState({})

  useEffect(() => {
    if (!getMouResult?.data) {
      setContent(defaultMou?.data?.content)
    }
  }, [getMouResult.data, defaultMou.data])

  useEffect(() => {
    if (getMouResult?.data) {
      setContent(getMouResult?.data?.content)
    }
  }, [getMouResult.data])

  useEffect(() => {
    if (createMouResult.isSuccess || acceptMouResult.isSuccess) {
      setTimeout(() => {
        router.push('/portals/rto/industries/mous')
      }, 1500)
    }
  }, [createMouResult.isSuccess, acceptMouResult.isSuccess, router])

  useEffect(() => {
    if (getMouResult?.data?.status === 'cencelled') {
      router.push('/general-information/mou')
    }
  }, [getMouResult, router])

  const saveContent = (content: any) => {
    setContent(content)
  }

  // const onSubmit = async () => {
  //   var dataURL = ref?.current?.toDataURL('image/svg+xml')
  //   if (!ref?.current?.isEmpty()) {
  //     if (getMouResult.data) {
  //       await acceptMou({
  //         rtoSignature: dataURL,
  //         id,
  //       })
  //     } else {
  //       // Create Mou
  //       if (content) {
  //         await createMou({
  //           rtoSignature: dataURL,
  //           content: JSON.stringify(content),
  //           industry: id,
  //         })
  //       } else {
  //         notification.error({
  //           title: 'Content Must be provided',
  //           description: 'Content Must be provided',
  //         })
  //       }
  //     }
  //   } else {
  //     notification.error({
  //       title: 'Signature Must be provided',
  //       description: 'Signature Must be provided',
  //     })
  //   }
  // }

  const IndustryName = getUserCredentials()

  let replacedContent = content?.replace(/\\n/g, '<br/>')
  if (getMouResult.data) {
    replacedContent = replacedContent?.slice(1, -1)
  }
  // replacedContent = replacedContent?.replace("<p></p>", "<br/>");

  const loading = getMouResult.isLoading || defaultMou.isLoading
  const isError = getMouResult.isError || defaultMou.isError

  console.log(
    'getMouResult?.data?.industrySignature',
    getMouResult?.data?.signedByIndustry
  )

  return (
    <>
      <BackButton text={"Back To MoU's"} />

      {createMouResult.isSuccess || acceptMouResult.isSuccess ? (
        <Card>
          <ActionAlert
            title={`Successfully partnered up with ${getMouResult?.data?.rto?.user?.name}`}
            description={'You will be redirected to MOU in a moment.'}
          />
        </Card>
      ) : (
        <Card>
          {isError && 'Error'}
          {!loading ? (
            <div className={`${isError ? 'hidden' : ''}`}>
              <div className="flex justify-between items-center ">
                <Typography variant={'h4'}>Memorendum Ou</Typography>

                <div className="flex justify-end items-center gap-x-4">
                  {!editMou ? (
                    <>
                      {getMouResult?.data?.status !== 'signed' &&
                        !getMouResult?.data?.signedByRto && (
                          <Button
                            variant={'secondary'}
                            text={'Edit'}
                            onClick={() => setEditMou(true)}
                          />
                        )}
                      {getMouResult?.data?.status === 'signed' && (
                        <a
                          href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${id}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Button
                            variant={'action'}
                            Icon={MdSimCardDownload}
                            submit
                            text={'Download'}
                          />
                        </a>
                      )}
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => setEditMou(false)}
                        variant={'secondary'}
                        text={'Cancel'}
                      />
                      {saveContentButton}
                    </>
                  )}
                </div>
              </div>

              {/* Data */}
              <div className="mt-6">
                {editMou ? (
                  <>
                    <MouEditor
                      content={content}
                      saveContent={saveContent}
                      setEditMou={setEditMou}
                      setSaveContentButton={setSaveContentButton}
                    />
                  </>
                ) : (
                  <>
                    <div className="flex justify-end w-full"></div>

                    {getMouResult.isSuccess && (
                      <div
                        className="my-4"
                        dangerouslySetInnerHTML={{
                          __html: replacedContent,
                        }}
                      />
                    )}
                  </>
                )}

                {/* Signature */}
                <div className="flex items-start gap-x-3">
                  {getMouResult?.data?.rtoSignature ? (
                    <div className="my-5 w-full max-w-[50%]">
                      <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                        <img
                          className="object-cover p-5"
                          src={getMouResult.data.rtoSignature}
                          alt=""
                        />
                      </div>
                      <Typography variant={'label'}>
                        {getMouResult?.data?.rto?.user?.name || 'RTO'}
                      </Typography>
                    </div>
                  ) : (
                    <Signature industryName={IndustryName?.name} ref={ref} />
                  )}
                  {getMouResult?.data?.signedByIndustry && (
                    <div className="my-5 w-full max-w-[50%] ml-auto">
                      <div className="cursor-pointer overflow-hidden h-40 border border-gray mb-2 flex justify-center items-center ">
                        <img
                          className="object-cover p-5"
                          src={getMouResult.data.industrySignature}
                          alt=""
                        />
                      </div>
                      <Typography variant={'label'}>
                        {IndustryName?.username}
                      </Typography>
                    </div>
                  )}
                </div>

                {/* Action */}
                {!isSigned && (
                  <Button
                    onClick={onSubmit}
                    loading={
                      acceptMouResult.isLoading || createMouResult.isLoading
                    }
                    disabled={
                      acceptMouResult.isLoading || createMouResult.isLoading
                    }
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <LoadingAnimation />
          )}
        </Card>
      )}
    </>
  )
}
